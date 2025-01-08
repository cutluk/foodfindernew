import Head from "next/head";
import dbConnect from "middleware/db-connect";
import { onUserWishlist } from "mongoose/locations/services";
import { LocationType } from "mongoose/locations/schema";
import ListClient from "./ListClient";

interface Props {
    params: {
        userId: string;
    };
}

async function fetchUserWishlist(userId: string): Promise<LocationType[]> {
    await dbConnect();
    return await onUserWishlist(userId);
}

export default async function List({ params }: Props) {
    const locations: LocationType[] = await fetchUserWishlist(params.userId);
    const userId: string = params.userId;
    let title = `The Food Finder - A personal wish list`;

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content="The Food Finder. A personal wish list." />
            </Head>
            <ListClient locations={locations} userId={userId} />
        </div>
    );
}