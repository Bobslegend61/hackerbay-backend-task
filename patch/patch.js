/**
 * This file contains all functions for patching and validating a json patch
 * 
 * @fileOverview JSON PATCH
 * @author Alabi Emmanuel
 * @version 1.0.0
 */

const jsonPatch = require(`fast-json-patch`);
const winston = require(`winston`);

/**
 * @property {Object} applyPatch 
 * @property {Object} validatePatch 
 */

module.exports = {

    /**
     * A function to apply patch
     * 
     * @param {Object} doc The object to which patch will be applied
     * @param {Object[]} patches An array of patches to apply
     * 
     * @returns {Object} The patched object
     */
    applyPatch: (doc, patches) => {
        return jsonPatch.applyPatch(doc, patches).newDocument;
    },

    /**
     * A Function to validate patch
     * 
     * @param {Object} doc The object to which patch will be applied
     * @param {Object[]} patches An array of patches to apply
     * @param {function(isValid)} callback Resolves if patch is valid or not
     * 
     * @returns {Object} A callback 
     */
    validatePatch: (doc, patches, callback) => {
        /**@type {Array|undefined} */
        let errors = jsonPatch.validate(patches, doc);
        if(!errors || errors.length == 0) {
            return callback(true);
        }else {
            winston.warn(`Invalid patch`);
            return callback(false);
        }
    }
};