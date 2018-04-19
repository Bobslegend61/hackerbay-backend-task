/**
 * The configuration file for this app
 * 
 * @fileOverview This file contains all configuration for this app.
 * @author Alabi Emmanuel
 * @version 1.0.0
 * @property {Object} jsonwebtoken Object containing all keys and configurations needed by jwt.
 * @property {Object} userDelails Object containing mock username and password.
 */


module.exports = {
    /**
     * @typedef {Object} jsonwebtoken
     * @property {string} secretOrPublicKey Secret key for signing token
     */
    jsonwebtoken: {
        secretOrPublicKey: `webtoken`
    },

    /**
     * @typedef {Object} userDetails
     * @property {string} username Mock username
     * @property {string} password Mock password
     */
    userDetails: {
        username: `Alabi`,
        password: `Alabi`
    }
};