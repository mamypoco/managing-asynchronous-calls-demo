const axios = require('axios');
const dotEnv = require('dotenv');

dotEnv.config(); // Load variables from .env
const LOCATIONIQ_KEY = process.env.API_KEY;

let sevenWonders = {
  'Great Wall of China, China': {
    latitude: '...',
    longitude: '...'
  },
  'Petra': {
    latitude: '...',
    longitude: '...'
  },
  'Colosseum': {
    latitude: '...',
    longitude: '...'
  },
  'Chichen Itza': {
    latitude: '...',
    longitude: '...'
  },
  'Machu Picchu': {
    latitude: '...',
    longitude: '...'
  },
  'Taj Mahal': {
    latitude: '...',
    longitude: '...'
  },
  'Christ the Redeemer': {
    latitude: '...',
    longitude: '...'
  }
};


const findLatitudeAndLongitude = (query) => {
  let latitude, longitude, displayName;

  return axios.get('https://us1.locationiq.com/v1/search.php',
    {
      params: {
        key: LOCATIONIQ_KEY,
        q: query,
        format: 'json'
      }
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      displayName = response.data[0].display_name;
      console.log('success in findLatitudeAndLongitude!', latitude, longitude, displayName);

      return {latitude, longitude};
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
    });
};

// findLatitudeAndLongitude('Christ the Redeemer');

const RATE_LIMIT_DELAY = 1200; // ms
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const applyCoordinates = async () => {
  for (const [wonderName, coordinates] of Object.entries(sevenWonders)) {
    await delay(RATE_LIMIT_DELAY);
    const result = await findLatitudeAndLongitude(wonderName);
    
    coordinates.latitude = result.latitude;
    coordinates.longitude = result.longitude;

    console.log(sevenWonders);
  };
};

applyCoordinates();