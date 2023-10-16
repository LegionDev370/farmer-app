import { Module } from '@nestjs/common';
import { AnimalTypeService } from './animal-type.service';
import { AnimalTypeController } from './animal-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalType, AnimalTypeSchema } from './schemas/animal-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnimalType.name, schema: AnimalTypeSchema },
    ]),
  ],
  controllers: [AnimalTypeController],
  providers: [AnimalTypeService],
})
export class AnimalTypeModule {}
