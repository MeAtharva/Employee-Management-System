CREATE DATABASE employee_management;

USE employee_management;

CREATE TABLE employees (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(100) NOT NULL,
  hire_date DATE NOT NULL,
  PRIMARY KEY (id)
);