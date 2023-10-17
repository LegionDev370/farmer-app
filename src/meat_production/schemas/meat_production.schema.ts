import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
export type MeatProductionDocument = HydratedDocument<MeatProduction>;
@Schema({
  versionKey: false,
  timestamps: true,
})
export class MeatProduction {
  @Prop()
  meat_yield: number;
  @Prop()
  slaughter_date: Date;
  @Prop()
  shearing_schedule: Date;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
  })
  animal_id: string;
}
export const MeatProductionSchema =
  SchemaFactory.createForClass(MeatProduction);
