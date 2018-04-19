#!/usr/bin/env node
const url = require('url');
const querystring = require('querystring');
const fetch = require('node-fetch');
const {spawnSync} = require('child_process');

async function init() {
  try {
    const {
      NOW_TOKEN,
      GITHUB_TOKEN,
      TRAVIS,
      TRAVIS_BRANCH,
      TRAVIS_PULL_REQUEST_BRANCH,
      TRAVIS_PULL_REQUEST,
      TRAVIS_REPO_SLUG,
    } = process.env;

    console.log({
      TRAVIS,
      TRAVIS_BRANCH,
      TRAVIS_PULL_REQUEST_BRANCH,
      TRAVIS_PULL_REQUEST,
      TRAVIS_REPO_SLUG,
    });

    let branchName = 'detached-HEAD';
    try {
      branchName = spawnSync('git', ['symbolic-ref', 'HEAD'], {
        encoding: 'utf8',
      }).stdout.replace('refs/heads/', '').replace(/\//g, '-').trim();
    } catch (error) {
    }

    if (TRAVIS == 'true') {
      if (TRAVIS_PULL_REQUEST == 'false') {
        branchName = TRAVIS_BRANCH;
      } else {
        branchName = TRAVIS_PULL_REQUEST_BRANCH;
      }
    }

    console.log(`Branch Name: ${branchName}`);

    const args = [
      'deploy',
      './www',
      '--name=bolt-design-system',
      '--team=boltdesignsystem',
      '--static',
    ];

    if (NOW_TOKEN) {
      args.push(`--token=${NOW_TOKEN}`);
    }

    console.log('Starting deploy...');
    const deployOutput = spawnSync('now', args, {encoding: 'utf8'});
    if (deployOutput.status !== 0) {
      console.error('Error deploying:');
    }
    console.log(deployOutput.stdout, deployOutput.stderr);
    const deployedUrl = deployOutput.stdout.trim();
    const deployedId = deployedUrl
      .replace('https://', '')
      .replace('bolt-design-system-', '')
      .replace('.now.sh', '');

    if (!deployedUrl) {
      // @todo determine if this is even needed since we have `deployedUrl` from deploy command
      const nowEndpoint = url.resolve('https://api.zeit.co/v2/now/deployments', `?${querystring.stringify({
        teamId: 'boltdesignsystem',
      })}`);

      const nowDeploys = await fetch(nowEndpoint, {
        headers: {
          'Authorization': `Bearer ${NOW_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json());

      if (!nowDeploys) {
        console.error('Did not get any info on latest now deploys...');
        process.exit(1);
      }

      nowDeploys.deployments.sort((a, b) => {
        return a.created - b.created;
      }).reverse();

      const latestDeploy = nowDeploys.deployments[0];
      // console.log(nowDeploys);
      console.log('Latest now Deploy:');
      console.log(latestDeploy);
    }

    // Can't have `/` or `--` in domain names. Replacing those with `-` and then encoding anything we missed.
    const branchUrlPart = encodeURIComponent(branchName.replace(/\//g, '-').replace('--', '-'));
    const aliasedUrlSubdomain = `bolt-design-system-${branchUrlPart}`;
    const aliasedUrl = `https://${aliasedUrlSubdomain}.now.sh`;
    const aliasOutput = spawnSync('now', [
      'alias',
      deployedUrl,
      aliasedUrlSubdomain,
    ], {encoding: 'utf8'});
    if (aliasOutput.status !== 0) {
      console.error('Error aliasing:');
    }
    console.log(aliasOutput.stdout, aliasOutput.stderr);
    // @todo get alias working
    // const aliasEndpoint = `https://api.zeit.co/v2/now/deployments/${deployedId}/aliases?${querystring.stringify({
    //   teamId: 'boltdesignsystem',
    // })}`;
    //
    // console.log('aliasEndpoint:');
    // console.log(aliasEndpoint);
    // const aliasResponse = await fetch(aliasEndpoint, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     alias: `bolt-design-system-${branchName}.now.sh`,
    //   }),
    //   headers: {
    //     'Authorization': `Bearer ${NOW_TOKEN}`,
    //     'Content-Type': 'application/json',
    //   },
    // }).then(res => res.json());
    //
    // console.log('aliasResponse: ');
    // console.log(aliasResponse);

    // `TRAVIS_PULL_REQUEST` is either `'false'` or a PR number like `'55'`. All strings.
    if (TRAVIS && TRAVIS_PULL_REQUEST != 'false') {
      console.log('This is a Pull Request build, so will not try to comment on PR.');

      // The GitHub comment template - Can handle HTML
      const githubCommentText = `
:zap: PR built on Travis and deployed a now preview here: 

- Branch link: ${aliasedUrl}
- Permalink: ${deployedUrl}

<details>

- Commit built: ${process.env.TRAVIS_COMMIT}
- [Travis build](https://travis-ci.org/${process.env.TRAVIS_REPO_SLUG}/builds/${process.env.TRAVIS_BUILD_ID})

</details>
`.trim();
      // end GitHub comment template

      const githubCommentEndpoint = `https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments`;

      const response = await fetch(githubCommentEndpoint, {
        method: 'POST',
        body: JSON.stringify({
          body: githubCommentText,
        }),
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      }).then(res => res.json());
      console.log(response);
      console.log('GitHub comment posted');
    } else {
      console.log('This is not a Pull Request build, so will not try to comment on PR.');
    }
    // @todo Errors should be passed to `catch`
  } catch (error) {
    console.log('Error');
    console.error(error);
  }
}

init();
