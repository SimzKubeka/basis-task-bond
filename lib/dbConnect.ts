import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectToDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
};
