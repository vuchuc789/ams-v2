import { Schema, model, models } from 'mongoose';

export interface UserType {
  authId: string;
  authType: number;
  name: string;
  email: string;
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
});

delete models.users;

export const User = model<UserType>('users', userSchema);
