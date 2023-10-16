import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Speciality } from 'src/speciality/schemas/speciality.schema';
import { Blocks } from 'src/blocks/schemas/blocks.schema';
export type WorkerDocument = HydratedDocument<Worker>;
@Schema({
  versionKey: false,
})
export class Worker {
  @Prop()
  name: string;
  @Prop()
  age: number;
  @Prop()
  experience: number;
  @Prop({ unique: true })
  phone_number: string;
  @Prop({ unique: true })
  username: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Speciality',
  })
  speciality: string;
  @Prop()
  description: string;
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blocks',
    },
  ])
  blocks: Blocks[];
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
