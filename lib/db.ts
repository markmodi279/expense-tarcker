import mongoose from "mongoose";

export async function connectDB() {

    try {

        if(!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI environment variable not set");
    }

         // check if mongoose already connected
    const isConnected = mongoose.connection.readyState >= 1;

    // if connected, reuse existing connection
    if (isConnected) {
        console.log('reusing connection');
        return mongoose.connection;
    }

    // create new connection
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    return connection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
        
    }


}