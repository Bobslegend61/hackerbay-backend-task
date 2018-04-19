/**
 * This file includes all api routes.
 * For this app, the protected endpoint are gonna be the api routes because it returns useful information to the client
 * 
 * @fileOverview Api Routes
 * @author Alabi Emmanuel.
 * @version 1.0.0
 */

const express = require(`express`);
const guard = require(`../auth/auth-guard`);
let apiRoute = express.Router();

apiRoute.get(`/apply-json-patch`, guard, (req, res) => {
    res.send(`WORKING`);
});

// Export route
module.exports = apiRoute;