// /**
//  * Define the queries for the GraphQL schema
//  */
import {
    findAllLocations,
    findLocationsById,
    onUserWishlist,
} from "mongoose/locations/services";

// import {
//     findAllLocations,
//     findLocationsById,
//     onUserWishlist,
// } from "mongoose/locations/services";
// export const locationQueries = {
//     allLocations: async (_: any) => {
//         return await findAllLocations();
//     },
//     locationsById: async (_: any, param: { location_ids: string[] }) => {
//         return await findLocationsById(param.location_ids);
//     },
//     onUserWishlist: async (_: any, param: { user_id: string }) => {
//         return await onUserWishlist(param.user_id);
//     },
// };

// /**
//  * Each QUERY matches and is called by an QUERY entry
//  * in the schema of the same name and queries the data using the service
//  */
export const locationQueries = {
    allLocations: async (
        _: any,
        ) => {
        return await findAllLocations();
    },

    locationsById: async (
        _: any,
        param: { location_ids: string[] }
    ) => {
        return await findLocationsById(param.location_ids);
    },

    onUserWishlist: async (
        _: any,
        param: { user_id: string}
    ) => {
        return await onUserWishlist(param.user_id);
    },
};
