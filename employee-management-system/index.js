const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

var  connection = require('./connectdb');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// Get all employees
app.get('/employees', (req, res) => {
  connection.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving employees from database');
    } else {
      res.json(results);
    }
  });
});

// Get employee by name
app.get('/employees/:name', (req, res) => {
  const { name } = req.params;
  const sql = `SELECT * FROM employees WHERE name = '${name}'`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving employee from database');
    } else if (results.length === 0) {
      res.status(404).send('Employee not found');
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new employee
app.post('/employees', (req, res) => {
  const { name, email, phone, address, hire_date } = req.body;
  if (!name || !email || !phone || !address || !hire_date) {
    res.status(400).send('Missing required fields');
  } else {
    const sql = `INSERT INTO employees (name, email, phone, address, hire_date) VALUES ('${name}', '${email}', '${phone}', '${address}', '${hire_date}')`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).send('Error creating employee');
      } else {
        res.status(201).send(`Employee with ID ${result.insertId} created`);
      }
    });
  }
});

// Update an employee by ID
app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, hire_date } = req.body;
  if (!name || !email || !phone || !address || !hire_date) {
    res.status(400).send('Missing required fields');
  } else {
    const sql = `UPDATE employees SET name = '${name}', email = '${email}', phone = '${phone}', address = '${address}', hire_date = '${hire_date}' WHERE id = '${id}'`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).send('Error updating employee');
      } else if (result.affectedRows === 0) {
        res.status(404).send('Employee not found');
      } else {
        res.send(`Employee with ID ${id} updated`);
      }
    });
  }
});

// Delete an employee by name
app.delete('/employees/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM employees WHERE id = ?', id, (err, results) => {
    if (err) {
      res.status(500).send('Error deleting employee');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Employee not found');
    } else {
      res.send(`Employee with ID ${id} deleted`);
    }
})});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

  
