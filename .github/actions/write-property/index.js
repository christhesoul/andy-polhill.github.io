const core = require('@actions/core');
const fs = require('fs');
const simple_git = require('simple-git');

const git = simple_git('');

try {
  const key = core.getInput('key');
  const value = core.getInput('value');
  const token = core.getInput('token');
  const config = JSON.parse(fs.readFileSync('./config.json'));
  fs.writeFileSync('./config.json', JSON.stringify({
    ...config,
    [key]: `${value}`
  }, null, 2))

  return git
    .init()
    .addConfig('user.name', 'virtual-town-mayor')
    .addConfig('user.email', '78474328+virtual-town-mayor@users.noreply.github.com')
    .remote([ 'set-url', 'origin', `https://virtual-town-mayor:${token}@github.com/${process.env.GITHUB_REPOSITORY}`])
    .fetch()
    .add('./config.json')
    .commit(`feat:(${key}): update value ${value}`)
    .push('origin', 'HEAD:gh-pages', ['-u', '-f'])
    .catch((error) => core.setFailed(error.message));

} catch (error) {
  core.setFailed(error.message);
}
