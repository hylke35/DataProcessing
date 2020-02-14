const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// connection configurations
var dbconnection = require('./DBConnection.js');

// define route variables
var world_select = require('./select.js');
var world_update = require('./update.js');
var world_delete = require('./delete.js');
var world_insert = require('./insert.js');

// define all routes
app.use('/world_select', world_select);
app.use('/world_delete', world_delete);
app.use('/world_insert', world_insert);
app.use('/world_update', world_update);

// set port
app.listen(3000, function () {
    console.log('node app is running on port 3000');
});

module.exports = app;