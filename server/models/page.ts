import { SLUG_MAX_LENGTH } from '@constants';
import { Schema, model, models, ObjectId } from 'mongoose';

export interface Page {
  userId: ObjectId;
  name: string;
  slug: string;
  hashedContent: string;
}

const pageSchema = new Schema<Page>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    trim: true,
    maxlength: SLUG_MAX_LENGTH,
    required: true,
  },
  hashedContent: {
    type: String,
  },
});

export const Page = models.pages || model<Page>('pages', pageSchema);
