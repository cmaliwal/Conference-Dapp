// contract to be tested
var Conference = artifacts.require("./Conference.sol");

// Test suite
contract('Conference', function (accounts) {
    var contractInstance;
    var registrationPrice = 1.8;
    var attendee = accounts[1];
    var attendeeFullName = "Archit soni";


    // Test case: do not register an attendee sending the wrong value
    it("should not register an attendee sending the wrong value", function () {
        return Conference.deployed().then(function (instance) {
            contractInstance = instance;

            return contractInstance.register(attendeeFullName, {
                from: attendee,
                value: web3.toWei(registrationPrice - 0.5, "ether"),
                gas: 500000
            });
        }).then(assert.fail)
            .catch(function (error) {
                assert(error.message.indexOf('revert') >= 0, "error should be revert");
            });
    });
});
