import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Feeding {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' })
  animal_id: string;
  @Prop()
  feeding_schedule: string;
  @Prop()
  type_of_feed: string;
  @Prop()
  dietary: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' })
  worker_id: string;
}

export const FeedingSchema = SchemaFactory.createForClass(Feeding);
