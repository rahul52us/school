// schemas/class/class.schema.ts
import mongoose, { Document, Schema } from 'mongoose';
import { ISchool } from '../school/school.schema';

// Interface for Schedule subdocument
interface IScheduleItem {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
  subject: string;
}

// Interface for Class document
export interface IClass extends Document {
  name: string;
  grade: string;
  section: string;
  academicYear: string;
  school: ISchool['_id'];
  classTeacher: string;
  room?: string;
  schedule?: IScheduleItem[];
  capacity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const ClassSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide class name'],
    maxlength: [50, 'Name cannot be more than 50 characters'],
    trim: true
  },
  grade: {
    type: String,
    required: [true, 'Please provide grade level'],
    trim: true
  },
  section: {
    type: String,
    required: [true, 'Please provide section'],
    trim: true
  },
  academicYear: {
    type: String,
    required: [true, 'Please provide academic year'],
    trim: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: [true, 'Please provide school']
  },
  classTeacher: {
    type: String,
    required: [true, 'Please provide class teacher name'],
    trim: true
  },
  room: {
    type: String,
    trim: true
  },
  schedule: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    }
  }],
  capacity: {
    type: Number,
    default: 30
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update the updatedAt field before saving
ClassSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Export model with interface type
export default mongoose.model<IClass>('Class', ClassSchema);