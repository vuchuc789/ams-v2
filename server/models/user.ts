import { Schema, model, models } from 'mongoose';

export interface User {
  authId: string;
  authType: number;
  name?: string;
  email?: string;
}

const userSchema = new Schema<User>({
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

export const User = models.users || model<User>('users', userSchema);
