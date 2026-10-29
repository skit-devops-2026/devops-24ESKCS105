import mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: '' },
  college: { type: String, default: '' },
  offeredSkills: { type: [String], default: [] },
  requiredSkills: { type: [String], default: [] }
}, { timestamps: true });
export default mongoose.model('Student', studentSchema);
