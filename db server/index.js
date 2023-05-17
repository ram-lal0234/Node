const { Client } = require('pg');
const express = require('express')
const client = require('./connection');
const app = express()
var bodyParser = require('body-parser')
const port = 2000

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

// get record using id 
app.get('/employee/:id', (req, res) => {
  const { id } = req.params;
  client.query('SELECT * FROM employee WHERE id = $1;', [id], (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
    } else {
      res.end(JSON.stringify(data.rows));
    }
  });
});

// delete data using id 
app.delete('/employee/:id', (req, res) => {
  const { id } = req.params;
  client.query('delete FROM employee WHERE id = $1;', [id], (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
    } else {
      res.end(JSON.stringify(data.rows));
    }
  });
});

// add data using post methos 
app.post('/employee', (req, res) => {
  var { firstName, lastName, email, dob, gender, education, company, experience, package } = req.body;
 
  client.query('INSERT INTO employee (firstName, lastName, email, dob, gender, education, company, experience, package) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
    [firstName, lastName, email, dob, gender, education, company, experience, package], 
    (err, data) => {
      if (err) {
        console.error("Error executing SQL query:", err);
      } else {
        res.end(JSON.stringify(data.rows));
      }
    });
});



// update value using put method
app.put('/employee/:id', (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  const empData = [name, salary, id];

  client.query('UPDATE empolyee SET name = $1, salary = $2 WHERE id = $3', empData, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
    } else {
      res.send(result);
    }
  });
});



app.listen(port, () => {
  console.log("express server running on port 3000");
})
