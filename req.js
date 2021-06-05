const request = require('request');
 
_EXTERNAL_URL = 'https://corona.lmao.ninja/v2/all?yesterday=';

const callExternalApiUsingHttp = (callback) => {
    request(_EXTERNAL_URL, { json: true }, (err, res, body) => {
    if (err) { 
        return callback(err);
     }
    return callback(body);
    });
}

module.exports.callApi = callExternalApiUsingHttp;