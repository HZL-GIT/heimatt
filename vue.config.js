const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer({
            browsers: ['Android >= 4.0', 'iOS >= 7'],
            overrideBrowserslist: [
              "Android 4.1",
              "ios 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8"
            ]
          }),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
          })
        ]
      }
    }
  }
};