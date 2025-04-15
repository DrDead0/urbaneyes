import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Camera from '@/models/Camera';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = params;

        const camera = await Camera.findById(id);
        
        if (!camera) {
            return NextResponse.json(
                { success: false, message: 'Camera not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: camera });
    } catch (error) {
        console.error('Error fetching camera:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch camera details' },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        await connectDB();

        const camera = await Camera.findByIdAndDelete(id);
        
        if (!camera) {
            return NextResponse.json(
                { success: false, message: 'Camera not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Camera deleted successfully',
            data: camera
        });
    } catch (error) {
        console.error('Error deleting camera:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete camera' },
            { status: 500 }
        );
    }
} 