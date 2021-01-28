//REQUIRE DEPENDENCIES
const mysql = require("mysql");
const inquirer = require("inquirer");

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
            "List "
        ]
    })
}