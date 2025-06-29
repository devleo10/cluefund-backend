import mongoose from 'mongoose';

const fundSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schemeCode: { type: String, required: true,unique:true },
  schemeName: { type: String, required: true,uniquetrue },
});

export default mongoose.model('Fund', fundSchema);
