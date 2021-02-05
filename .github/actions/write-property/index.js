const core = require('@actions/core');
const fs = require('fs');

const config_file = './config.json';

try {
  const key = core.getInput('key');
  const value = core.getInput('value');
  const config = JSON.parse(fs.readFileSync(config_file));

  fs.writeFileSync(config_file, JSON.stringify({
    ...config,
    [key]: `${value}`
  }, null, 2))
  
} catch (error) {
  core.setFailed(error.message);
}
