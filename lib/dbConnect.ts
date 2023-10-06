import mongoose from 'mongoose';

const uri = process.env.MONGODB_URL as string;

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(uri);
    return connection;
  } catch (err) {
    console.error('db connection fail:' + err);
  }
};

export default dbConnect;
