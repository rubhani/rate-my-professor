import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Prof extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  institution: string;
}

export const ProfSchema = SchemaFactory.createForClass(Prof);
