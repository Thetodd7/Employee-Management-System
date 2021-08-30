INSERT INTO department (name)
VALUES ("Engineering"),
       ("Sales"),
       ("Finance"),
       ("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Developer", 95000, 7001),
       ("Salesperson", 75000, 7002),
       ("Accountant", 85000, 7003),
       ("Customer Liason", 69000, 7004),
       ("Engineering Manager", 95000, 7001),
       ("Sales Manager", 95000, 7002),
       ("Finance Manager", 90000, 7003),
       ("Customer Services Manager", 95001, 7004);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Drake", "Graham", 8, NULL),
("Rick", "Ross", 7, NULL),
("Kanye", "West", 6, NULL),
("Jack", "Harlow", 5, NULL),
("Billy", "Idol", 3, 2),
("Ariana", "Grande", 3, 2),
("Miley", "Cyrus", 1, 4),
("Rick", "Sanchez", 1, 4),
("Tony", "Stark", 4, 1),
("Lady", "Gaga", 4, 1),
("Matthew", "McConaughey", 2, 3),
("Benito", "Ocasio", 2, 3);