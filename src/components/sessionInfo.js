import '../../node_modules/chartist/dist/chartist.min.css'
import React from 'react';
// import PropTypes from 'prop-types'
import '../index.css';
import Rivers from  '../rivers.js';
import Waterchart from '../components/waterchart.js'


function getSpot (slug) {
  let value;
  for (const r of Rivers) {
    if (r.slug === slug ) {value = r;}
  }
  return value;
}


export default class SessionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.spotDef = getSpot(this.props.spot)
  }

  componentDidMount() {
  }

  
  render() {
    // TODO: Still al to of extra divs here, can we simplify? 
    return (
      <div className={`${this.props.className} session-meta`}
           ref={(el) => this.containerRef=el}>
        <div className="session-data">
          <Waterchart height={400}
                      spotslug={this.props.spot}  date={this.props.date}
                      width={this.containerRef && this.containerRef.current ?
                                    this.containerRef.current.clientWidth :
                                    800}
s          />
          {/* <RechartWaterChart data={this.state.gaugeData}/> */}
        </div>
      </div>
    )
  }
}
// export default connect(mapStateToProps)(SessionInfo)
