import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;
