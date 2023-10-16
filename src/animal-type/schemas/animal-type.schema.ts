import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Animal } from 'src/animals/schemas/animal.eschema';
import mongoose from 'mongoose';
@Schema({
  versionKey: false,
  timestamps: true,
})
export class AnimalType {
  @Prop()
  animal_type: string;
  @Prop()
  description: string;
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Animal',
    },
  ])
  animals: Animal[];
}
export const AnimalTypeSchema = SchemaFactory.createForClass(AnimalType);
