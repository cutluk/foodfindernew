import { Metadata } from "next";
import LocationDetail from "@/components/location-details";
import dbConnect from "middleware/db-connect";
import { findLocationsById } from "mongoose/locations/services";
import { LocationType } from "mongoose/locations/schema";

interface Props {
    params: {
        locationId: string;
    };
}

async function fetchLocation(locationId: string): Promise<LocationType | null> {
    await dbConnect();
    const locations = await findLocationsById([locationId]);
    return locations[0] ? JSON.parse(JSON.stringify(locations[0])) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locationId } = await params;
    const location = await fetchLocation(locationId);
    return {
        title: `The Food Finder - Details for ${location?.name}`,
        description: `The Food Finder. Detail page for ${location?.name}`,
    };
}

export default async function LocationPage({ params }: Props) {
    const { locationId } = await params;
    const location = await fetchLocation(locationId);

    if (!location) {
        return {
            notFound: true,
        };
    }

    return (
        <div>
            <h1>{location.name}</h1>
            <LocationDetail location={location} />
        </div>
    );
}