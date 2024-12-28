import mongoose, { Schema, Document, model, models } from 'mongoose';

interface IAbout extends Document {
  title: string;
  content: string;
  About: string;
}

const AboutSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    About: { type: String, required: false },
  },
  { timestamps: true }
);

export default models.About || model<IAbout>('About', AboutSchema);
