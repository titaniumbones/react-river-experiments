import React from 'react'
import 'react-tabs/style/react-tabs.css'
import Breaks from '../surfspots.js'
import {Link, Router} from '@reach/router'

class Dummy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div>
        No content here for {this.props.name}
      </div>
    )
  }
}

export default function WaveTabs() {
 
  return (
    <div>
      <nav className="nav bg-primary"> 
        {Breaks.map( (spot) =>  <Link key={spot.slug} to={spot.slug}>{spot.name}</Link>)}
      </nav>
      <h2>Waves Coming Soon!</h2>
      <p>Please bear with us as we try to implement wave- related functionality. </p>

      <Router>
        {Breaks.map( (spot) =>  <Dummy key={spot.slug} path={spot.slug} name={spot.name}/>)}
      </Router>
    </div>
  )
}
class BreakTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h2> sorry, still nothing here</h2>
      </div>
    )
  }
}

