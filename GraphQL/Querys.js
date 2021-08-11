const { gql} = require('@apollo/client');

export const GET_LOCATIONS = gql;`
    query loc_location($id: Int!){
        loc_location(id:$id){
            latitude
            longitude
        }
    }
`;