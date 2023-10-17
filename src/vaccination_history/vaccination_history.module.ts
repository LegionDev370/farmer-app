import { Module } from '@nestjs/common';
import { VaccinationHistoryService } from './vaccination_history.service';
import { VaccinationHistoryController } from './vaccination_history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Worker } from '../worker/schemas/worker.schema';
import {
  VaccinationHistory,
  VaccinationHistorySchema,
} from './schemas/vaccination_history.schema';
import { Animal, AnimalSchema } from 'src/animals/schemas/animal.eschema';
import { Vaccine, VaccineSchema } from 'src/vaccine/schemas/vaccine.schema';
import { WorkerSchema } from 'src/worker/schemas/worker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VaccinationHistory.name, schema: VaccinationHistorySchema },
      { name: Animal.name, schema: AnimalSchema },
      { name: Vaccine.name, schema: VaccineSchema },
      { name: Worker.name, schema: WorkerSchema },
    ]),
  ],
  controllers: [VaccinationHistoryController],
  providers: [VaccinationHistoryService],
})
export class VaccinationHistoryModule {}
