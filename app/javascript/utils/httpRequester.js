const BODY_PARAMS_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH'];

export class HttpRequester {

  get(url, data, success, failure, options) {
    this.xhr(url, 'GET', data, success, failure, options)
  }

  post(url, data, success, failure, options) {
    this.xhr(url, 'POST', data, success, failure, options)
  }

  put(url, data, success, failure, options) {
    this.xhr(url, 'PUT', data, success, failure, options)
  }

  remove(url, data, success, failure, options) {
    this.xhr(url, 'DELETE', data, success, failure, options)
  }

  patch(url, data, success, failure, options) {
    this.xhr(url, 'PATCH', data, success, failure, options)
  }

  promise() {
    return {
      get: this.to_promise(this.get),
      remove: this.to_promise(this.remove),
      post: this.to_promise(this.post),
      put: this.to_promise(this.put),
      patch: this.to_promise(this.patch)
    }
  }

  to_promise(method) {
    return function (url, data, options) {
      return new Promise(function (resolve, reject) {
        method(url, data, resolve, reject, options)
      })
    }
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  serialize(obj, prefix) {
    var str = [],
      p;
    for (p in obj) {
      if (obj.hasOwnProperty(p) && !(obj[p] === undefined || obj[p] === null)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          this.serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }

  //this is the hack version that rails undertands
  // function serialize(obj, prefix) {
  //   var str = [], property;
  //   for(property in obj) {
  //     var Rproperty = property.match(/^\d+$/) ? '' : property;
  //     if (obj.hasOwnProperty(property) && !(obj[property] === undefined || obj[property] === null)) {
  //       var key = prefix ? prefix + "[" + Rproperty + "]" : Rproperty;
  //       var value = obj[property];
  //       str.push((value !== null && typeof value === "object") ?
  //       serialize(value, key) :
  //       encodeURIComponent(key) + "=" + encodeURIComponent(value));
  //     }
  //   }
  //   return str.join("&");
  // }

  //rails specific
  addCSRFToken(configuration) {
    var token = this.csrfToken();
    var property = this.csrfParam()
    if (token) {
      configuration.headers["X-CSRF-Token"] = token;
    }
  }

  transformHeader(configuration){
    let { headers } = configuration;
    let newHeaders = new Headers();
    let keys = Object.keys(configuration.headers);
    keys.forEach((key) => newHeaders.append(key, headers[key]));
    configuration.headers = newHeaders;
  }

  csrfToken(){
    return document.getElementsByName("csrf-token")[0].content;
  }

  csrfParam(){
    return document.getElementsByName("csrf-param")[0].content;
  }

  xhr(url, method, data, success, failure, options) {
    var requestURL = url;
    var configuration = {
      method: method,
      credentials: "same-origin",
      headers: {}
    };

    this.addCSRFToken(configuration);

    if (BODY_PARAMS_METHODS.indexOf(method) > -1) {
      configuration.body = JSON.stringify(data);
      configuration.headers = {
        ...configuration.headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }
    }

    if (method === 'GET' && data) {
      requestURL = url + '?' + serialize(data);
    }

    let successCallback = this.makeSuccessCallback(success);
    let failureCallback = this.makeFailureCallback(failure);

    fetch(requestURL, configuration).then(this.checkStatus).then(successCallback).catch(failureCallback);
  }

  makeSuccessCallback(callback) {
    return (response) => {
      if (callback && typeof (callback) == 'function') {
        if (response.headers.get('content-type').indexOf('json') > -1) {
          return response.json().then((data) => {
            callback(data, response.headers)
          });
        }
        return response.text();
      }
    }
  }

  makeFailureCallback(callback) {
    return (response) => {
      console.log(response);
      if (callback && typeof (callback) == 'function') {
        callback(response);
      } else {
        console.log(response);
      }
    }
  }
}

let instance = new HttpRequester();
export default instance;