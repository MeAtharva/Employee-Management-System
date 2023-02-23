const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

var  connection = require('./connectdb');

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: false }));

  
// Get all employees
app.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM employees';
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
      
    });
  });
  
  // Get employee by name
  app.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM employees WHERE name = '${id}'`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result[0]);
    });
  });
  
  // Add new employee
  app.post('/employees', (req, res) => {
    const { name, email, phone, address, hire_date } = req.body;
    const sql = `INSERT INTO employees (name, email, phone, address, hire_date) VALUES ('${name}', '${email}', '${phone}', '${address}', '${hire_date}')`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      // console.log('Added to Employees');
      res.json(result);
    });
  });
  
  // Update employee by ID
  app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, hire_date } = req.body;
    const sql = `UPDATE employees SET name = '${name}', email = '${email}', phone = '${phone}', address = '${address}', hire_date = '${hire_date}' WHERE name = '${id}'`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      // console.log('Deleted Successfully ', id);
      res.json(result);
    });
  });
  
  // Delete employee by name
  app.delete('/employees/:names', (req, res) => {
    const { names } = req.params;
    const sql = `DELETE FROM employees WHERE name = '${names}'`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      // console.log('Deleted Successfully ', names);
      res.json(result);
    });
  });

  const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

  