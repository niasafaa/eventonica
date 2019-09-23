require('dotenv').config();

// Include these for Eventful api calls

// const eventful = require('eventful-node');
// const eventfulClient = new eventful.Client(process.env.EVENTFUL_KEY);

const express = require('express');
const client = require('../database.js');

const router = express.Router();

// Get All Users
router.get('/users', (req, res) => {
  client.query('SELECT * from users', (err, results) => {
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

  client.query(
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

// Create your routes here!

module.exports = router;
