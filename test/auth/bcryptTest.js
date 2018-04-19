/* eslint-disable */
const assert = require(`chai`).assert;
const bcrypt = require(`../../auth/bcrypt`);
const config = require(`../../config/config`);

let hashedPassword;
/**@test {bcrypt} */
describe(`Hashing and comparing password`, function() {
    beforeEach(function(done) {
        bcrypt.hashPassword(config.userDetails.password, (err, hash) => {
            hashedPassword = hash;
            done();
        });
    });
    /**@test#hashPassword */
    describe(`#hashPassword()`, function() {
        it(`should output the hash`, function() {
            assert.exists(hashedPassword);
        });

        it(`password should be of type 'string'`, function() {
            assert.typeOf(hashedPassword, `string`);
        });

        it(`should not be equal to plain password`, function() {
            assert.notEqual(hashedPassword, config.userDetails.password);
        });

    });

    /**@test {bcrypt#decodePassword} */
    describe(`#comparePassword()`, function() {
        it(`should return a boolean`, function() {
            bcrypt.comparePassword(config.userDetails.password, hashedPassword, (err, isMatch) => {
                assert.isBoolean(isMatch);
            });
        });
    });
});