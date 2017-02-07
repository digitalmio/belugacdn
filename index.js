const Promise = require('bluebird');
const Request = require('superagent');

const config = require('./config');

class BelugaCdn {

  constructor(username, password) {
    this.auth = { username, password };
    this.cdnUrl = `${config.protocol}://${config.apiUrl}${config.apiPrefix}`;
  }

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

  // sites
  listSites(callback) {
    return this._callApi('GET', `sites`, null, callback);
  }

  addSite(data, callback) {
    return this._callApi('POST', `sites`, data, callback);
  }

  // Certificates
  
}

module.exports = BelugaCdn;