/* eslint no-console: 0 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpackConfigJs = require('./webpack.config.js');

var _webpackConfigJs2 = _interopRequireDefault(_webpackConfigJs);

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 3000 : process.env.PORT;
var app = (0, _express2['default'])();

if (isDeveloping) {
  (function () {
    var compiler = (0, _webpack2['default'])(_webpackConfigJs2['default']);
    var middleware = (0, _webpackDevMiddleware2['default'])(compiler, {
      publicPath: _webpackConfigJs2['default'].output.publicPath,
      contentBase: 'src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    });

    app.use(middleware);
    app.use((0, _webpackHotMiddleware2['default'])(compiler));

    app.get('*', function response(req, res) {
      res.write(middleware.fileSystem.readFileSync(_path2['default'].join(__dirname, 'dist/index.html')));
      res.end();
    });
  })();
} else {
  app.use(_express2['default']['static'](__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(_path2['default'].join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
