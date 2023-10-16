import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { Worker } from 'src/worker/schemas/worker.schema';
export type BlocksDocument = HydratedDocument<Blocks>;
@Schema({
  versionKey: false,
})
export class Blocks {
  @Prop()
  number: number;
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
const BlocksSchema = SchemaFactory.createForClass(Blocks);

export default BlocksSchema;
