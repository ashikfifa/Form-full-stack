import mongoose, { Schema, Document, model, models } from 'mongoose';

interface IPost extends Document {
  title: string;
  content: string;
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Post || model<IPost>('Post', PostSchema);
