/**
 * This file includes all api routes.
 * For this app, the protected endpoint are gonna be the api routes because it returns useful information to the client
 * 
 * @fileOverview Api Routes
 * @author Alabi Emmanuel.
 * @version 1.0.0
 */

const express = require(`express`);
const patch = require(`../patch/patch`);
const guard = require(`../auth/auth-guard`);
let apiRoute = express.Router();

apiRoute.post(`/apply-json-patch`, guard, (req, res) => {
    let data = req.body;
    if(!data.doc || !data.patches) {
        return res.json({
            success: false,
            massage: `Data must be in format {doc: Object, patch: Object[]}`
        });
    }

    // validate patch
    patch.validatePatch(data.doc, data.patches, (isValid) => {
        if(!isValid) {
            return res.json({
                success: false,
                message: `Your patches are invalid.`
            });
        }

        /**@type {Object} The patched object*/
        let patchedData = patch.applyPatch(data.doc, data.patches);
        res.json({
            success: true,
            patchedData
        });
    });

});

// Export route
module.exports = apiRoute;