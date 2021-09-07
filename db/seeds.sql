
INSERT INTO department (name)
VALUES ("Engineering"),
       ("Sales"),
       ("Finance"),
       ("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Developer", 80000, 1001),
       ("Salesperson", 60000, 1002),
       ("Accountant", 75000, 1003),
       ("Customer Liason", 50000, 1004),
       ("Engineering Manager", 90000, 1001),
       ("Sales Manager", 90000, 1002),
       ("Finance Manager", 90000, 1003),
       ("Customer Services Manager", 90000, 1004);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Drake", "Scott", 8, NULL),
("Rick", "Ross", 7, NULL),
("Kanye", "West", 6, NULL),
("Jack", "Harlow", 5, NULL),
("Billy", "Idol", 3, 2),
("Ariana", "Grande", 3, 2),
("Miley", "Cyrus", 1, 4),
("Tony", "Stark", 1, 4),
("Anthony", "Stone", 4, 1),
("Jill", "Manders", 4, 1),
("Scott", "McPherson", 2, 3),
("Benito", "Ocasio", 2, 3);