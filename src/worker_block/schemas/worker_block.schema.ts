import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  versionKey: false,
})
export class WorkerBlock {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blocks',
  })
  block: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
  })
  worker: string;
}
export const WorkerBlockSchema = SchemaFactory.createForClass(WorkerBlock);
