import React, { Component } from 'react'

export default class flipacoin extends Component {
  state = {}

  flipthecoin () {
  const headsortails = Math.floor(Math.random() * 2) ? 'heads': 'tails';
    this.setState({randomNum: headsortails});
  }

  render() {
    return (
      <div>
        <button onClick={() => this.flipthecoin()}>Flip!</button>
        <div>{this.state.randomNum? <h1>{this.state.randomNum}</h1> : ''}</div>
      </div>
    )
  }
}
