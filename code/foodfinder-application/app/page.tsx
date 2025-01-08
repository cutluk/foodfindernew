import Head from "next/head";
import LocationsList from "components/locations-list";
import dbConnect from "middleware/db-connect";
import { findAllLocations } from "mongoose/locations/services";
import { LocationType } from "mongoose/locations/schema";

export default async function Home() {
    let locations: LocationType[] | [];
    try {
        await dbConnect();
        locations = await findAllLocations();
    } catch (err: any) {
        return <div>404 - Not Found</div>;
    }

    const title = `The Food Finder - Home`;

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content="The Food Finder - Home" />
            </Head>
            <h1>Welcome to the Food Finder!</h1>
            <LocationsList locations={locations} />
        </div>
    );
}
