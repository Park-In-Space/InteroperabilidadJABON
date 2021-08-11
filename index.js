"use strict";
const fetch = require("cross-fetch");
var soap = require('soap');
var express = require('express');
var fs = require('fs');
const http  = require('http');
const { resolve } = require('path');
const url = `http://54.85.49.75:3001/locations`
const axios = require('axios')
const {ApolloClient, InMemoryCache, HttpLink} = require('@apollo/client');
const  { useQuery} = require('@apollo/client');

const { gql} = require('@apollo/client');

const client = new ApolloClient({
    link: new HttpLink({uri:"http://34.72.29.68:80/graphql",fetch}),
    cache: new InMemoryCache(),
});


const GET_LOCATIONS = gql;`
    query loc_location($id: Int!){
        loc_location(id:$id){
            latitude
            longitude
        }
    }
`;


async function getLocation(args) {
    var result = []
    const data = useQuery(GET_LOCATIONS,{
        variables: {
            id: parseInt(args)
        }
    })
    let response = "latitude: "+ data.loc_location.latitude +" longitude: "+ data.loc_location.longitude
    result.push(response);
    return {
        result: result
    }
}

// the service
var serviceObject = {
  
    LocationService: {
        LocationServiceSoapPort: {
            Location: getLocation
        }
    }
};

var xml = fs.readFileSync('service.wsdl', 'utf8');
// create express app
var app = express();

// root handler
app.get('/', function (req, res) {
  res.send('Node Soap Example!');
})

// Launch the server and listen
var port = 8000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
  
});