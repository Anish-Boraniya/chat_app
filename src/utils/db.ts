import mongoose  from "mongoose";

const url = process.env.DB_URL as string;


const connectDB = () => {
    mongoose.connect(url)
       .then(() => console.log('MongoDB Connected...'))
       .catch((err) => {
        console.error("databse connection failed",err)
        throw new Error("Database connection error");
       });
}

export default connectDB;

