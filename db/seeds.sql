USE employees_DB;

INSERT INTO department (name) VALUES
    ("Management"),
    ("Sales"),
    ("HR"),
    ("Reception"),
    ("Customer service"),
    ("Accounting");

INSERT INTO role (title, salary, department_id) VALUES
    ("Branch Manager", 45000, 1),
    ("Salesman", 65000, 2),
    ("HR Rep", 42400, 3),
    ("Receptionist", 32000, 4),
    ("Customer service", 1, 5),
    ("Accounting", 71500, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ("Micheal", "Scott", 1, NULL),
    ("Jim", "Halpert", 2, 1),
    ("Toby", "Henderson", 3, 1),
    ("Pam", "Beasley", 4, 1);