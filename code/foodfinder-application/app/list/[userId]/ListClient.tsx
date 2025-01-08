"use client";

import { useSession } from "next-auth/react";
import { LocationType } from "mongoose/locations/schema";
import LocationsList from "components/locations-list";

interface ListClientProps {
    locations: LocationType[];
    userId: string;
}

export default function ListClient({ locations, userId }: ListClientProps) {
    const { data: session } = useSession();
    let isCurrentUsers = userId && session?.user.fdlst_private_userId === userId;

    return (
        <div>
            <h1>{isCurrentUsers ? "Your" : "A"} wish list!</h1>
            {isCurrentUsers && locations.length === 0 && (
                <>
                    <h2>Your list is currently empty! :(</h2>
                    <p>Start adding locations to your wish list!</p>
                </>
            )}
            <LocationsList locations={locations} />
        </div>
    );
}