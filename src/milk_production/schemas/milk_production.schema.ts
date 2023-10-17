import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type MilkProductionDocument = HydratedDocument<MilkProduction>;
@Schema({
  versionKey: false,
  timestamps: true,
})
export class MilkProduction {
  @Prop()
  milk_yield: number;
  @Prop()
  milk_schedule: Date;
  @Prop()
  milk_quality: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
  })
  animal_id: string;
}
export const MilkProductionSchema =
  SchemaFactory.createForClass(MilkProduction);
