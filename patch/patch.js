/**
 * This file contains all functions for patching and validating a json patch
 * 
 * @fileOverview JSON PATCH
 * @author Alabi Emmanuel
 * @version 1.0.0
 */

const jsonPatch = require(`fast-json-patch`);

/**
 * @property {Object} applyPatch A function to apply patch
 * @property {Object} validatePatch A function to validate patch
 */

module.exports = {

    /**
     * A function to apply patch
     * 
     * @param {Object} doc The object to which patch will be applied
     * @param {Object[]} patch An array of patches to apply
     * 
     * @returns {Object} The patched object
     */
    applyPatch: (doc, patch) => {
        return jsonPatch.applyPatch(doc, patch).newDocument;
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
            return callback(false);
        }
    }
};