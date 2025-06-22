import mongoose from 'mongoose';

const PingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    timestamp: { type: String, required: true },
    parentId: { type: String, default: null },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Ping || mongoose.model('Ping', PingSchema);
