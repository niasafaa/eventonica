import React, { Component } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'

class addUser extends Component {
  state = {  }
  
  addUser() {
    const user = {
      username: this.state.username,
      age: this.state.age
    };
    axios.post('/api/adduser', user)
    .then((res) => {this.setState({status:'You added a user to the database!'})})
  }

  render() {
    console.log(this.state.username);
    console.log(this.state.age);
    return (
      <React.Fragment>
        <div>Username</div>
        <input onChange={ event => this.setState({username: event.target.value})}></input>
        <div>Age</div>
        <input onChange={ event => this.setState({age: event.target.value})}></input>
        <button onClick={ () => this.addUser() }>Submit</button>
        <div>{this.state.status ? <Alert variant='success'>{this.state.status}</Alert>:''}</div>
      </React.Fragment>
    );
  }
}

export default addUser;