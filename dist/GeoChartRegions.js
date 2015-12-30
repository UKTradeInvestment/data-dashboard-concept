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

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

var _dc = require('dc');

var _dc2 = _interopRequireDefault(_dc);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _colorbrewer = require('colorbrewer');

var _colorbrewer2 = _interopRequireDefault(_colorbrewer);

var mapFile = require('./data/regions.json');

var chartProjection = _d32['default'].geo.mercator().center([0.12, 51.490]).scale(2000);

var GeoChartRegions = (function (_React$Component) {
  _inherits(GeoChartRegions, _React$Component);

  function GeoChartRegions(props) {
    _classCallCheck(this, GeoChartRegions);

    _get(Object.getPrototypeOf(GeoChartRegions.prototype), 'constructor', this).call(this, props);

    this._id = _lodash2['default'].uniqueId('geo_chart_regions__');
  }

  _createClass(GeoChartRegions, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var data = _props.data;

      var chart = _dc2['default'].geoChoroplethChart('#' + this._id);

      var chartDimention = data.cf.dimension(function (d) {
        return d.UKRegion;
      });

      var chartGroup = chartDimention.group();

      chart.width(width).height(height).dimension(chartDimention).group(chartGroup).projection(chartProjection).colors(_d32['default'].scale.quantize().range(_colorbrewer2['default'].OrRd[9])).colorDomain([0, 22]) // TODO calcumate max
      .colorCalculator(function (d) {
        return chart.colors()(d || 0);
      }).overlayGeoJson(mapFile.features, 'state', function (d) {
        return d.properties.EER13NM;
      }).title(function (d, i) {
        return d.key + ': ' + (d.value || 0);
      }).render();

      var resetFilters = function resetFilters() {
        chart.filterAll();
        _dc2['default'].redrawAll();
      };

      return _react2['default'].createElement(
        'div',
        { id: this._id },
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'a',
            { className: 'reset', href: '#', onClick: resetFilters, style: { display: 'none' } },
            'reset'
          ),
          _react2['default'].createElement(
            'span',
            { className: 'reset', style: { display: 'none' } },
            ' | Current filter:',
            _react2['default'].createElement('span', { className: 'filter' })
          )
        )
      );
    }
  }]);

  return GeoChartRegions;
})(_react2['default'].Component);

exports['default'] = GeoChartRegions;
;

GeoChartRegions.propTypes = {
  width: _react2['default'].PropTypes.number,
  height: _react2['default'].PropTypes.number,
  data: _react2['default'].PropTypes.object
};
module.exports = exports['default'];