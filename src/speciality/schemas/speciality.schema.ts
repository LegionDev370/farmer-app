import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { Worker } from '../../worker/schemas/worker.schema';
export type SpecialityDocument = HydratedDocument<Speciality>;
@Schema({
  versionKey: false,
})
export class Speciality {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
    },
  ])
  workers: Worker[];
}

export const SpecialitySchema = SchemaFactory.createForClass(Speciality);
