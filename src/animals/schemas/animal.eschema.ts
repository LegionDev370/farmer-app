import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
@Schema({
  versionKey: false,
  timestamps: true,
})
export class Animal {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AnimalType',
  })
  animal_type: string;
  @Prop({
    unique: true,
  })
  unique_id: string;
  @Prop({
    default: [],
  })
  photos: string[];
}
export const AnimalSchema = SchemaFactory.createForClass(Animal);
