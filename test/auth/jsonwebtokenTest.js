/* eslint-disable */
const assert = require(`chai`).assert;
const jwt = require(`../../auth/jsonwebtoken`);
const config = require(`../../config/config`);

let result = jwt.getToken({ username: config.userDetails.username });

/**
 *@test {jwt}
 */
describe(`Generate and decode a token`, function() {
    /**@test {jwt#getToken} */
    describe(`#getToken()`, function() {
        it(`should return a token when passed a payload which should be of type string`, function() {
            assert.typeOf(result, `string`);
        });
    
        it(`should be an array and length should be 3 when it is splited into an array using the (.) as the reference`, function() {
            let splited = result.split(`.`);
            assert.isArray(splited);
            assert.lengthOf(splited, 3);
        });
    });

    /**@test {jwt#decodeToken} */
    describe(`#decodeToken()`, function() {
        it(`should return back the payload when the token is decoded`, function() {
            jwt.decodeToken(result, (err, payload) => {
                assert.typeOf(payload, `Object`);
                assert.equal(payload.username, `Alabi`);
            });
        });
    });
});