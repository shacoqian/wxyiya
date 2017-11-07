//微信本地存储

var setCache = function(key, data) {
try {
    wx.setStorageSync(key, data)
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

var getCache = function(key) {
  try {
    return wx.getStorageSync(key);
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports.setCache = setCache
module.exports.getCache = getCache
