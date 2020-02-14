const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
var dbconnection = require('./DBConnection.js');

//  Delete country from countries table
app.delete('/countries_delete/:name', function (req, res) {

    let data = req.body.Name;

    dbconnection.query("DELETE FROM countries WHERE Name= '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });
});

//  Delete country from happiness_index_15 table
app.delete('/happiness_delete/:country', function (req, res) {

    let data = req.body.data.country;

    dbconnection.query("DELETE FROM happiness_index_15  WHERE Country= '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });
});

//  Delete country from suicide_rates_15 table
app.delete('/suicide_delete/:country', function (req, res) {

    let data = req.body.Country;
    
    dbconnection.query("DELETE FROM suicide_rates_15  WHERE Country= '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });
});

module.exports = app;