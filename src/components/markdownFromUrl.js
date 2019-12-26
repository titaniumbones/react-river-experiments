import React from 'react'
import Markdown from 'markdown-to-jsx'

export default class MarkdownFromUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content : '',
    }
  }
  
  componentDidMount = () => {
    const errText = '## No Information available Available'
    console.log('MARKDOWN', this.props, this.state)
    fetch(this.props.url)
      .then( (res) => res.text())
      .then( (text) => (text.length > 0 && text.substring(0,15) !== '<!DOCTYPE html>') ?
             this.setState({content: text}) && console.log("MARKDOWN", text) :
             this.setState({content:errText}) )
      .catch (() => (err) => this.setState({content:errText + err}))
  }
  
  render() {
    return (
      <Markdown>
      {this.state.content}
      </Markdown>)
  }
}
