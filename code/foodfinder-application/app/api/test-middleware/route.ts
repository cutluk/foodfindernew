import { NextRequest, NextResponse } from 'next/server';
import dbConnect from 'middleware/db-connect';
import { findAllLocations } from 'mongoose/locations/services';

export async function GET(req: NextRequest) {
    await dbConnect();
    const locations = await findAllLocations();
    return NextResponse.json(locations);
}