//REQUIRE DEPENDENCIES
const mysql = require("mysql");
const inquirer = require("inquirer");
const { registerPrompt } = require("inquirer");

//SET DATABASE TO BE USED, CREDENTIALS NEEDED, AND HOST/PORT
const dbConnection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "employees_DB"
});

//WHEN CONNECTED, RUN queryUser();
dbConnection.connect(function(err) {
    if (err) throw err;
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
            "Display employees by department",
            "Display employees by job role",
            "Display employees by assigned manager",
            "Change an employee's name",
            "Change an employee's job role",
            "Change an employee's department",
            "End program"
        ]
    })
    //HANDLE USER INPUT, RUN FUNCTION AFFILIATED WITH EACH OPTION
    .then(function(res) { 
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

            case "Display employees by department":
                departmentEmployees();
            break;

            case "Display employees by job role":
                roleEmployees();
            break;

            case "Display employees by assigned manager":
                managerEmployees();
            break;

            case "Change an employee's name":
                setEmployeeName();
            break;

            case "Change an employee's job role":
                setEmployeeJob();
            break;
            
            case "Change an employee's department":
                setEmployeeDepartment();
            break;

            case "End program":
                dbConnection.end();
            break;
        }
    })
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
        var problems = [];

        //TEST RESPONSE VALIDITY
        var validInfo = true;
        if (firstName !== "" || typeof(firstName) !== "string") {
            validInfo = false;
            problems.push(firstName);
        }
        if (lastName !== "" || typeof(lastName) !== "string") {
            validInfo = false;
            problems.push(lastName);
        }
        if (roleID !== "" || typeof(roleID) !== "number") {
            validInfo = false;
            problems.push(roleID);
        }
        if (managerID !== "" || typeof(managerID) !== "number") {
            validInfo = false;
            problems.push(managerID);
        }

        //ALERT USER OF ANY INVALID INPUTS AND LOG WHICH INPUTS FAILED VALIDITY TEST
        if (validInfo = false) {
            console.log("Some of the information you entered was invalid!");
            console.log("All invalid inputs: " + problems);
            console.log("Please try again with valid inputs.");
            addEmployee();
        }
        //IF VALIDITY TEST IS PASSED, INSERT USER INPUTS TO DB
        else {
            dbConnection.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                 VALUES ("${firstName}", "${lastName}", "${roleID}", "${managerID}")`
            ), 
            function(err) {
                if (err) throw err;
                "Employee added, returning hone."
                queryUser();
            }
        }
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
    .then(function(res) {
        //SET EACH USER RESPONSE TO MORE READABLE CONST
        const role = res.role;
        const salary = res.salary;
        const departmentID = res.departmentID;
        var problems = [];

        //TEST RESPONSE VALIDITY
        var validInfo = true;
        if (role !== "" || typeof(role) !== "string") {
            validInfo = false;
            problems.push(role);
        }
        if (salary !== "" || typeof(salary) !== "number") {
            validInfo = false;
            problems.push(salary);
        }
        if (departmentID !== "" || typeof(departmentID) !== "number") {
            validInfo = false;
            problems.push(departmentID);
        }

        //ALERT USER OF ANY INVALID INPUTS AND LOG WHICH INPUTS FAILED VALIDITY TEST
        if (validInfo = false) {
            console.log("Some of the information you entered was invalid!");
            console.log("All invalid inputs: " + problems);
            console.log("Please try again with valid inputs.");
            addRole();
        }
        //IF VALIDITY TEST IS PASSED, INSERT USER INPUTS TO DB
        else {
            dbConnection.query(
                `INSERT INTO role (title, salary, department_id)
                 VALUES ("${role}", "${salary}", "${departmentID}")`
            ), 
            function(err) {
                if (err) throw err;
                "Role added, returning home."
                queryUser();
            }
        }
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
    .then(function(res) {
        //SET EACH USER RESPONSE TO MORE READABLE CONST
        const department = res.department;
        var problems = [];

        //TEST RESPONSE VALIDITY
        var validInfo = true;
        if (department !== "" || typeof(department) !== "string") {
            validInfo = false;
            problems.push(role);
        }

        //ALERT USER OF ANY INVALID INPUTS AND LOG WHICH INPUTS FAILED VALIDITY TEST
        if (validInfo = false) {
            console.log("Some of the information you entered was invalid!");
            console.log("All invalid inputs: " + problems);
            console.log("Please try again with valid inputs.");
            addDepartment();
        }
        //IF VALIDITY TEST IS PASSED, INSERT USER INPUTS TO DB
        else {
            dbConnection.query(
                `INSERT INTO department (name)
                 VALUE ("${department}")`
            ), 
            function(err) {
                if (err) throw err;
                "Department added, returning home."
                queryUser();
            }
        }
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
        .then(function(res) {
            const firstName = res.firstName;
            const lastName = res.lastName;
            var problems = [];

            //TEST RESPONSE VALIDITY
            var validInfo = true;
            if (firstName !== "" || typeof(firstName) !== "string") {
                validInfo = false;
                problems.push(firstName);
            }
            if (lastName !== "" || typeof(lastName) !== "string") {
                validInfo = false;
                problems.push(lastName);
            }
            
            //ALERT USER OF ANY INVALID INPUTS AND LOG WHICH INPUTS FAILED VALIDITY TEST
            if (validInfo = false) {
                console.log("Some of the information you entered was invalid!");
                console.log("All invalid inputs: " + problems);
                console.log("Please try again with valid inputs.");
                rmEmployee();
            }
            //IF VALIDITY TEST IS PASSED, INSERT USER INPUTS TO DB
            else {
                dbConnection.query(
                    `DELETE FROM employees_DB.employee
                     WHERE first_name = "${firstName}" AND last_name = "${lastName}"`
                ), 
                function(err) {
                    if (err) throw err;
                    "Employee removed, returning hone."
                    queryUser();
                }
            }
        })
    ])
}

function rmRole() {
    inquirer.prompt([
        {
            name: "role",
            type: "input",
            message: "Enter the role title you wish to remove"
        }
        .then(function(res) {
            const role = res.role;
            var problems = [];

            //TEST RESPONSE VALIDITY
            var validInfo = true;
            if (role !== "" || typeof(role) !== "string") {
                validInfo = false;
                problems.push(role);
            }
            //ALERT USER OF ANY INVALID INPUTS AND LOG WHICH INPUTS FAILED VALIDITY TEST
            if (validInfo = false) {
                console.log("Some of the information you entered was invalid!");
                console.log("All invalid inputs: " + problems);
                console.log("Please try again with valid inputs.");
                rmRole();
            }
            //IF VALIDITY TEST IS PASSED, INSERT USER INPUTS TO DB
            else {
                dbConnection.query(
                    `DELETE FROM employees_DB.role
                     WHERE title = "${role}"`
                ), 
                function(err) {
                    if (err) throw err;
                    "Role removed, returning hone."
                    queryUser();
                }
            }
        })
    ])
}

function rmDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "Enter the department you wish to remove"
        }
        .then(function(res) {
            const department = res.department;
            var problems = [];

            //TEST RESPONSE VALIDITY
            var validInfo = true;
            if (department !== "" || typeof(department) !== "string") {
                validInfo = false;
                problems.push(department);
            }
            //ALERT USER OF ANY INVALID INPUTS AND LOG WHICH INPUTS FAILED VALIDITY TEST
            if (validInfo = false) {
                console.log("Some of the information you entered was invalid!");
                console.log("All invalid inputs: " + problems);
                console.log("Please try again with valid inputs.");
                rmDepartment();
            }
            //IF VALIDITY TEST IS PASSED, INSERT USER INPUTS TO DB
            else {
                dbConnection.query(
                    `DELETE FROM employees_DB.department
                     WHERE name = "${department}"`
                ), 
                function(err) {
                    if (err) throw err;
                    "Department removed, returning hone."
                    queryUser();
                }
            }
        })
    ])
}

function allEmployees() {

}

function departmentEmployees() {

}

function roleEmployees() {

}

function managerEmployees() {

}

function setEmployeeName() {

}

function setEmployeeName() {

}

function setEmployeeJob() {

}

function setEmployeeDepartment() {

}