import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChartistGraph from 'react-chartist';
import moment from 'moment'
const Chartist = require('chartist')

export default class Waterchart extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef();
    this.state = {
      data:{
        series: [
          {name: 'Gauge date in CMS',
           data: this.props.seriesdata}
        ]
      },
      options: {
        scaleMinSpace: 200,
        showArea: false,
        axisX: {
          type: Chartist.FixedScaleAxis,
          divisor: 15,
          labelInterpolationFnc: function(value, index) {
            return moment(value).format('MM-DD [\n] HH:mm')
          }
        },
        // axisY: {scaleMinSpace: 100}
      },
      type: 'Line',
      
    }
  }

  componentDidMount = () => {
    this.setState({data:{
      series: [
        {name: 'Gauge date in CMS',
         data: this.props.seriesdata}
      ]}})
  }
  // stolen from https://github.com/fraserxu/react-chartist/blob/9f1bebca016552375c041785babefbb9aaf351a9/index.js#L36
  // not using for now astrying to build on react-chartist directly
  // updateChart = (props) => {
  //   let Chartist = require('chartist');
  //   console.log(props)
  //   let data  = this.props.data;
  //   let type = props.type || 'Line'
  //   let options = props.options || {};
  //   let responsiveOptions = props.responsiveOptions || [];
  //   let event;

  //   if (this.chartist) {
  //     this.chartist.update(data, options, responsiveOptions);
  //   } else {
  //     console.log('CHARTIST', this.chartRef.current, data, options, responsiveOptions)
  //     this.chartist = new Chartist.Line(this.chartRef.current, data, options, responsiveOptions);

  //     if (props.listener) {
  //       for (event in props.listener) {
  //         if (props.listener.hasOwnProperty(event)) {
  //           this.chartist.on(event, props.listener[event]);
  //         }
  //       }
  //     }
  //   }
  //   return this.chartist;
  // }
  
  render() {
    const series = [
      {name: 'Gauge date in CMS',
       data: this.props.seriesdata}
    ]
    console.log('FORCEHIDDEN', this.props.forcHidden)
    console.log("SERIESDATA", this.props.seriesdata, this.state.data)
    console.log('CHARTREF', this.chartRef.current)
    if (this.chartRef.current) {
      console.log('CHARTREF2', this.chartRef.current.chart.__chartist__.update)
      this.chartRef.current.chart.__chartist__.update(series)
    }
    return (
      <div>
      { !this.props.forceHidden &&  this.props.seriesdata ?
       <ChartistGraph ref={this.chartRef} data={{series: series}}
                      options={this.state.options} needsUpdate={this.props.forceHidden}
                      type={this.state.type} /> :
       <h3>No Data Yet</h3>
      }
      </div>
    )
  }
  OldRender() {
    // console.log('Chartist', Chartist)
    return (
      <div ref={this.chartRef}>
        <input type="button" onClick={this.updateChart(this.props)} value="Update HTML"/>
        {JSON.stringify(this.props.data)}
      </div>
    )
  }
}
