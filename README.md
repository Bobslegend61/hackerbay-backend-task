# Backend Task
Build a simple stateless microservice in Nodejs, with three major functionalities -

* Authentication
* JSON Patching
* Thumbnails image generation

# clone
clone repository
```
git clone https://github.com/Bobslegend61/hackerbay-backend-task.git
```

# Install
install all dependencies
```
npm install
```

# packages
View [package.json](https://github.com/Bobslegend61/hackerbay-backend-task/blob/master/package.json)

# Start app server
App will be listening on port 3000
```
npm start
```
To start app server using nodemon
```
npm install -g nodemon
npm run dev
```

# Testing
Run all test scripts
```
npm test
```

# Endpoints
All endpoints are tested with [postman](https://www.getpostman.com/)
## public
* `/login` is a post request that's required to have a body object with username and password. This app uses a mock username and password

    `response` a json object with a token for authentication if successful or an error message if not
```json
{
    "username": "Alabi",
    "password": "Alabi" 
}
```

### Example
![success login](https://github.com/Bobslegend61/hackerbay-backend-task/blob/master/postman-img/success-login.PNG)

For wrong user details
![wrong-details](https://github.com/Bobslegend61/hackerbay-backend-task/blob/master/postman-img/wrong-details.PNG)

If a key is missing from the object
![no-key](https://github.com/Bobslegend61/hackerbay-backend-task/blob/master/postman-img/no-key.PNG)

## Protected
These routes are protected and requires an `Authorization` token send throught `headers` along with the data.

Protected routes responds with unauthorized if token are expired or not passed along with the headers
![unauthorized](https://github.com/Bobslegend61/hackerbay-backend-task/blob/master/postman-img/unauthorized.PNG)

* `/api/apply-json-patch` is a `PATCH request` with the object keys `doc` the object to which the patch is applied and `patches` the patches to apply.

    `responds` with an object containing the patched token

### Example
![patch](https://github.com/Bobslegend61/hackerbay-backend-task/blob/master/postman-img/authorized.PNG)

* `/api/create-thumbnail` a `POST request` that accepts an image url, downloads it, resizes it to 50x50 and responds with the resized image

### Example
![thumbnail](https://github.com/Bobslegend61/hackerbay-backend-task/blob/master/postman-img/img-thumbnail.PNG)


# API's
`./auth/jsonwebtoken.js`
### jsonwebtoken.getToken(payload)

Uses the [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) package and returns the `token` as a string.
* `payload` - some user info used as part of the token creation

### jsonwebtoken.decodeToken(token, callback)
Decodes a token and returns the payload or an error if token is invalid 

* `token` is the JsonWebToken string

`./auth/bcrypt.js`

Uses the [bcrypt](https://www.npmjs.com/package/bcrypt) package
### bcrypt.hashPassword(plainPassword, callback)
Hashes the users plain password (Don't store a plain password in the database). Callback is called with the hash or an error if something goes wrong

* `password` the password to be hashed

### bcrypt.comparePassword(plainPassword, hash, callback)
Compares a password with the hashed password of the original user. callback is called with a boolean of `true` if matches or `false` if not or an error if something goes wrong

* `plainPassword` password from login details
* `hash` hashed password from a db when user registers (for this app, we used a mock data, not a real database)

`./auth/auth-guard.js`

A function used by express as a middleware for guarding protected endpoint

`./img-thumbnail/img-thumbnail.js`

Contains functions for downloading and resizing images. it uses the [request](https://www.npmjs.com/package/request) package for the downloads and [sharp](https://www.npmjs.com/package/sharp) package for resizing an image

### imageThumbnail.downloadImage(url, filename, callback)
Downloads the image based on the url passed in. Callback is called with a filename and format of the image.
* `url` - Image URL to download
* `filename` - Name you wanna name the image

`./patch/patch.js`

Contains functions for validating and applying JSON patch. Uses the [fast-json-patch](https://www.npmjs.com/package/fast-json-patch) package

### patch.applyPatch(doc, patches)
Applies the patches to the doc
* `doc` - JSON object to which patch is to be applied
* `patches` - Patches to be applied on `doc`
### patch.validatePatch(doc, patches, callback)
Check to see if patches and doc are valid. Callback is called with a boolean `true` if valid and `false` if not

## Issue Reporting
If you have found a bug or if you have a feature request, please report them at this repository issues section.

# Author
[Alabi Emmanuel](https://github.com/Bobslegend61)

# License
This project is licensed under the MIT license.



