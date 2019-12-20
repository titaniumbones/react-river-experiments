import React from 'react';
import ReactDOM from 'react-dom';
import ChartistGraph from 'react-chartist';

export default class Line extends React.Component {
  constructor(props) {
    super(props)
    console.log("CHARTIST", this.props.data)
    this.state = {
      
    }
  }
  render() {
    console.log("CHARTIST", this.props.data)

    var series = {series: [
      {name: 'Gauge data in CMS',
       data: [1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1]
      }
    ]}

    var options = {
      scaleMinSpace: 200,
      //showArea: null,
      axisX: {
        type: ChartistGraph.FixedScaleAxis,
        divisor: 25,
        // labelInterpolationFnc: function(value) {
        //   return moment(value).format('MM-DD [\n] HH:mm');
        // }
      },
      axisY: {scaleMinSpace: 100},
      // targetLine: {
      //   value: spot.minHeight,
      //   class: 'ct-target-line'
      // },
      // plugins: [
      //   Chartist.plugins.tooltip({
      //     // tooltipFnc: generateTooltip, 
      //     anchorToPoint: true,
      //     //metaIsHTML: true
      //   }),
        // Chartist.plugins.ctThreshold({threshold:spot.minHeight})
      // ]
    };

    var type = 'Line'

    return (
      <div>
        <ChartistGraph data={series} options={options} type={type} />
      </div>
    )
  }
}

