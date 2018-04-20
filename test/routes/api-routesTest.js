/* eslint-disable */
const assert = require(`chai`).assert;
const request = require(`request`);
const jwt = require(`../../auth/jsonwebtoken`);
const config = require(`../../config/config`);

let result = jwt.getToken({ username: config.userDetails.username });

/**@test {apiRoutes} */
describe(`apiRoutes`, function() {
    /**@test {api/apply-json-patch} */
    describe(`api/apply-json-patch`, function() {
        let reaponse;
        let formData = {
            doc: { firstName: "Albert", contactDetails: { phoneNumbers: [] } },
            patches: [ { op: "replace", path: "/firstName", value: "Joachim" },{ op: "add", path: "/lastName", value: "Wester" },{ op: "add", path: "/contactDetails/phoneNumbers/0", value: { number: "555-123" }  }]
        };

        beforeEach(function(done) {
            request.patch({
                url: `http://localhost:3000/api/apply-json-patch`,
                headers: {
                    Authorization: result,
                    "Content-Type": "application/json"
                },
                json: formData
            }, (err, res, body) => {
                response = body
                done();
            });
        });
        
        it(`response should equal {success: true, patchedData: { "firstName": "Joachim","contactDetails": { "phoneNumbers": [{ "number": "555-123" }] },"lastName": "Wester" }}`, function() {
            assert.deepEqual(response, {success: true, patchedData: { "firstName": "Joachim","contactDetails": { "phoneNumbers": [{ "number": "555-123" }] },"lastName": "Wester" }});
        });
    });
});