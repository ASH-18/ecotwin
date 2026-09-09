import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { VerificationModule } from './verification/verification.module';

@Module({
  imports: [PrismaModule, AuthModule, EventsModule, VerificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
