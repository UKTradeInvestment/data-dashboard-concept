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

var ChartMarkets = (function (_React$Component) {
  _inherits(ChartMarkets, _React$Component);

  function ChartMarkets(props) {
    _classCallCheck(this, ChartMarkets);

    _get(Object.getPrototypeOf(ChartMarkets.prototype), 'constructor', this).call(this, props);

    this._id = _.uniqueId('chart_markets__');
  }

  _createClass(ChartMarkets, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var data = _props.data;

      var chart = _dc2['default'].barChart('#' + this._id);

      var chartDimention = data.cf.dimension(function (d) {
        return d.GeneralSector;
      });

      var chartGroup = chartDimention.group();

      chart.width(width).height(height).transitionDuration(750).margins({ top: 20, right: 10, bottom: 450, left: 50 }).dimension(chartDimention).group(chartGroup).centerBar(true).brushOn(true).title(function (d, i) {
        return d.key + ': ' + (d.value || 0);
      }).elasticY(true).colors(['steelblue']).xUnits(_dc2['default'].units.ordinal).x(_d32['default'].scale.ordinal().domain([])).renderHorizontalGridLines(true);

      chart.on('renderlet.d', function (_chart) {
        _chart.selectAll('g.x text').style('text-anchor', 'end').attr('transform', 'translate(-10,10)rotate(270)');

        _chart.selectAll('.bar').attr('transform', 'translate(13,0)');
      });

      chart.render();

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

  return ChartMarkets;
})(_react2['default'].Component);

exports['default'] = ChartMarkets;

ChartMarkets.propTypes = {
  width: _react2['default'].PropTypes.number,
  height: _react2['default'].PropTypes.number,
  data: _react2['default'].PropTypes.object
};
module.exports = exports['default'];