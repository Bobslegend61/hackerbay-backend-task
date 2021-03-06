/**
 * This file contains all functions for signing a token
 * 
 * @fileOverview All jwt functions
 * @author Alabi Emmanuel
 * @version 1.0.0
 */

const jwt = require(`jsonwebtoken`);
const winston = require(`winston`);
const config = require(`../config/config`);


/**
 * An object to get and verify the token
 * 
 * @property {Object} getToken A function to get the signed token.
 * @property {Object} decodeToken A function to decode and get the payoad from the token.
 */
module.exports = {
    /**
     * A functon to sign token.
     * 
     * @param {{username: string, password: string}} payload The payload for signing the token.
     * 
     * @returns {string} The signed token.
     */
    getToken: (payload) => {
        return jwt.sign(payload, config.jsonwebtoken.secretOrPublicKey, { expiresIn: `1h` });
    },

    /**
     * A function to verify the token.
     * 
     * @param {string} token The signed token.
     * @param {function(err, payload)} callback Resolves an Error or a payload
     * 
     * @returns {Object} The payload which should be Alabi since we used {username: Alabi}.
     */
    decodeToken: (token, callback) => {
        return jwt.verify(token, config.jsonwebtoken.secretOrPublicKey, (err, payload) => {
            if(err) {
                callback(err);
                return winston.error(`Decoding jwt error: ${err}`);
            }

            if(!payload) return winston.error(`Could not find username or password on payload`);
            return callback(null, payload);
        });
    } 
};