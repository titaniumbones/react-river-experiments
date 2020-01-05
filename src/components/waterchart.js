import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChartistGraph from 'react-chartist';
import moment from 'moment'
// import {Resizable, ResizableBox} from 'react-resizable'
// const Chartist=require( '../libraries/chartist-with-segments.js')
import Segment from '../libraries/chartist-segmented-line.js'
import Chartist from 'chartist';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import { connect } from 'react-redux';
import Rivers from  '../rivers.js';
import {processGauge} from '../DataParsers.js'


// Add this function:
// right now this is mostly irrelevant.
// we don't set data here,
// which seems a little silly.  component should probably
// figureo ut its own data requirements
// ratherthan ask another component to do it. 
function mapStateToProps(state, ownProps) {
  const chartId = `${ownProps.spotslug}_${ownProps.date? moment(ownProps.date).valueOf() : 'latest'}`, 
        chartInfo = state.charts[chartId],
        seriesdata = chartInfo && chartInfo.gaugeData,
        height = chartInfo && chartInfo.height,
        width = chartInfo && chartInfo.width
  console.log('CHARTMAPPER', chartId, state.charts[chartId], ownProps)
  return {
    height: height,
    width: width,
    seriesdata: seriesdata
  };
}

// initialize the segment chart type
Segment(this || global, Chartist)



function getSpot (slug) {
  let value;
  console.log("GETSPOT", slug)
  for (const r of Rivers) {
    console.log('GETSPOT', r.slug, slug);
    if (r.slug === slug ) {value = r;}
  }
  return value;
}


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
      output = `<div class="${p.quality} container">${magSpan}${dateSpan}</div>`
  return output
}

const waterchartDefaultOptions =  {
  scaleMinSpace: 200,
  showArea: true,
  axisX: {
    type: Chartist.FixedScaleAxis,
    divisor: 15,
    labelInterpolationFnc: function(value, index) {
      return moment(value).format('MM-DD [\n] HH:mm')
    }
  },
  axisY: {scaleMinSpace: 20,
          position: "end",
          
          showLabel: true,
          // If the axis grid should be drawn or not
          showGrid: true,},
  plugins: [
    ChartistTooltip({
      tooltipFnc: generateTooltip, 
      anchorToPoint: false,
      appendToBody: false,
      
      //metaIsHTML: true
    })
  ],
  height: 350,
  width: "100%",
};


export class Waterchart extends Component {
  constructor(props) {
    super(props)
    console.log("UPDATECHART IN CONSTRUCTOR", this.spotDef, this.props.date, this.props.spotslug, this.props)
    
    this.spotDef = getSpot(this.props.spotslug)
    this.chartRef = React.createRef();
    this.type =  'SegmentedLine';
    this.options = {...waterchartDefaultOptions,
                    height: this.props.height || waterchartDefaultOptions.height,
                    width: this.props.width || waterchartDefaultOptions.width}

  }

  deleteData = () => this.props.dispatch({type: 'DELETE_CHART',
                                          id:`${this.props.spotslug}_${this.props.date? moment(this.props.date).valueOf() : 'latest'}`})
  updateData = () => {
    console.log("UPDATECHART", this.spotDef, this.props.date, this.props.spotslug, this.props)
    this.spotDef && processGauge(this.spotDef, this.props.date)
      .then (data =>{
        console.log('UPDATECHARTDATA', data)
        this.props.dispatch({type: 'UPDATE_CHART',
                             id: `${this.props.spotslug}_${this.props.date? moment(this.props.date).valueOf() : 'latest'}`,
                             payload: {gaugeData: data},
                            });
        // this.setState({rendered: true, gaugeData: data})
      })
  }

  
  componentDidMount = () => {
    console.log('DIDMOUNT', this.props.seriesdata)
    if (!this.props.seriesdata) {
      this.updateData()
    }
    
    if (this.props.checkUpdates) {
      this.keepUpdating = setInterval(this.updateData(), 120000) }
  }

  componentDidUpdate = () => {
    console.log('DIDUPDATE')
    if (this.chartRef.current &&
        this.options.width !== this.chartRef.current.chart.clientWidth) {
      // update width and height somewhere
    }
  }

  componentWillUnmount() {
    clearInterval(this.keepUpdating);
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
    return (
      <>
        { !this.props.forceHidden &&  this.props.seriesdata ?
          <div className="waterchart">
          <ChartistGraph ref={this.chartRef} data={{series: series}}
                         options={this.options} needsUpdate={this.props.forceHidden}
                         type={this.type} className="chartist" />
            <div className="buttons">
              <button className="bg-primary" onClick={this.updateData}>Update Data</button>
              <button className="bg-error" onClick={this.deleteData}>Delete Data</button>
            </div>
          </div>:
          <div className="waterchart empty">
            <h3>No Data Yet</h3>
            <button className="bg-primary" onClick={this.updateData}>Trigger Manual Update</button>
          </div>
      }
      </>
    )
  }
}

Waterchart.propTypes = {
  spotslug: PropTypes.string.isRequired,
  seriesdata: PropTypes.array,
  forceHidden: PropTypes.bool,
  //TODO: appropriate validator for date 
  // date: PropTypes.number,
  height: PropTypes.number,
  // width: PropTypes.number,
  checkUpdates: PropTypes.bool
}

Waterchart.defaultProps = {
  // date: moment.valueOf(),
  height: 350,
  width: "100%",
  checkUpdates: false
}

export default connect(mapStateToProps)(Waterchart)
