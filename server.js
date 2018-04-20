/**
 * This is the entry fille for this app.
 *  
 * @fileOverview This is the entry file for this app. 
 * @author Alabi Emmanuel
 * @version 1.0.1
 */


const express = require(`express`);
const bodyParser = require(`body-parser`);
const winston = require(`winston`);
const apiRoute = require(`./routes/api-routes`);
const route = require(`./routes/routes`);

// define app
const app = express();

/**
 * @const {(string|number)}
 */
let PORT = process.env.PORT || 3000;

// configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use middleware
app.use(`/`, route);
app.use(`/api`, apiRoute);


// configure logger
winston.configure({
    transports: [
        new (winston.transports.File)({ filename: `app.log` })
    ]
});
winston.add(winston.transports.Console);

// listen to port
app.listen(PORT, () => winston.info(`App listening on port: ${PORT}`));
