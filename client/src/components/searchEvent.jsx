import React, { Component } from 'react';
import axios from 'axios';

class searchEvent extends Component {
  state = { }
  searchKeyword() {
    const keyword = {keyword: this.state.keyword}

    axios.post('/api/search', keyword)
    .then((res) => {this.setState({result:res.data})})

  }

  saveEvent() {
    axios.post('/api/saveevent', this.state.result)
    .then((res) => {this.setState({status:'You saved an event to the database!'})}) 
  }
  // <div>{result ? result.split('\n').map((i,key) => {return <div key={key}>{i}</div>;}): ''}</div> 

  render() {
    const result = this.state.result ? 
           <div>Here's an event in SF next week you might like:<br></br>
            Title: {this.state.result.title}<br></br>
            Description: {this.state.result.description}<br></br>
            Start Time: {this.state.result.start_time}<br></br>
            Venue: {this.state.result.venue_name}
            </div> : null;

    return (
      <React.Fragment>
        <div>Search for an event type with a keyword. I.e. dance, fashion, sports.</div>
        <input onChange={ event => this.setState({keyword: event.target.value})}></input>
        <button onClick= { () =>  this.searchKeyword() }>Search</button>
        <div>{result ? <div>{result}</div>: ''}</div> 
        <div>{result ? <button onClick={() => this.saveEvent()}>Save</button> : ''}</div>
        <div>{this.state.status ? this.state.status:''}</div>    
      </React.Fragment>
    );
  }
}

export default searchEvent;