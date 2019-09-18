require('dotenv').config();
const eventful = require('eventful-node');

const express = require('express');
const pool = require('../connection');

const client = new eventful.Client(process.env.EVENTFUL_KEY);

const router = express.Router();

// Get All Users
router.get('/users', (req, res) => {
  pool.query('SELECT * from users', (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results.rows);
  });
});

// Get All Events
router.get('/events', (req, res) => {
  pool.query('SELECT * from events', (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results.rows);
  });
});

// Create User
router.post('/adduser', (req, res) => {
  const user = {
    username: req.body.username,
    age: req.body.age
  };

  pool.query(
    'INSERT INTO users (username, age) VALUES ($1, $2)',
    [user.username, user.age],
    error => {
      if (error) {
        throw error;
      }
      res.send('You added a user to the databese.');
    }
  );
});

// Assoc User w/ Event
router.post('/assoc', (req, res) => {
  const assoc = {
    userID: req.body.userID,
    eventID: req.body.eventID
  };

  pool.query(
    'INSERT INTO usertoevent (user_id, event_id) VALUES ($1,$2)',
    [assoc.userID, assoc.eventID],
    error => {
      if (error) {
        throw error;
      }
      res.send('Success!');
    }
  );
});

// Search Events
router.post('/search', (req, res) => {
  client.searchEvents(
    { keywords: req.body.keyword, location: 'San Francisco', date: 'Next Week' },
    (err, data) => {
      if (err) {
        return console.error(err);
      }
      const event = {
        title: data.search.events.event[0].title,
        description: data.search.events.event[0].description.slice(0, 100),
        start_time: data.search.events.event[0].start_time,
        venue_name: data.search.events.event[0].venue_name
      };
      console.log(event);
      res.send(event);
    }
  );
});

// Save event
router.post('/saveevent', (req, res) => {
  const event = {
    title: req.body.title,
    description: req.body.description,
    location: req.body.venue_name,
    date: req.body.start_time
  };

  pool.query(
    'INSERT INTO events (title, description, location, date) VALUES ($1, $2, $3, $4)',
    [event.title, event.description, event.location, event.date],
    error => {
      if (error) {
        throw error;
      }
      res.send('You added an event to the databese.');
    }
  );
});

// Query User Events
router.post('/userevents', (req, res) => {
  const { userID } = req.body;

  pool.query(
    'SELECT DISTINCT users.username, events.title FROM usertoevent JOIN users ON usertoevent.user_id = users.id JOIN events ON usertoevent.event_id = events.id WHERE users.id = $1;',
    [userID],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.send(result);
    }
  );
});

// Query Event Attendees
router.post('/eventattendees', (req, res) => {
  const { eventID } = req.body;

  pool.query(
    'SELECT DISTINCT events.title, users.username FROM usertoevent JOIN users ON usertoevent.user_id = users.id JOIN events ON usertoevent.event_id = events.id WHERE events.id = $1;',
    [eventID],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.send(result);
    }
  );
});

module.exports = router;
