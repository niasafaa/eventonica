import React, { Component } from 'react';
import axios from 'axios';

class userEvents extends Component {
  state = {}

  componentDidMount() {
      axios.get('/api/users')
      .then((res) => {
        this.setState({users: res.data})
        })
      };

  showUsers (user) {
    if (this.state.users){
      return <button key={user.id} onClick={() => this.setState({userSelected: user})} style={{ display: 'flex' }}>{user.username}</button> 
    }
  }

  showUserEvents () {
    if (this.state.userSelected) {
      const userID = {
        userID: this.state.userSelected.id
      }

      axios.post('/api/userevents', userID)
      .then((res) =>  this.setState({events: res.data.rows}));
      
    }
  }

  render() {
    let read = this.state.events ? this.state.events : '';
    console.log(read)
    return (
      <React.Fragment>
        <div> {this.state.users ? this.state.users.map((user) => (this.showUsers(user))): ''} </div>
        <div>{this.state.userSelected ? this.state.userSelected.username : ''}</div>
        <button onClick= { () =>  this.showUserEvents() }>Submit</button>
        <div> {this.state.events ? this.state.events.map((event) => {return <div key={event.title}> {event.title} </div>}): ''} </div>
      </React.Fragment>
      );
  } 
}

export default userEvents;