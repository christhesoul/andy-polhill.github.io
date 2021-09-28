// const core = require('@actions/core');
const axios = require('axios');
const querystring = require('querystring');

const getTopTracks = async () => {
  // const time_range = core.getInput('time_range');
  // const client_id = core.getInput('client_id');
  // const client_secret = core.getInput('client_secret');

  const time_range = 'short_term';
  const client_id = 'f2ce966eef3f46318a59e648dfb08754'
  const client_secret = '597bdb6c6a724514a1a321146aa450ac';

  console.log('client_id: ', client_id);
  console.log('client_secret: ', client_secret);
  console.log('get tracks');

  debugger;

  const encodedToken = Buffer
    .from(`${client_id}:${client_secret}`)
    .toString("base64");

  try {

    const { data } = await axios.post("https://accounts.spotify.com/api/token", 
      querystring.stringify({ grant_type: "client_credentials" }), { 
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${encodedToken}`
        },
      });

    console.log('access_token: ', data.access_token);

      data.access_token = "BQDgi_kxoxCHBLumk0W4irWwhxyHyp3ygkFi0nVlnfO_olfbm7jYAyEH9wccUcPrjhMTcK5LU1tgDV3lnVt-CpQfNJrkNl1njfFqueGvznaDrKFbpukYbTopyfBL5aYk5lwlj8baKn0J0h2UjUysLsTdj4X9fek";

    const { data: track_data } = await axios.get(`https://api.spotify.com/v1/me/`, { // top/tracks
      params: {
        time_range,
        limit: 1
      },
      headers: {
        "Authorization": `Bearer ${data.access_token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }, {
      headers: {
        "Authorization": `Bearer ${data.access_token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

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

  // core.setOutput("track", "test-tracke");
  // core.setOutput("artist", "test-artist");
  // core.setOutput("href", "test-url");

} catch (error) {
  // core.setFailed(error.message);
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