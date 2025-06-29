import mongoose from 'mongoose';

const fundSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schemeCode: { type: String, required: true },
  schemeName: { type: String, required: true },
});

// Create a compound index on userId and schemeCode to ensure a user can't save the same fund twice
fundSchema.index({ userId: 1, schemeCode: 1 }, { unique: true });

// Remove any existing single-field index on schemeCode if it exists
// This is necessary because we only want uniqueness per user, not globally

export default mongoose.model('Fund', fundSchema);
