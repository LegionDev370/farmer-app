import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
export type VaccinationHistoryDocument = HydratedDocument<VaccinationHistory>;
@Schema({
  versionKey: false,
  timestamps: true,
})
export class VaccinationHistory {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
  })
  animal_id: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vaccine',
  })
  vaccine_type_id: string;
  @Prop()
  vaccinated_date: Date;
  @Prop()
  next_vaccination_date: Date;
  @Prop()
  vaccinate_photo: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
  })
  worker_id: string;
}
export const VaccinationHistorySchema =
  SchemaFactory.createForClass(VaccinationHistory);
