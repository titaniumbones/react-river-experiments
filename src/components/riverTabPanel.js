import React from 'react'
import MarkdownFromUrl from './markdownFromUrl.js'
import Waterchart from '../components/waterchart.js'

export class Point extends React.Component {
  render() {
    const l=this.props.location,
          url=`https://www.google.com/maps/dir/?api=1&destination=${l[0]},${l[1]}`
    return (
      <li>
        <a href={url}>{this.props.name}</a>
      </li>
    )
  }
}

export class PointList extends React.Component {
  render() {
    const pEntries = Object.entries(this.props.points)
    return (
      <div>
      <h2 value="Map Links">Map Links</h2>
      <ul>
      {pEntries.length > 0 ?
       pEntries.map( (point, index) => {
         return <Point key={index} name={point[0]} location={point[1]}/>
       }) :
       <li>No Point Locations Provided</li>
      } 
      </ul>
      </div>
    )
  }
}

export default class RiverTabPanel extends React.Component {
  render() {
    const {points, slug} = this.props.river
    return (
      <div>
        <Waterchart
          spotslug={slug}
          checkUpdates={true}
        />
        {points && <PointList points={points}/>}
        <MarkdownFromUrl url={`/descriptions/${slug}.md`}/>
        </div>
    )
  }
}


