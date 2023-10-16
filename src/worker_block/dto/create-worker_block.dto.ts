import { IsNotEmpty, IsString } from 'class-validator';
export class CreateWorkerBlockDto {
  @IsString()
  @IsNotEmpty()
  block_id: string;
  @IsString()
  @IsNotEmpty()
  worker_id: string;
}
