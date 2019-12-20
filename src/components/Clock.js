// not a working module, just old code!

function FD (props) {
  return (
    <h2>{props.date.toLocaleTimeString(undefined, {timeZone: props.tz})}</h2>
  )
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      tz: props.tz}
  }

  tick() {
    this.setState({date: new Date()})
  }
  
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  render() {
    return (
      <div>
      <FD date={this.state.date} tz={this.state.tz}/>
      </div>
    );
  }
}



// setInterval(tick,1000);

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
      {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
