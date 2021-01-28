//REQUIRE DEPENDENCIES
const mysql = require("mysql");
const consoleTable = require("console.table");
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
    
}