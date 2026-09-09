import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SubmitActionDto {
  @IsString()
  @IsNotEmpty()
  twinId: string;

  @IsString()
  @IsNotEmpty()
  actionType: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  emissionReduction?: number;

  @IsString()
  @IsOptional()
  evidenceBase64?: string; // Mocking media upload purely in memory for simplicity
}
