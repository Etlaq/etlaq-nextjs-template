import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'البريد الإلكتروني مطلوب'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'البريد الإلكتروني غير صحيح'],
    },
    password: {
      type: String,
      required: [true, 'كلمة المرور مطلوبة'],
      minlength: [6, 'يجب أن تكون كلمة المرور 6 أحرف على الأقل'],
    },
    name: {
      type: String,
      required: [true, 'الاسم مطلوب'],
      trim: true,
      maxlength: [100, 'الاسم لا يجب أن يتجاوز 100 حرف'],
    },
  },
  {
    timestamps: true,
  }
);

// Note: email index is already created by the 'unique: true' option above

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
