//set up the server
const express = require( "express" );
const app = express();
const port = 8080;
const logger = require("morgan");

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index.html" );
} );

// define a route for the stuff inventory page
app.get( "/items", ( req, res ) => {
    res.sendFile( __dirname + "/views/items.html" );
} );

// define a route for the item detail page
app.get( "/items/details", ( req, res ) => {
    res.sendFile( __dirname + "/views/details.html" );
} );

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );