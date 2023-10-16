import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
@Schema({
  versionKey: false,
  timestamps: true,
})
export class Vaccine {
  @Prop()
  vaccine_type: string;
  @Prop()
  vaccine_name: string;
}
export const VaccineSchema = SchemaFactory.createForClass(Vaccine);
