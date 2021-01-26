const mysql = require("mysql");
const consoleTable = require("console.table");
const inquirer = require("inquirer");

const dbConnection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "employees_DB"
});

dbConnection.connect(function(err) {
    if (err) throw (err);
    queryUser();
});

function queryUser() {
    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Select an action",
        choices: [
            "New Department",
            "New Role",
            "New Employee",
            "View Department",
            "View Role",
            "View Employee",
            "Update Employee Role",
            "Exit"
        ]
    })
    .then(function(res) {
        switch (res.option) {
            case "New Department":
                newDepartment();
            break;

            case "New Role":
                newRole();
            break;

            case "New Employee":
                newEmployee();
            break;

            case "View Department":
                viewDepartment();
            break;

            case "View Role":
                viewRole();
            break;

            case "View Employee":
                viewEmployee();
            break;

            case "Update Employee Role":
                updateRole();
            break;
            
            case "Exit":
                dbConnection.end();
            break;
          }
    });
}

function newDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What new department would you like to add?",
        name: "department"
    })
    .then(function(res) {
        const department = res.department;
        const query = `INSERT INTO department (name) VALUES("${department}")`;

        dbConnection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            queryUser();
        });
    });
}

function newRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What new job title would you like to add?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the salary for this job?",
            name: "salary"
        },
        {
            type: "input",
            message: "What is this job's department (id)?",
            name: "departmentID"
        }
    ])
    .then(function(res) {
        const title = res.title;
        const salary = res.salary;
        const departmentID = res.departmentID;
        const query = 
            `INSERT INTO role (title, salary, department_id) VALUE("${title}", "${salary}", "${departmentID}")`;

        dbConnection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            queryUser();
        });
    });
}

function newEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is this employee's first name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is this employee's last name?",
            name: "lastName"
        },
        {
            type: "input",
            message: "What is this employee's role (id)?",
            name: "roleID"
        },
        {
            type: "input",
            message: "What is this employee's manager (id)?",
            name: "managerID"
        }
    ])
    .then(function(res) {
        const firstName = res.firstName;
        const lastName = res.lastName;
        const roleID = res.roleID;
        const managerID = res.managerID;
        const query = 
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${firstName}", "${lastName}", "${roleID}", "${managerID}")`;
        
        dbConnection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            queryUser();
        });
    });
}

function viewDepartment() {
    const query = "SELECT * FROM department";

    dbConnection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        queryUser();
    });
}

function viewRole() {
    const query = "SELECT * FROM role";
  
    dbConnection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        queryUser();
    });
}

function viewEmployee() {
    const query = "SELECT * FROM employee";

    dbConnection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        queryUser();
    });
}

function updateRole() {
    const query = "SELECT id, first_name, last_name, role_id FROM employee";

    dbConnection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
      
        inquirer.prompt({
            type: "input",
            message: "Which employee (id) would you like to update?",
            name: "employee"
        });
    });
}