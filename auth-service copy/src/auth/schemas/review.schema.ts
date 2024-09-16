import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Professor', required: true })
  professorId: Types.ObjectId; // Reference to Professor

  @Prop({ required: true })
  comment: string; // Review text
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
