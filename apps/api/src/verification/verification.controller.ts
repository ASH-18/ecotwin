import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { SubmitActionDto } from './dto/submit-action.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('verification')
@UseGuards(JwtAuthGuard)
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('submit')
  submitAction(@GetUser() user: any, @Body() dto: SubmitActionDto) {
    return this.verificationService.submitAction(user.id, dto);
  }

  @Get('status/:id')
  getStatus(@Param('id') id: string) {
    return this.verificationService.getStatus(id);
  }
}
