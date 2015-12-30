'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppCss = require('./App.css');

var _AppCss2 = _interopRequireDefault(_AppCss);

var _GeoChartRegionsJs = require('./GeoChartRegions.js');

var _GeoChartRegionsJs2 = _interopRequireDefault(_GeoChartRegionsJs);

var _ChartMarketsJs = require('./ChartMarkets.js');

var _ChartMarketsJs2 = _interopRequireDefault(_ChartMarketsJs);

var _crossfilter = require('crossfilter');

var _crossfilter2 = _interopRequireDefault(_crossfilter);

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

var csvDataFile = require('./data/business-wins-TEST.csv');

var App = (function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props);

    this.state = {
      data: {
        cf: (0, _crossfilter2['default'])([])
      }
    };
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var rows = _d32['default'].csv.parse(csvDataFile);

      this.setState({
        data: {
          cf: (0, _crossfilter2['default'])(rows)
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: _AppCss2['default'].app },
        _react2['default'].createElement(_GeoChartRegionsJs2['default'], { width: 650, height: 400, data: this.state.data }),
        _react2['default'].createElement(_ChartMarketsJs2['default'], { width: 1000, height: 600, data: this.state.data })
      );
    }
  }]);

  return App;
})(_react2['default'].Component);

exports['default'] = App;
module.exports = exports['default'];