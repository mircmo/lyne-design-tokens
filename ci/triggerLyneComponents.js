const shell = require('shelljs');
const argv = require('minimist');
const getCommit = require('./getTravisCommit');
const triggerTravis = require('lyne-helper-trigger-travis');

require('dotenv')
  .config();

(async () => {
  const jobId = argv(process.argv.slice(2))['i'];
  const commitMessage = await getCommit(jobId);

  try {

    await triggerTravis({
      branchName: 'master',
      message: `${commitMessage} (triggered from design tokens build)`,
      travisToken: process.env.TRAVIS_TOKEN,
      travisUrl: 'https://api.travis-ci.org/repo/lyne-design-system%2Flyne-components/requests'
    });

    shell.exit(0);
  } catch (e) {
    console.log('-->> Error while triggering travis build on lyne-components.');
    console.log(e);

    shell.exit(1);
  }
})();
