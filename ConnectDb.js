import mongoose from 'mongoose';
export const ConnectDb = async () => {
    try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDb Connected', conn.connection.host);
    } catch (error) {
        console.error("MongoDB not connected",error);
        process.exit(1);
    }
}