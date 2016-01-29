import React from 'react';
import styles from './App.css';
import GeoChartRegions from './GeoChartRegions.js';
import ChartMarkets from './ChartMarkets.js';

import crossfilter from 'crossfilter';
import d3 from 'd3';

const csvDataFile = require('./data/business-wins-TEST.csv');

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        cf: crossfilter([]),
      },
    };
  }

  componentDidMount() {
    const rows = d3.csv.parse(csvDataFile);

    this.setState({
      data: {
        cf: crossfilter(rows),
      },
    });
  };

  render() {
    return (
      <div className={styles.app}>
        <GeoChartRegions width={600} height={375} data={this.state.data} />

        <ChartMarkets width={1110} height={1000} data={this.state.data} />
      </div>
    );
  }
}
