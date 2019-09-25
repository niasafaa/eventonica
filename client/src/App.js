import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddUser from './components/addUser';
import SearchEvent from './components/searchEvent';
import SearchSavedEvent from './components/searchSavedEvents';
import AssocUserEvent from './components/assocUserEvent';
import UserEvents from './components/userEvents';
import EventAttendees from './components/eventAttendees';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path='/' render= {() => (
        <React.Fragment>
          <h1>Eventonica</h1>
            <Link style={{ display: 'flex' }} to="/addUser">Add User</Link>
            <Link style={{ display: 'flex' }} to="/searchevent">Search/Add Event</Link>
            <Link style={{ display: 'flex' }} to="/searchsavedevent">Search Saved Event</Link>
            <Link style={{ display: 'flex' }} to="/assocUserEvent">Send User to Event</Link>
            <Link style={{ display: 'flex' }} to="/userEvents">See User's Events</Link>
            <Link style={{ display: 'flex' }} to="/eventAttendees">See Event Attendees</Link>
        </React.Fragment>
        )}
      />
        <Route path='/addUser' component={AddUser} />
        <Route path='/searchevent' component={SearchEvent} />
        <Route path='/searchsavedevent' component={SearchSavedEvent} />
        <Route path='/assocUserEvent' component={AssocUserEvent} />
        <Route path='/userEvents' component={UserEvents} />
        <Route path='/eventAttendees' component={EventAttendees} />
    </div>
    </Router>
  );
}

export default App;
