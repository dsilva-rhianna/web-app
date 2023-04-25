//set up the server
const DEBUG = true;
const express = require( "express" );
const app = express();
const port = 8080;
const logger = require("morgan");
const db = require('./db/db_connection');

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use( express.urlencoded({ extended: false }) );

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.render('index');
} );

// define a route for the stuff inventory page
const read_items_sql = `
    SELECT 
        id, breed, base, secondary, rarity, quantity
    FROM
        items
`
app.get( "/items", ( req, res ) => {
    db.execute(read_items_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else
            res.render('items', { inventory : results });
        });
});

// define a route for the item detail page
const read_details_sql = `
    SELECT 
        id, breed, base, secondary, rarity, quantity, description 
    FROM
        items
    WHERE
        id = ?
`
app.get( "/items/details/:id", ( req, res ) => {
    db.execute(read_details_sql, [req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.status(404).send(`No frog found with id = "${req.params.id}"` ); // NOT FOUND
        else {
            let data = results[0]; // results is still an array
            res.render('details', data);
        }
    });
});

// define a route for item DELETE
const delete_items_sql = `
    DELETE 
    FROM
        items
    WHERE
        id = ?
`
app.get("/items/details/:id/delete", ( req, res ) => {
    db.execute(delete_items_sql, [req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/items");
        }
    });
})

// define a route for item Create
const create_item_sql = `
    INSERT INTO items
        (breed, base, secondary, rarity, quantity)
    VALUES
        (?, ?, ?, ?, ?)
`
app.post("/items", ( req, res ) => {
    db.execute(create_item_sql, [req.body.breed, req.body.base, req.body.secondary, req.body.rarity, req.body.quantity], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            //results.insertId has the primary key (id) of the newly inserted element.
            res.redirect(`/items/details/${results.insertId}`);
        }
    });
})

// define a route for item UPDATE
const update_items_sql = `
    UPDATE
        items
    SET
        breed = ?,
        base = ?,
        secondary = ?,
        rarity = ?,
        quantity = ?,
        description = ?
    WHERE
        id = ?
`
app.post("/items/details/:id", ( req, res ) => {
    db.execute(update_items_sql, [req.body.breed, req.body.base, req.body.secondary, req.body.rarity, req.body.quantity, req.body.description, req.params.id], (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/items/details/${req.params.id}`);
        }
    });
})

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );