import { Schema, model, models } from 'mongoose';

export interface UserType {
  authId: string;
  authType: number;
  name: string;
  email: string;
  adpiaId: string;
  adpiaUsername: string;
  adpiaAccessToken: string;
}

const userSchema = new Schema<UserType>({
  authType: {
    type: Number,
    required: true,
  },
  authId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  adpiaId: {
    type: String,
  },
  adpiaUsername: {
    type: String,
  },
  adpiaAccessToken: {
    type: String,
  },
});

delete models.users;

export const User = model<UserType>('users', userSchema);
