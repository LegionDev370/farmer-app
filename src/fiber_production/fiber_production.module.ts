import { Module } from '@nestjs/common';
import { FiberProductionService } from './fiber_production.service';
import { FiberProductionController } from './fiber_production.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FiberProduction,
  FiberProductionSchema,
} from './Schemas/fiber_production.schema';
import { Animal, AnimalSchema } from 'src/animals/schemas/animal.eschema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FiberProduction.name, schema: FiberProductionSchema },
      { name: Animal.name, schema: AnimalSchema },
    ]),
  ],
  controllers: [FiberProductionController],
  providers: [FiberProductionService],
})
export class FiberProductionModule {}
