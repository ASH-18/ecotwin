import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitActionDto } from './dto/submit-action.dto';
import * as crypto from 'crypto';

@Injectable()
export class VerificationService {
  constructor(private prisma: PrismaService) {}

  async submitAction(userId: string, dto: SubmitActionDto) {
    // 1. Verify Digital Twin exists and belongs to the JWT owner
    const twin = await this.prisma.digitalTwinState.findUnique({
      where: { id: dto.twinId }
    });
    if (!twin || twin.userId !== userId) {
      throw new NotFoundException(`Digital Twin not found under user ${userId}`);
    }

    // 2. Transact the raw Action to DB
    const action = await this.prisma.carbonAction.create({
      data: {
        userId,
        type: dto.actionType,
        description: dto.description,
        emissionReduction: dto.emissionReduction || 0.0,
      }
    });

    // 3. Chain the ledger with the historical hash to form a tamper-evident graph
    const lastVerification = await this.prisma.verification.findFirst({
      where: { carbonAction: { userId } },
      orderBy: { verifiedAt: 'desc' },
    });

    const previousHash = lastVerification?.mediaHash || '0x00000000000000000000000000000000';

    // 4. Initialize the Verification wrapper context in PENDING logic state
    const verification = await this.prisma.verification.create({
      data: {
        carbonActionId: action.id,
        status: 'PENDING',
        previousHash,
      }
    });

    // 5. Fire asynchronous extraction sequence to the ML Service
    this.dispatchToAIService(verification.id, dto.evidenceBase64, previousHash);

    return {
      message: 'Evidence action submitted, ledger chain commenced.',
      actionId: action.id,
      verificationId: verification.id,
      status: 'PENDING'
    };
  }

  private async dispatchToAIService(verificationId: string, evidenceStr?: string, previousHash?: string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:8000'}/api/v1/engine/verify-action`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          verification_id: verificationId,
          evidence_payload: evidenceStr || 'mock_evidence_png_base64',
          previous_hash: previousHash
        })
      });

      if (!response.ok) {
        console.error('Failed to query ML Engine.');
        return;
      }

      const result = await response.json();
      
      let newStatus = 'FLAGGED';
      if (result.trust_score >= 0.85) newStatus = 'APPROVED'; // LEDGERED successfully
      else if (result.trust_score < 0.5 || result.is_duplicate) newStatus = 'REJECTED'; 

      // Execute hashing algorithms mimicking robust SHA-256 blockchain logic
      const mediaHash = crypto.createHash('sha256').update(result.media_hash_signature).digest('hex');

      await this.prisma.verification.update({
        where: { id: verificationId },
        data: {
          status: newStatus,
          trustScore: result.trust_score,
          mediaHash,
          verifiedAt: new Date()
        }
      });
      console.log(`[VERIFICATION ENGINE] Lifecycle updated to ${newStatus} for V_ID: ${verificationId}`);
    } catch (e) {
      console.error('AI Inference failed.', e);
    }
  }

  async getStatus(verificationId: string) {
    return this.prisma.verification.findUnique({
      where: { id: verificationId },
      include: { carbonAction: true }
    });
  }
}
