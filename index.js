const Promise = require('bluebird');
const Request = require('superagent');

const config = require('./config');

class BelugaCdn {

  constructor(username, password) {
    this.auth = { username, password };
    this.cdnUrl = `${config.protocol}://${config.apiUrl}${config.apiPrefix}`;
  }

  // make a call to Beluga API
  _callApi(method, endpoint, data, callback) {
    return new Promise((resolve, reject) => {

      var req = Request(method, this.cdnUrl + endpoint)
        .auth(this.auth.username, this.auth.password)
        .set('Accept', 'application/json');

      if ( ['PUT', 'POST'].includes(method) ) {
        req.send( data );
      }

      return req
        .then((data) => {
          if (callback) return callback(null, data.body);
          resolve(data.body);
        })
        .catch((err) => {
          if (callback) return callback(err);
          reject(err);
        });
        
    });
  }

  // Sites

  // list all sites on your account
  listSites(callback) {
    return this._callApi('GET', `sites`, null, callback);
  }

  // add new site / zone to account
  addSite(data, callback) {
    return this._callApi('POST', `sites`, data, callback);
  }

  // update existsing zone, call by name
  updateSite(siteName, data, callback) {
    return this._callApi('PUT', `sites/${siteName}`, data, callback);
  }

  // delete existsing zone, call by name
  deleteSite(siteName, callback) {
    return this._callApi('DELETE', `sites/${siteName}`, null, callback);
  }
  
}

module.exports = BelugaCdn;