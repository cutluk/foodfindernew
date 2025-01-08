/**
 * Renders all user documents as rows to the DOM.
 */

import LocationsListItem from "components/locations-list-item";
import styles from "./index.module.css";
import { LocationType } from "mongoose/locations/schema";

interface PropsInterface {
    locations: LocationType[];
}

const LocationsList = (props: PropsInterface) => {
    return (
        <ul className={styles.root}>
            {props.locations.map((location) => {
                return (
                    <LocationsListItem
                        location={location}
                        key={String(location.location_id)} // Ensure location_id is a string
                    />
                );
            })}
        </ul>
    );
};

export default LocationsList;
