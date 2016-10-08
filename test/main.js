var fs = require('fs');
var assert = require('chai').assert;

var xejs = require('../index.js');

var config = require('./config');



describe("Main test", function() {
    this.timeout(5000);
    var regex = config.regex;
    it("Example file", function(done) {
        assert.ok(xejs);
        xejs(__dirname + '/file1.md', config.options, config.args, function(err, res) {
            assert.notOk(err);
            assert.ok(res);
            var i;
            for (i = 0; i < regex.match.length; i++) {
                assert.match(res, regex.match[i]);
            }
            for (i = 0; i < regex.notMatch.length; i++) {
                assert.notMatch(res, regex.notMatch[i]);
            }
            done();
        });
    });
    it("No arguments provided", function(done) {
        xejs(__dirname + '/file1.md', function(err, res) {
            assert.notOk(err);
            assert.ok(res);
            xejs(__dirname + '/file1.md', {}, function(err, res2) {
                assert.notOk(err);
                assert.ok(res2);
                assert.strictEqual(res, res2);
                assert.match(res, /Second\sfile\scontent/);
                assert.match(res, /\{\{\s*message\s*\}\}/)
                done();
            });
        });
    });
});
