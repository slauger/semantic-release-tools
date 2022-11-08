'use strict';

const fs = require('fs');
const micromatch = require('micromatch');

// default config from semantic-release core
const default_value = [
  '+([0-9])?(.{+([0-9]),x}).x',
  'master',
  'next',
  'next-major',
  {name: 'beta', prerelease: true},
  {name: 'alpha', prerelease: true}
];

// read .releaserc.json
var releaserc;

if (fs.existsSync('.releaserc.json')) {
  let rawdata = fs.readFileSync('.releaserc.json');
  releaserc = JSON.parse(rawdata);
} else {
  releaserc = [];
}

// get branch from env
let branch    = process.env.GIT_BRANCH;

// write default config if not present in json
if (!('branches' in releaserc)) {
  releaserc['branches'] = default_value;
}

var exit_code = 1;

console.log("info: validating '" + branch + "' against the following configuration");

console.log(releaserc['branches']);

releaserc['branches'].forEach(element => {
  // check if type is string
  if (typeof element === 'string' || element instanceof String) {
    if (micromatch.isMatch(branch, element)) {
      console.log("info: branch " + branch + " matches pattern '" + element + "'");
      exit_code = 0;
    }
  }
  // check if type is object
  if (typeof element === 'object' || element instanceof Object) {
    if ('name' in element) {
      if (micromatch.isMatch(branch, element['name'])) {
        console.log("info: branch " + branch + " matches pattern '" + element + "'");
        exit_code = 0;
      }
    }
  }
});

if (exit_code == 0) {
  console.log("info: matches found - branch '" + branch + "' is a release branch");
} else {
  console.log("info: no matches found - branch '" + branch + "' is NOT a release branch");
}

process.exit(exit_code);
