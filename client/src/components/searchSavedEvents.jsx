import React, { Component } from 'react';
import axios from 'axios';

class searchSavedEvents extends Component {
  state = { }
  searchKeyword() {
    this.setState({result:''});
    axios.get(`/api/events/${this.state.keyword}`)
    .then((res) => {
      console.log(res)
      if (typeof res.data != 'string'){this.setState({result:res.data.rows[0]})}
      else {this.setState({notFound: res.data})}})
    .catch((err) => {console.log(err)})
    
  }

  render() {
    const result = this.state.result ? 
            <div>
           <div>Found an event in our database:</div>
            <div> {'Title:' + this.state.result.title}</div>
            <div> {'Description:' + this.state.result.description}</div>
            <div> {'Start Time:' + this.state.result.date}</div>
            <div> {'Venue:' + this.state.result.location}</div>
            </div> : null;

    return (
      <React.Fragment>
        <div>Search for an event in our database. Hint: Take a look at send user to event page for all events that can be searched.</div>
        <input onChange={ event => this.setState({keyword: event.target.value})}></input>
        <button onClick= { () =>  this.searchKeyword() }>Search</button>
        <div>{result ? <div>{result}</div>: ''}</div>
        <div>{this.state.notFound ? <div>{this.state.notFound}</div>: ''}</div>  
      </React.Fragment>
    );
  }
}

export default searchSavedEvents;