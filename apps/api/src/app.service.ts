import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return { status: 'NestJS Backend up and running', service: 'EcoTwin-X API' };
  }
}
