const core = require('@actions/core');
const axios = require('axios');

try {
  const location = core.getInput('location');
  const api_key = core.getInput('api-key');

  return axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${location}`, {
    params: {
      apikey: api_key,
      details: true,
    }
  })
  .then(response => {
    core.setOutput("sunrise", response.data.DailyForecasts[0].Sun.Rise);
    core.setOutput("sunset", response.data.DailyForecasts[0].Sun.Set);
  
  })
  .catch((error) => core.setFailed(error))
} catch (error) {
  core.setFailed(error.message);
}
