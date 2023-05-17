const { Client } = require('pg');
const express = require('express')
const client = require('./connection');
const app = express()
var bodyParser = require('body-parser')
const port = 4000

app.use(bodyParser.json());

// get all records
app.get('/employee', (req, res) => {
  client.query('SELECT * FROM employee;', (err, data) => {
    if (err) {
      console.log("error", err);
      res.status(500).send("An error occurred");
    } else {
      console.log("rows", data.rows);
      res.end(JSON.stringify(data.rows));
    }
  });
});

app.listen(port, () => {
  console.log("express server running on port 3000");
})
