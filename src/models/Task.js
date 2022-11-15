import { Schema, model, models } from 'mongoose';

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The task title is required'],
    unique: true,
    trim: true,
    maxlength: [40, 'Title cannot be greater than 40 characters'],
  },
  description: {
    type: String,
    required: [true, 'The task description is required'],
    trim: true,
    maxlength: [200, 'Description cannot be greater than 200 characters'],
  },
}, {
  timestamps: true,
  versionKey: false,
});

const Task = models.Task || model('Task', taskSchema);

export default Task;
