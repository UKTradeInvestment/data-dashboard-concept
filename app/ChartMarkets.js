import React from 'react';
import d3 from 'd3';
import dc from 'dc';

export default class ChartMarkets extends React.Component {
  constructor(props) {
    super(props);

    this._id = _.uniqueId('chart_markets__');
  }

  render() {
    const {width, height, data} = this.props;

    const chart = dc.barChart('#' + this._id);

    const chartDimention = data.cf.dimension(function(d) {
      return d.GeneralSector;
    });

    const chartGroup = chartDimention.group();

    chart
      .width(width)
      .height(height)
      .transitionDuration(750)
      .margins({top: 20, right: 10, bottom: 450, left: 50})
      .dimension(chartDimention)
      .group(chartGroup)
      .centerBar(true)
      .brushOn(true)
      .title(function(d, i) { return d.key + ': ' + (d.value || 0); })
      .elasticY(true)
      .colors(['steelblue'])
      .xUnits(dc.units.ordinal)
      .x(d3.scale.ordinal().domain([]))
      .renderHorizontalGridLines(true);

    chart.on('renderlet.d', function(_chart) {
        _chart.selectAll('g.x text')
        .style('text-anchor', 'end')
        .attr('transform', 'translate(-10,10)rotate(270)');

        _chart.selectAll('.bar')
        .attr('transform', 'translate(13,0)');
      });

    chart.render();

    const resetFilters = function() {
      chart.filterAll();
      dc.redrawAll();
    };

    return (
      <div id={this._id}>
        <div className="filter-group">
          <div className="reset" style={{display: 'none'}}>
            <strong>Markets filtered by:</strong> <span className="filter"></span>
          </div>
          <a className="reset btn btn-secondary btn-sm" href="#" onClick={resetFilters} style={{display: 'none'}}>Reset market filter</a>
        </div>
      </div>
    )
  }
}

ChartMarkets.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  data: React.PropTypes.object,
};
