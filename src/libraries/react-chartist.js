import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

function mapStateToProps (state, ownProps) {
  const rawData = state.charts[ownProps.id].gaugeData
  return {
    data: {series: [
      {name: 'Gauge date in CMS',
       data: rawData }
    ]}
  }
}


export class ChartistGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
    }
  }

  displayName: 'ChartistGraph'

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.type !== prevState.type) {
      return { ...nextProps }
    }
    return null;
  }

  componentWillUnmount() {
    if (this.chartist) {
      try {
        this.chartist.detach();
      } catch (err) {
        throw new Error('Internal chartist error', err);
      }
    }
  }

  componentDidMount() {
    this.updateChart(this.props);
  }

  componentDidUpdate() {
    this.updateChart(this.props);
    
  }
  updateChart(config) {
    let Chartist = require('chartist');
    let { type, data } = config;
    //console.log('UPDATECHART RUNNING W NEW DATA', data)
    let options = config.options || {};
    let responsiveOptions = config.responsiveOptions || [];
    let event;

    if (this.chartist) {
      this.chartist.update(data, options, responsiveOptions);
    } else {
      this.chartist = new Chartist[type](this.chart, data, options, responsiveOptions);

      if (config.listener) {
        for (event in config.listener) {
          if (config.listener.hasOwnProperty(event)) {
            this.chartist.on(event, config.listener[event]);
          }
        }
      }
    }

    return this.chartist;
  }

  render() {
    const { className, style, children, data, type } = this.props;
    const childrenWithProps = children && Children.map(children, (child) => (
      cloneElement(child, {
        type,
        data
      })
    ));
    return (
      <div className={`ct-chart ${className || ''}`} ref={(ref) => this.chart = ref } style={style}>
         {childrenWithProps}
      </div>
    )
  }
}

ChartistGraph.propTypes = {
  type: PropTypes.oneOf(['Line', 'Bar', 'Pie', 'SegmentedLine']).isRequired,
  data: PropTypes.object,
  className: PropTypes.string,
  options: PropTypes.object,
  responsiveOptions: PropTypes.array,
  style: PropTypes.object
}



export default connect(mapStateToProps)(ChartistGraph)
