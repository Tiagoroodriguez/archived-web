import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://tiagorodriguez0202:wbQuWjt3BJRnGEZr@cluster.h3fcmhk.mongodb.net/archived');
        console.log('DB is connected')
    } catch (error) {
        console.log(error);
    }
};
