import moment from 'moment'
import React, { Component } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export default class RechartWaterChart extends Component {
  constructor(props) {
    super(props)    
    this.state = {
      processedData: this.munge(this.props.data)
    }
  }

  formatXAxis(tickItem) {
    // If using moment.js
    // console.log ("MOMENT", tickItem)
    return moment(tickItem).format('MMM Do YY')
  }
  
  munge = (raw) => {
    return raw
  }
  
  render() {
    return (
      <div>
        <LineChart width={1000} height={300} data={this.props.data}>
          <Line type="monotone" dataKey="y" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="x" tickFormatter={this.formatXAxis} />
          <YAxis />
        </LineChart>        
      </div>
    )
  }
}
