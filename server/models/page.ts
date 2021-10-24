import { SLUG_MAX_LENGTH } from '@constants';
import { Schema, model, models, ObjectId } from 'mongoose';

export interface PageType {
  userId: ObjectId;
  name: string;
  slug: string;
  hashedContent: string;
  isPublic: boolean;
}

const pageSchema = new Schema<PageType>({
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
  isPublic: {
    type: Boolean,
    default: false,
  },
});

delete models.pages;

export const Page = model<PageType>('pages', pageSchema);
