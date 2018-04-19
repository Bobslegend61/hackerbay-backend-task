/**
 * This file contains all methods for hashing and verifying password
 * 
 * @fileOverview Password encryption and comparing
 * @author Alabi Emmanuel
 * @version 1.0.0
 */


const bcrypt = require(`bcrypt`);

/**
 * @type {number} The cost of processing the data
 */
const saltRounds = 10;

/**
 * An object to get and verify the token
 * 
 * @property {Object} hashPassword A method to hash a password.
 * @property {Object} comparePassword A method to check if plain password an hash is same.
 */

module.exports = {
    /**
     * A method to hash a password
     * 
     * @param {string} plainPassword The users plain password.
     * @param {function(err,hash): string} callback Anonymous function to resolve error or the hashed password.
     * 
     * @returns A callback to be either resolved with the encrypted data salt or rejected with an Error.
     */
    hashPassword: (plainPassword,callback) => {
        bcrypt.hash(plainPassword, saltRounds, (err, /**@type {string} */hash) => {
            if(err) return callback(err);
            return callback(null, hash);
        });
    },
    

    /**
     * A method to verify if password is correct.
     * 
     * @param {string} plainPassword The users plain password.
     * @param {string} hash The hashed password of the user which should be stored in a db when the user first register.
     * @param {function(err, isMatch): boolean} callback Anonymous function that resolves error or compare passwords.
     * 
     * @returns A callback to be either resolved with an Error or a boolean weather the passwords matches or not.
     */
    comparePassword: (plainPassword, hash, callback) => {
        bcrypt.compare(plainPassword, hash, (err, /**@type {boolean} */isMatch) => {
            if(err) return callback(err);
            return callback(null, isMatch);
        });
    }
};