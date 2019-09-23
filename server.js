// Node modules for server.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const client = require('./database.js');

// Initialize express
const app = express();

// Connection to database
const pgConnect = () => {
  client.connect(err => {
    if (err) throw err;

    console.log('Welcome to Eventonica Database');
    console.log('Connected as Administrator');
  });
};

// Initialize db connection
pgConnect();

// Set up port application
app.set('port', process.env.PORT || 5000);

// Setting up special middleware for production (deployed) application
if (process.env.NODE_ENV === 'production') {
  app.use(cors());
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// Setting up special middleware for local development
if (!process.env.NODE_ENV) {
  app.use(
    cors({
      origin: 'https://localhost:3000',
      credentials: true
    })
  );
}

// Body parsing middleware - https://learn.freecodecamp.org/apis-and-microservices/basic-node-and-express/use-body-parser-to-parse-post-requests/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware to connect our routes
app.use('/api', require('./routes/api'));

// Make app listen on port we set above
app.listen(app.get('port'), () => console.log(`Server started on port ${app.get('port')}`));
