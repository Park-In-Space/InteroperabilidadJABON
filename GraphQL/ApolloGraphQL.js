import {ApolloClient, InMemoryCache} from '@apollo/client';

 export const client = new ApolloClient({
    uri:"http://34.72.29.68:80/graphql",
    cache: new InMemoryCache(),
});

