const request = require('request-promise-native');

exports.googlePlacesService = options => {
  const googleLocation = `&locationbias=circle:1000@43.6563,-79.3805`;
  const googleFields = `&fields=photos,formatted_address,name,rating,opening_hours,geometry`;
  const query = `key=${
    env.apiKey
  }&input=coffee%20shops%20toronto&inputtype=textquery${googleLocation}${googleFields}`;
  const endpoint = `${services.googlePlaces.base}?${query}`;
  console.log(endpoint);
  return request({
    method: 'GET',
    url: endpoint,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      Connection: 'keep-alive'
    }
    // body: construct(arg1, arg2 ...),
    // ...(process.env.NODE_ENV === 'development-variable' && {
    //   proxy: proxy,
    //   strictSSL: false
    // })
  });
};
