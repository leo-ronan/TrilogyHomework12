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