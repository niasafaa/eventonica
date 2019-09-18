import React, { Component } from 'react';
import axios from 'axios';

class eventAttendees extends Component {
  state = {}

  componentDidMount() {
      axios.get('/api/events')
      .then((res) => {
        this.setState({events: res.data})
        })
      };

  showEvents (event) {
    if (this.state.events){
      return <button key={event.id} onClick={() => this.setState({eventSelected: event})} style={{ display: 'flex' }}>{event.title}</button> 
    }
  }

  showEventAttendees () {
    if (this.state.eventSelected) {
      const eventID = {
        eventID: this.state.eventSelected.id
      }

      axios.post('/api/eventattendees', eventID)
      .then((res) =>  this.setState({users: res.data.rows}));
      
    }
  }

  render() {
    return (
      <React.Fragment>
        <div> {this.state.events ? this.state.events.map((event) => (this.showEvents(event))): ''} </div>
        <div>{this.state.eventSelected ? this.state.eventSelected.title : ''}</div>
        <button onClick= { () =>  this.showEventAttendees() }>Submit</button>
        <div> {this.state.users ? this.state.users.map((user) => {return <div key={user.username}> {user.username} </div>}): ''} </div>
      </React.Fragment>
      );
  } 
}


export default eventAttendees;