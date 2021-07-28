"use strict";

var soap = require('soap');
var express = require('express');
var fs = require('fs');
const http  = require('http');
const { resolve } = require('path');
const url = `http://54.85.49.75:3001/locations`
const axios = require('axios')

async function getLocation(args) {
    var result = []
    let res = await axios.get(`${url}/${args.message}.json`);
    let data = res.data
    let response = "latitude: "+ data.latitude +" longitude: "+ data.longitude 
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