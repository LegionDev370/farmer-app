import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false })
export class FiberProduction {
  @Prop()
  fiber_yield: number;

  @Prop()
  shearing_schedule: number;

  @Prop()
  fiber_quality: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' })
  animal_id: string;
}

export const FiberProductionSchema =
  SchemaFactory.createForClass(FiberProduction);
