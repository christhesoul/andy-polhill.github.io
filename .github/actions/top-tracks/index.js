const core = require('@actions/core');
const axios = require('axios');
const querystring = require('querystring');

const getTopTracks = async () => {
  const time_range = core.getInput('time_range');
  const client_id = core.getInput('client_id');
  const client_secret = core.getInput('client_secret');

  console.log('client_id: ', client_id);
  console.log('client_secret: ', client_secret);
  console.log('get tracks');

  const encodedToken = Buffer
    .from(`${client_id}:${client_secret}`)
    .toString("base64");

  console.log('encodedToken: ', encodedToken.length);

  try {
    const { data } = await axios.post("https://accounts.spotify.com/api/token", 
      querystring.stringify({ grant_type: "client_credentials" }), { 
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${encodedToken}`
        },
      });

    console.log('access_token: ', data.access_token);

    axios.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common["Content-Type"] = "application/json";



    const { data: track_data } = await axios.get(`https://api.spotify.com/v1/me/`, { // top/tracks
      params: {
        time_range,
        limit: 1
      }
    })

    console.log('output')
    console.log(track_data);
    return data;
  } catch (e) {
    console.log(e);
  }

}

try {
  const data = getTopTracks();

  console.dir(data.items[0]);

  core.setOutput("track", "test-tracke");
  core.setOutput("artist", "test-artist");
  core.setOutput("href", "test-url");

} catch (error) {
  core.setFailed(error.message);
}





// console.log(response.data.DailyForecasts[0]);

// core.setOutput("sunrise", response.data.DailyForecasts[0].Sun.Rise);
// core.setOutput("sunset", response.data.DailyForecasts[0].Sun.Set);
// core.setOutput("icon", response.data.DailyForecasts[0].Day.Icon);
// core.setOutput("iconPhrase", response.data.DailyForecasts[0].Day.IconPhrase);
// core.setOutput("cloudCover", response.data.DailyForecasts[0].Day.CloudCover);
// core.setOutput("moonRise", response.data.DailyForecasts[0].Moon.Rise);
// core.setOutput("moonSet", response.data.DailyForecasts[0].Moon.Set);
// core.setOutput("moonPhase", response.data.DailyForecasts[0].Moon.Phase);
// })
// .catch((error) => core.setFailed(error))