USE employees;
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('John', 'Tucker', 5, 5);
INSERT INTO department(name)
VALUES('Sales'),
('Finace'),
('Engineer'),
('Marketing');
INSERT INTO roles(title, salary, department_id)
VALUES('Sales intern', 20000, 1),
('Finance Accountant', 30000, 2),
('Mechanical Engineer', 40000, 3),
('Marketing Specialist', 50000, 4),
('Sales Lead', 60000, 5);