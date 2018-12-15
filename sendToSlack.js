/**
* Created by lmarkus on 5/23/15.
* Adapted from https://gist.github.com/foozmeat/82f177d60d5dfc7fc518
*/
'use strict';
var assert      = require('assert'),
   exec        = require('child_process').execFileSync,
   util        = require('util'),
   curl_json   = function(command) {return JSON.parse(exec(command.shift(), command).toString());},
   filename    = process.argv[2],
   channelId = process.argv[3],
   comment     = process.argv[4],
   token = process.argv[5];
   //------------------------------------
assert.notStrictEqual(token, '', 'Get an API token at https://api.slack.com/web#basics and enter it above');
assert.strictEqual(process.argv.length, 6, 'Usage: squirt <filename> <channelId> <comment> <token>');

var upload = util.format('curl -s -F file=@%s -F channels=%s -F initial_comment=%s -F token=%s https://slack.com/api/files.upload'.replace(/ /g, '\t'), filename, channelId, comment, token).split('\t');
var result = curl_json(upload);
assert.ok(result.ok, 'Upload Failed: ' + result.error);

console.log('Done!');
