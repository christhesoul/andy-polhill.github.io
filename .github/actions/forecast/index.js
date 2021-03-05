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
    console.log(response.data.DailyForecasts[0]);

    core.setOutput("sunrise", response.data.DailyForecasts[0].Sun.Rise);
    core.setOutput("sunset", response.data.DailyForecasts[0].Sun.Set);
    core.setOutput("icon", response.data.DailyForecasts[0].Day.Icon);
    core.setOutput("iconPhrase", response.data.DailyForecasts[0].Day.IconPhrase);
    core.setOutput("cloudCover", response.data.DailyForecasts[0].Day.CloudCover);
    core.setOutput("moonRise", response.data.DailyForecasts[0].Moon.Rise);
    core.setOutput("moonSet", response.data.DailyForecasts[0].Moon.Set);
    core.setOutput("moonPhase", response.data.DailyForecasts[0].Moon.Phase);
  })
  .catch((error) => core.setFailed(error))
} catch (error) {
  core.setFailed(error.message);
}
