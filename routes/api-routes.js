/**
 * This file includes all api routes.
 * For this app, the protected endpoint are gonna be the api routes because it returns useful information to the client
 * 
 * @fileOverview Api Routes
 * @author Alabi Emmanuel.
 * @version 1.0.0
 */

const express = require(`express`);
const fs = require(`fs`);
const path = require(`path`);
const patch = require(`../patch/patch`);
const imgThumbnail = require(`../img-thumbnail/img-thumbnail`);
const guard = require(`../auth/auth-guard`);
let apiRoute = express.Router();

apiRoute.patch(`/apply-json-patch`, guard, (req, res) => {
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

apiRoute.post(`/create-thumbnail`, guard, (req, res) => {
    /**@type {string} Image uri */
    let imageUri = req.body.imageUri;
    /**@type {string} Filename */
    let filename = req.body.filename;

    if(!imageUri) return res.json({ success: false, message: `imageUri not found` });
    if(!filename) return res.json({ success: false, message: `filename not found` });
    if(filename.indexOf(`.`) !== -1) return res.json({ success: false, message: `Filename must not contain a .` });
    
    let imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
    if(!imageRegex.test(imageUri)) return res.json({ success: false, message: `invalid url` });

    imgThumbnail.downloadImage(imageUri, filename, (filename, format) => {
        imgThumbnail.resizeImage(filename, format, (filename, format) => {
            let img = fs.readFileSync(path.join(__dirname, `../output/${filename}_resized.${format}`));
            res.writeHead(200, { 'Content-Type': `image/${format}` });
            res.end(img, `binary`);
        });
    });
});

// Export route
module.exports = apiRoute;