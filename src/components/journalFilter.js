import React from 'react';
import {SelectSpot} from './journalForm.js'
import StarRating from './star-rating.jsx'
import {connect} from 'react-redux'
import {starFilter, dateFilter, spotFilter} from '../utils/filters.jsx'
import {initialState} from '../reducers/initialState.js'

function mapStateToProps(state,ownProps) {
  console.log('FILTERS?', state)
  return {
    filters: state.journalFilter}
}
export class JournalFilter extends React.Component {
    
  constructor(props) {
    super(props)
    
    const f = this.props.filter
    this.state= { ...f}
  };

  getValue = (key, array) => {
    array.reduce((val, kvpair) => key === kvpair[0] && kvpair[1])
  }
  // : false ;
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('SUBMIT', this.state)
    let {rating, spot, last} = this.state;
    if (spot==='none')  spot=false;
    this.props.dispatch({
      type: 'SET_FILTER',
      payload: {rating, spot, last, first: 0}
    })
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type ==='checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value})    
  }

  setRating = rating => {
    // console.log('SETRATING', typeof (rating))
    rating= Number(rating)
    this.setState({ rating: rating });
  };

  clearFilters = () => {
    console.log('CLEARFILTER', initialState.journalFilter)
    this.props.dispatch ({type: 'SET_FILTER', payload: initialState.journalFilter})}

  render() {
    let spot, last;
    this.props.filters.length > 0 ?
      {spot, last} = this.props.filters :
    spot = last = null
    return (
      <div className="journal-filter">
        <input onClick = {this.clearFilters} type="submit" value="Clear All Filters"
               className={`bg-dark`}/>
        <form  onSubmit={this.handleSubmit}>
          <SelectSpot onChange={this.handleChange}
                      onClick={this.handleChange}
                      current={spot}
                      allowNull={true}
          />
          <label >
            date:
            <input name="last" type="text" value={last} onChange={this.handleChange}/>
          </label>
          <label>
            Quality:
            <StarRating
              numberOfStars="5"
              currentRating={false}
              onClick={this.setRating}
            />
          </label>
          <input className="submit" type="submit" value="Filter Journal Entries" tabindex="10"/>
        </form>
      </div>
  )
  }
}

export default connect(mapStateToProps)(JournalFilter)
