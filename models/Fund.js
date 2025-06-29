import mongoose from 'mongoose';

const fundSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schemeCode: { type: String, required: true },
  schemeName: { type: String, required: true },
});

fundSchema.index({ userId: 1, schemeCode: 1 }, { unique: true });

export default mongoose.model('Fund', fundSchema);
