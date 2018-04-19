/**
 * This file includes the root routes.
 * For this app, the public endpoint is gonna be the route.
 * 
 * @fileOverview Routes
 * @author Alabi Emmanuel.
 * @version 1.0.0
 */

const express = require(`express`);
const winston = require(`winston`);
const config = require(`../config/config`);
const bcrypt = require(`../auth/bcrypt`);
const jsonwebtoken = require(`../auth/jsonwebtoken`);

let route = express.Router();

route.post(`/login`, (req, res) => {
    /**
     * @type {Object} Login in details of the user (username and password).
     */
    let loginDetails = req.body;
    if(!loginDetails.username || !loginDetails.password) {
        return res.json({
            success: false,
            message: `userename and password are required`
        });
    }

    if(loginDetails.username.toLowerCase() === config.userDetails.username.toLowerCase()) {
        // verify password
        bcrypt.hashPassword(config.userDetails.password, (err, hash) => {
            if(err) return winston.error(`#hashPassword error: ${err}`);
            bcrypt.comparePassword(loginDetails.password, hash, (err, isMatch) => {
                if(err) return winston.error(`#comparePassword error: ${err}`);
                if(!isMatch) return res.json({success: false, message: `Incorrect username/password`});
                
                // Generate token
                /**@type {string} token */
                let token = jsonwebtoken.getToken({username: loginDetails.username});
                return res.json({
                    success: true,
                    token
                });
            });
        });
    }else {
        return res.json({
            success: false,
            message: `wrong username/password`
        });
    }

});

// Export route
module.exports = route;