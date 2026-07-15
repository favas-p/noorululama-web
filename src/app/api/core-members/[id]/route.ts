import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { CoreMember } from '@/lib/models';

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    try {
        await dbConnect();
        const { id } = await params;
        const deleted = await CoreMember.findByIdAndDelete(id);

        if (!deleted) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        const updated = await CoreMember.findByIdAndUpdate(id, body, { new: true });

        if (!updated) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
    }
}
