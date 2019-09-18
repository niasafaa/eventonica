import React, { Component } from 'react';
import axios from 'axios';

class assocUserEvent extends Component {
  state = {}

  componentDidMount() {
      axios.get('/api/users')
      .then((res) => {
        this.setState({users: res.data})
        })
      
        axios.get('/api/events')
        .then((res) => {
          this.setState({events: res.data})
          })
      
      };

  showUsers (user) {
    if (this.state.users){
      return <button key={user.id} onClick={() => this.setState({userSelected: user})} style={{ display: 'flex' }}>{user.username}</button> 
    }
  }

  showEvents (event) {
    if (this.state.events)
    return <button key={event.id} onClick={() => this.setState({eventSelected: event})} style={{ display: 'flex' }}>{event.title}</button> 
  }

  submitAssoc () {
    const assoc = {
      userID: this.state.userSelected.id,
      eventID: this.state.eventSelected.id
    };

    axios.post('/api/assoc', assoc)
    .then((res) => this.setState({status:`${this.state.userSelected.username} is going to ${this.state.eventSelected.title}!`}));
  }

  render() {

    return (
      <React.Fragment>
        <div> {this.state.users ? this.state.users.map((user) => (this.showUsers(user))): ''} </div>
        <div>{this.state.userSelected ? this.state.userSelected.username : ''}</div>
        <div> {this.state.events ? this.state.events.map((event) => (this.showEvents(event))): ''} </div>
        <div>{this.state.eventSelected ? this.state.eventSelected.title : ''}</div>
        <button onClick= { () =>  this.submitAssoc() }>Submit</button>
        <div>{this.state.status ? this.state.status:''}</div>
      </React.Fragment>
      );
  } 
}

export default assocUserEvent;