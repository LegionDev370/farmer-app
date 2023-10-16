import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from './schemas/animal.eschema';
import {
  AnimalType,
  AnimalTypeSchema,
} from 'src/animal-type/schemas/animal-type.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Animal.name, schema: AnimalSchema },
      {
        name: AnimalType.name,
        schema: AnimalTypeSchema,
      },
    ]),
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
