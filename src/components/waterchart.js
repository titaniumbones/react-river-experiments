import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChartistGraph from 'react-chartist';
import moment from 'moment'
// import {Resizable, ResizableBox} from 'react-resizable'
// const Chartist=require( '../libraries/chartist-with-segments.js')
import Segment from '../libraries/chartist-segmented-line.js'
import Chartist from 'chartist';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import '../../node_modules/chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css'

// initialize the segment chart type
Segment(this || global, Chartist)


function generateTooltip (meta, value) {
  // console.log(meta);
  // console.log('THIS IS THIS', value);
  const p = Chartist.deserialize(meta),
        units = p.units;
  // console.log(p, units, value);
  //console.log (p.quality, p.direction,(p.wvd ? "wave" : "wind"), (p.wvd || p.wdir));
  const date = moment(p.data[0]),
        magnitude =  p.data[1].toFixed(2);
  let dateSpan = `<span class="chartist-tooltip-value">${date.format('MM-D HH:mm')}</span>`,
      magSpan = `<span>${magnitude} ${units}; </span>`,
      text = `<span class="chartist-tooltip-value>${date.format('MM-DD - HH:mm')}<br>${magnitude}</span>`,
      output = `<div class="${p.quality} container">${magSpan}<br>${dateSpan}</div>`
  return output
}


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
        showArea: true,
        axisX: {
          type: Chartist.FixedScaleAxis,
          divisor: 15,
          labelInterpolationFnc: function(value, index) {
            return moment(value).format('MM-DD [\n] HH:mm')
          }
        },
        axisY: {scaleMinSpace: 200},
        plugins: [
          ChartistTooltip({
            tooltipFnc: generateTooltip, 
            anchorToPoint: false,
            appendToBody: false,
            
            //metaIsHTML: true
          })
        ],
        height: this.props.height,
        width: this.props.width,
      },
      type: 'SegmentedLine',
      
    }
  }

  componentDidMount = () => {
    this.setState({data:{
      series: [
        {name: 'Gauge date in CMS',
         data: this.props.seriesdata}
      ]}})
  }

  componentDidUpdate = () => {
    console.log('DIDUPDATE')
    if (this.chartRef.current &&
        this.state.options.width != this.chartRef.current.chart.clientWidth) {
      this.setState({options  : {...this.state.options,
                                 width: this.chartRef.current.chart.clientWidth,
                                 height : this.chartRef.current.chart.clientHeight}}   )
    }
    
    
  }
  
  
  render() {
    const series = [
      {name: 'Gauge date in CMS',
       data: this.props.seriesdata},
      {
        className: this.props.forceHidden ? 'hidden' : 'active',
        data: []
      }
    ]
    // console.log('FORCEHIDDEN', this.props.forcHidden)
    // console.log("SERIESDATA", this.props.seriesdata, this.state.data)
    // console.log('CHARTREF', this.chartRef.current)
    console.log('CHARTREFCLI', this.chartRef)
    // if (this.chartRef.current) {
    //   // this.state.options.width= this.chartRef.current.chart.clientWidth
    //   // this.state.options.height= this.chartRef.current.chart.clientHeight
    //   console.log('CHARTREF2', this.chartRef.current.chart.__chartist__.update)
    //   //this.chartRef.current.chart.__chartist__.update(series, this.state.options)
    // }
    return (
      <>
      { !this.props.forceHidden &&  this.props.seriesdata ?
       <ChartistGraph ref={this.chartRef} data={{series: series}}
                      options={this.state.options} needsUpdate={this.props.forceHidden}
                      type={this.state.type} className="waterchart" /> :
       <h3>No Data Yet</h3>
      }
      </>
    )
  }
}

Waterchart.propTypes = {
  seriesdata: PropTypes.array,
  forceHidden: PropTypes.bool,
  date: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number
}

Waterchart.defaultProps = {
  date: moment.valueOf(),
  height: 350,
  width: 700
}
