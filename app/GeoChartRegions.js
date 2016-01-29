import React from 'react';
import d3 from 'd3';
import dc from 'dc';
import _ from 'lodash';
import colorbrewer from 'colorbrewer';

const mapFile = require('./data/regions.json');

const chartProjection = d3.geo.mercator()
  .center([0.12, 51.490])
  .scale(2000);

export default class GeoChartRegions extends React.Component {
  constructor(props) {
    super(props);

    this._id = _.uniqueId('geo_chart_regions__');
  }

  render() {
    const {width, height, data} = this.props;

    const chart = dc.geoChoroplethChart('#' + this._id);

    const chartDimention = data.cf.dimension(function(d) {
      return d.UKRegion;
    });

    const chartGroup = chartDimention.group();

    chart
      .width(width)
      .height(height)
      .dimension(chartDimention)
      .group(chartGroup)
      .projection(chartProjection)
      .colors(d3.scale.quantize().range(colorbrewer.OrRd[9]))
      .colorDomain([0, 22])  // TODO calcumate max
      .colorCalculator(function(d) { return chart.colors()(d || 0); })
      .overlayGeoJson(mapFile.features, 'state', function(d) {
        return d.properties.EER13NM;
      })
      .title(function(d, i) { return d.key + ': ' + (d.value || 0); })
      .render();

    const resetFilters = function() {
      chart.filterAll();
      dc.redrawAll();
    };

    return (
      <div id={this._id}>
        <div className="filter-group">
          <div className="reset" style={{display: 'none'}}>
            <strong>Regions filtered by:</strong> <span className="filter"></span>
          </div>
          <a className="reset btn btn-secondary btn-sm" href="#" onClick={resetFilters} style={{display: 'none'}}>Reset region filter</a>
        </div>
      </div>
    )
  }
};

GeoChartRegions.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  data: React.PropTypes.object,
};
