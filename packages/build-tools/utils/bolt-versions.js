const fs = require('fs');
const semver = require('semver');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const checkLinks = require('check-links');
const octokit = require('@octokit/rest')({
  debug: false,
  headers: {
    Accept: 'application/vnd.github.v3.raw',
  },
});

const { getConfig } = require('./config-store');

const urlsToCheck = [];

async function writeVersionDataToJson(versionData) {
  const config = await getConfig();
  let versionInfo = versionData;

  versionInfo.sort(function(a, b) {
    return semver.rcompare(a.label, b.label);
  });

  fs.writeFile(
    path.join(process.cwd(), config.dataDir, '/bolt-releases.bolt.json'),
    JSON.stringify({
      options: versionInfo,
    }),
    'utf8',
    err => {
      if (err) throw err;
    },
  );
}

async function gatherBoltVersions() {
  const versionSpinner = ora(
    chalk.blue('Gathering data on the latest Bolt Design System releases...'),
  ).start();

  const tagData = await octokit.repos.getTags({
    owner: 'bolt-design-system',
    repo: 'bolt',
    per_page: 9999,
  });

  const tags = tagData.data;
  const tagUrls = [];

  for (index = 0; index < tags.length; index++) {
    let tag = tags[index].name;

    let tagString = tag
      .replace(/\//g, '-') // `/` => `-`
      .replace('--', '-') // `--` => `-`
      .replace(/\./g, '-'); // `.` => `-`

    const newSiteUrl = `https://${tagString}.boltdesignsystem.com`;
    const oldSiteUrl = `https://${tagString}.bolt-design-system.com`;

    urlsToCheck.push(newSiteUrl);
    urlsToCheck.push(oldSiteUrl);
  }

  const results = await checkLinks(urlsToCheck);

  for (index = 0; index < tags.length; index++) {
    let tag = tags[index].name;
    let tagString = tag
      .replace(/\//g, '-') // `/` => `-`
      .replace('--', '-') // `--` => `-`
      .replace(/\./g, '-'); // `.` => `-`

    const newSiteUrl = `https://${tagString}.boltdesignsystem.com`;
    const oldSiteUrl = `https://${tagString}.bolt-design-system.com`;

    if (results[newSiteUrl].status === 'alive') {
      tagUrls.push({
        label: tag,
        type: 'option',
        value: newSiteUrl,
      });
    } else if (results[oldSiteUrl].status === 'alive') {
      tagUrls.push({
        label: tag,
        type: 'option',
        value: oldSiteUrl,
      });
    }
  }

  versionSpinner.succeed(
    chalk.green('Gathered data on the latest Bolt Design System releases!'),
  );

  return tagUrls;
}

async function getBoltVersions() {
  const versionsGathered = await gatherBoltVersions();
  return versionsGathered;
}

async function writeBoltVersions() {
  const versionsFound = await getBoltVersions();
  await writeVersionDataToJson(versionsFound);
}

module.exports = {
  getBoltVersions,
  writeBoltVersions,
};
