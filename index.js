//REQUIRE DEPENDENCIES
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require('console.table')({force: true});

//SET DATABASE TO BE USED, CREDENTIALS NEEDED, AND HOST/PORT
const dbConnection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "hv6xr5ek",
    database: "employees_DB"
});

//WHEN CONNECTED, RUN queryUser();
dbConnection.connect(function (err, res) {
    if (err) throw err;
    console.table(res);
    queryUser();
});

function queryUser() {
    console.log("DB connected, queryUser() triggered.")
    //MAIN INQUIRER PROMPT CONTAINING ALL DATABASE-ALTERING OPTIONS THE USER MAY SELECT
    inquirer.prompt({
        name: "home",
        type: "list",
        message: "Welcome to the employee tracker! Please select an action.",
        choices: [
            "Add new employee",
            "Add new job role",
            "Add new department",
            "Remove employee",
            "Remove job role",
            "Remove department",
            "Display all employees",
            "Change an employee's role",
            "End program"
        ]
    })
    //HANDLE USER INPUT, RUN FUNCTION AFFILIATED WITH EACH OPTION
    .then(function(res, err) {
        if (err) throw err; 
        switch(res.home) {
            case "Add new employee":
                addEmployee();
            break;

            case "Add new job role":
                addRole();
            break;

            case "Add new department":
                addDepartment();
            break;

            case "Remove employee":
                rmEmployee();
            break;

            case "Remove job role":
                rmRole();
            break;
            
            case "Remove department":
                rmDepartment();
            break;

            case "Display all employees":
                allEmployees();
            break;

            case "Change an employee's role":
                setEmployeeRole();
            break;

            case "End program":
                dbConnection.end();
            break;
        }
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter employee's first name"
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter employee's last name"
        },
        {
            name: "roleID",
            type: "input",
            message: "Enter employee's role id"
        },
        {
            name: "managerID",
            type: "input",
            message: "Enter employee's manager's id"
        }
    ])
    .then(function(res) {
        //SET EACH USER RESPONSE TO MORE READABLE CONST
        const firstName = res.firstName;
        const lastName = res.lastName;
        const roleID = res.roleID;
        const managerID = res.managerID;
        dbConnection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("${firstName}", "${lastName}", "${roleID}", "${managerID}")`, 
        function (err, res) {
            console.log(err);
            if (err) throw err;
            console.log("Employee added, returning home.");
            console.table(res);
            queryUser();
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            name: "role",
            type: "input",
            message: "Enter role title"
        },
        {
            name: "salary",
            type: "input",
            message: "Enter role salary"
        },
        {
            name: "departmentID",
            type: "input",
            message: "Enter role's department id"
        }
    ])
    .then(function(res, err) {
        if (err) throw err;
        //SET EACH USER RESPONSE TO MORE READABLE CONST
        const role = res.role;
        const salary = res.salary;
        const departmentID = res.departmentID;
        dbConnection.query(
            `INSERT INTO role (title, salary, department_id) VALUE ("${role}", "${salary}", "${departmentID}")`, 
        function (err, res) {
            if (err) throw err;
            console.log("Role added, returning home.");
            console.table(res);
            queryUser();
        });
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "Enter department name"
        }
    ])
    .then(function(res, err) {
        if (err) throw err;
        //SET EACH USER RESPONSE TO MORE READABLE CONST
        const department = res.department;
        dbConnection.query(
            `INSERT INTO department (name) VALUE ("${department}")`, 
        function (err, res) {
            if (err) throw err;
            console.log("Department added, returning home.");
            console.table(res);
            queryUser();
        });
    });
}

function rmEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter employee-to-be-removed's first name"
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter employee-to-be-removed's last name"
        }
    ])
    .then(function(res, err) {
        if (err) throw err;
        const firstName = res.firstName;
        const lastName = res.lastName;
        dbConnection.query(
            `DELETE FROM employee WHERE first_name = "${firstName}" AND last_name = "${lastName}"`, 
        function (err, res) {
            if (err) throw err;
            console.log("Employee removed, returning hone.");
            console.table(res);
            queryUser();
        });
    });
}

function rmRole() {
    inquirer.prompt([
        {
            name: "role",
            type: "input",
            message: "Enter the role title you wish to remove"
        }
    ])
    .then(function(res, err) {
        if (err) throw err;
        const role = res.role;
        dbConnection.query(
            `DELETE FROM role WHERE title = "${role}"`, 
        function (err, res) {
            if (err) throw err;
            console.log("Role removed, returning hone.");
            console.table(res);
            queryUser();
        });
    });
}

function rmDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "Enter the department you wish to remove"
        }
    ])
    .then(function(res, err) {
        if (err) throw err;
        const department = res.department;
        dbConnection.query(
            `DELETE FROM department WHERE name = "${department}"`, 
        function (err, res) {
            if (err) throw err;
            console.log("Department removed, returning home.");
            console.table(res);
            queryUser();
        });
    })
}

function allEmployees() {
    //GET ALL EMPLOYEES AND DISPLAY WITH CONSOLE TABLE TO FORMAT
    dbConnection.query(
        `SELECT * FROM employee`,
        function(res, err) {
            if (err) throw err;
            console.table([res]);
            queryUser;
        }
    );
}

function allRoleEmployees() {
    //GET ALL EMPLOYEES FROM REQUESTED ROLE AND DISPLAY WITH CONSOLE TABLE TO FORMAT
    inquirer.prompt([
        {
            name: "role",
            type: "input",
            message: "Enter role name"
        }
    ])
    .then(function(res, err) {
        if (err) throw err
        const role = res.role;
        dbConnection.query(
            `SELECT * FROM role WHERE title = "${role}"`,
            function(res, err) {
                if (err) throw err;
                console.table(res);
                queryUser();
            }
        );
    });
}

function setEmployeeRole() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter employee's first name"
        },        
        {
            name: "lastName",
            type: "input",
            message: "Enter employee's last name"
        },
        {
            name: "roleID",
            type: "input",
            message: "Enter employee's new role ID"
        }
    ])
    .then(function(res, err) {
        if (err) throw err;
        const firstName = res.firstName;
        const lastName = res.lastName;
        const roleID = res.roleID;
        dbConnection.query(
            `UPDATE employee SET role_id = "${roleID}" WHERE first_name = "${firstName}" AND last_name = "${lastName}"`, 
            function (err, res) {
            if (err) throw err;
            console.table(res);
            queryUser();
        });
    });
}