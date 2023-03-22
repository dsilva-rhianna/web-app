// (Re)Sets up the database, including a little bit of sample data
const db = require("./db_connection");

/**** Delete existing table, if any ****/

const drop_items_table_sql = "DROP TABLE IF EXISTS `items`;"

db.execute(drop_items_table_sql);

/**** Create "items" table (again)  ****/

const create_items_table_sql = `
CREATE TABLE items (
    id INT NOT NULL AUTO_INCREMENT,
    breed VARCHAR(45) NOT NULL,
    base VARCHAR(45) NOT NULL,
    secondary VARCHAR(45) NOT NULL,
    rarity VARCHAR(45) NOT NULL,
    quantity INT NOT NULL,
    description VARCHAR(500) NULL,
    PRIMARY KEY (id));
`
db.execute(create_items_table_sql);

/**** Create some sample items ****/

const insert_item_sql = `
    INSERT INTO items 
        (breed, base, secondary, rarity, quantity, description) 
    VALUES 
        (?, ?, ?, ?, ?, ? );
`
db.execute(insert_item_sql, ['Adamantis', 'Emerald', 'Folium', 'Common', '5',
        'The Adamantis pattern consists of three connected vertical diamonds down the frogs back in the secondary color, and the rest of the body in the base color. The center diamond is slightly larger than those above and below it and is more square-like in shape.']);

db.execute(insert_item_sql, ['Dextera', 'Purple', 'Tingo', 'Rare', '3',
        'The Dextera is a POP (Previously Only Promotional) frog. It can currently only be obtained by purchasing it for 25 potions in the FrogMart (when available), or as a gift from another player. It can not be found in the Pond, in minigames, or in presents. These frogs have footprint-like blotches on either side of the body (including the front legs) extending inward. These blotches are in the pattern color while the rest of the body is solid in the base color.']);

db.execute(insert_item_sql, ['Pluma', 'Maroon', 'Albeo', 'Legendary', '1',
        'The Plumas design has a gradient stripe pattern, with each stripe separated by a scalloped edge, closely resembling the Inseros pattern. The nose of the frog is the secondary color and the back of the frog is the base color.']);

db.execute(insert_item_sql, ['Viduo', 'Olive', 'Pruni', 'Rare', '1',
        'The pattern resembles the red marking on the back of a Black Widow spider. Frogs have an hourglass design in the center of the frogs back which is filled in with the pattern color. The rest of the frogs body is in the base color.']);


/**** Read the sample items inserted ****/

const read_items_table_sql = "SELECT * FROM items";

db.execute(read_items_table_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'items' initialized with:")
        console.log(results);
    }
);

db.end();