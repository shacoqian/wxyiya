var baseUrl = 'https://yqplan.com';

var getUrl = function(uri) {
    return baseUrl + uri;
}

var wxGet = function (uri, params, success, fail, complate) {
  wxRequest(uri, params, 'GET', success, fail, complate)
}

var wxPost = function (uri, params, success, fail, complate) {
  wxRequest(uri, params, 'POST', success, fail, complate)
}

var wxRequest = function (uri, params, method, success, fail, complate) {
  wx.request({
    url: getUrl(uri),
    data: params,
    method: method,
    dataType: 'json',
    success: success,
    fail: fail,
    complete: complate,
  })
}

module.exports.get = wxGet
module.exports.post = wxPost