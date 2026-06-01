import { connectDB } from "@/lib/db";

export async function GET() {
    try {
        await connectDB();

    // return JSON response
    return Response.json({
        success: true,
        message: 'API working'
    }, { status: 200 });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return Response.json({
            success: false,
            message: 'Something went wrong'
        }, { status: 500 });
        
    }

}