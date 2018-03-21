const fs = require("fs");
const isEqual = require("lodash.isequal");
const sortBy = require("lodash.sortby");
const stringify = require("json-stringify-pretty-compact");

const browserName = process.argv[2]; // Name of the browser as it appears in the UA string
const filepath = process.argv[3]; // Path to file with one UA string per line
const filterRegex = process.argv[4]; // Optional keyword that needs to be present to process the line (eg: the platform)

const browserRegex = new RegExp(`(?:\\s|^)${browserName}\\/([\\d.]+)(?:\\s|$)`);
const chromeRegex = /(?:\s|^)Chrome\/([\d.]+)(?:\s|$)/;

const entries = [];
const debug = {};
const lines = fs
  .readFileSync(filepath)
  .toString()
  .split("\n");

lines.forEach(line => {
  if (filterRegex && !new RegExp(filterRegex).test(line)) return;

  const [, browserVersion] = line.match(browserRegex) || [];
  const [, chromeVersion] = line.match(chromeRegex) || [];

  if (browserVersion && chromeVersion) {
    const [browserMajor, browserMinor] = browserVersion.split(".");
    const [chromeMajor, chromeMinor] = chromeVersion.split(".");

    const newEntry = [
      parseInt(browserMajor),
      parseInt(browserMinor),
      parseInt(chromeMajor),
      parseInt(chromeMinor),
    ];

    const existingEntry = entries.find(entry => isEqual(entry.slice(0, -1), newEntry));

    if (!existingEntry) {
      entries.push(newEntry.concat(1));
      debug[newEntry.join(", ")] = [line];
    } else {
      // This last column is used to track the number of occurrences to reject outliers
      existingEntry[4] += 1;
      debug[newEntry.join(", ")].push(line);
    }
  }
});

const output = sortBy(entries, [0, 1]).reverse();

fs.writeFileSync(`${browserName}-debug.json`, stringify(debug, null, 2));
fs.writeFileSync(`${browserName}.json`, stringify(output, null, 2));
