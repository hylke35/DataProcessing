const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
var dbconnection = require('./DBConnection.js');

//  Retrieve all countries JSON
app.get('/countries', function (req, res) {
        dbconnection.query('SELECT c.Name, c.Region, c.Population, c.Area, c.Population_Density, c.Coastline, c.Net_Migration, c.Infant_Mortality, c.GDP, c.Literacy, c.Phones, c.Arable, c.Crops, c.Other, c.Climate, c.Birthrate, c.Deathrate, c.Agriculture, c.Industry, c.Service, h.Score, h.Support, h.Freedom, h.Generosity, h.Corruption, s.Year, s.Sex, s.Age, s.Suicide_no, s.Population_PerYear, s.Suicide_rate, s.Country_year, s.HDI_year, s.GDP_year, s.GDP_capita, s.Generation FROM countries c, happiness_index_15 h, suicide_rates_15 s WHERE c.Name = h.Country AND c.Name = s.Country', function (error, results, fields) {
            if (error) throw error;

            if (req.headers['content-type'] == "application/json"){
                return res.send({Countries: results})
            } else if (req.headers['content-type'] == "application/xml"){
                var xmlString = '<Countries>\n';
                for (var i = 0; i < results.length; i++){
                    xmlString += "<Country>\n";
                    Object.keys(results[i]).forEach(function(key) {
                        var value = results[i][key];
                            xmlString += "<" + key + ">" + value + "</" + key + ">\n";
                    });
                    xmlString += "</Country>\n";
                }
                xmlString += "</Countries>";
                return res.send(xmlString);
            }
        });
});

//  Retrieve all countries grouped by Name
app.get('/countries_groupby', function (req, res) {
    dbconnection.query('SELECT c.Name, c.Region, c.Population, c.Area, c.Population_Density, c.Coastline, c.Net_Migration, c.Infant_Mortality, c.GDP, c.Literacy, c.Phones, c.Arable, c.Crops, c.Other, c.Climate, c.Birthrate, c.Deathrate, c.Agriculture, c.Industry, c.Service, h.Score, h.Support, h.Freedom, h.Generosity, h.Corruption, s.Year, s.Sex, s.Age, s.Suicide_no, s.Population_PerYear, s.Suicide_rate, s.Country_year, s.HDI_year, s.GDP_year, s.GDP_capita, s.Generation FROM countries c, happiness_index_15 h, suicide_rates_15 s WHERE c.Name = h.Country AND c.Name = s.Country GROUP BY c.Name', function (error, results, fields) {
        if (error) throw error;

        if (req.headers['content-type'] == "application/json"){
            return res.send({Countries: results})
        } else if (req.headers['content-type'] == "application/xml"){
            var xmlString = '<Countries>\n';
            for (var i = 0; i < results.length; i++){
                xmlString += "<Country>\n";
                Object.keys(results[i]).forEach(function(key) {
                    var value = results[i][key];
                        xmlString += "<" + key + ">" + value + "</" + key + ">\n";
                });
                xmlString += "</Country>\n";
            }
            xmlString += "</Countries>";
            return res.send(xmlString);
        }
    });
});

//  Retrieve all countries that are male, 15 and millenial JSON
app.get('/countries_male', function (req, res) {
    dbconnection.query('SELECT c.Name, c.Region, c.Population, c.Area, c.Population_Density, c.Coastline, c.Net_Migration, c.Infant_Mortality, c.GDP, c.Literacy, c.Phones, c.Arable, c.Crops, c.Other, c.Climate, c.Birthrate, c.Deathrate, c.Agriculture, c.Industry, c.Service, h.Score, h.Support, h.Freedom, h.Generosity, h.Corruption, s.Year, s.Sex, s.Age, s.Suicide_no, s.Population_PerYear, s.Suicide_rate, s.Country_year, s.HDI_year, s.GDP_year, s.GDP_capita, s.Generation FROM countries c, happiness_index_15 h, suicide_rates_15 s WHERE c.Name = h.Country AND c.Name = s.Country AND s.Generation = "Millenials" AND s.Age = 15 and s.Sex = "male"', function (error, results, fields) {
        if (error) throw error;

        if (req.headers['content-type'] == "application/json"){
            return res.send({Countries: results})
        } else if (req.headers['content-type'] == "application/xml"){
            var xmlString = '<Countries>\n';
            for (var i = 0; i < results.length; i++){
                xmlString += "<Country>\n";
                Object.keys(results[i]).forEach(function(key) {
                    var value = results[i][key];
                        xmlString += "<" + key + ">" + value + "</" + key + ">\n";
                });
                xmlString += "</Country>\n";
            }
            xmlString += "</Countries>";
            return res.send(xmlString);
        }
    });
});

//  Retrieve all countries that are female, 15 and millenial JSON
app.get('/countries_female', function (req, res) {
    dbconnection.query('SELECT c.Name, c.Region, c.Population, c.Area, c.Population_Density, c.Coastline, c.Net_Migration, c.Infant_Mortality, c.GDP, c.Literacy, c.Phones, c.Arable, c.Crops, c.Other, c.Climate, c.Birthrate, c.Deathrate, c.Agriculture, c.Industry, c.Service, h.Score, h.Support, h.Freedom, h.Generosity, h.Corruption, s.Year, s.Sex, s.Age, s.Suicide_no, s.Population_PerYear, s.Suicide_rate, s.Country_year, s.HDI_year, s.GDP_year, s.GDP_capita, s.Generation FROM countries c, happiness_index_15 h, suicide_rates_15 s WHERE c.Name = h.Country AND c.Name = s.Country AND s.Generation = "Millenials" AND s.Age = 15 and s.Sex = "female"', function (error, results, fields) {
        if (error) throw error;

        if (req.headers['content-type'] == "application/json"){
            return res.send({Countries: results})
        } else if (req.headers['content-type'] == "application/xml"){
            var xmlString = '<Countries>\n';
            for (var i = 0; i < results.length; i++){
                xmlString += "<Country>\n";
                Object.keys(results[i]).forEach(function(key) {
                    var value = results[i][key];
                        xmlString += "<" + key + ">" + value + "</" + key + ">\n";
                });
                xmlString += "</Country>\n";
            }
            xmlString += "</Countries>";
            return res.send(xmlString);
        }
    });
});

//  Retrieve Country with Country name JSON
app.get('/country/:name', function (req, res) {

    let data = req.params.name;

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide a country name'});
    }

    dbconnection.query('SELECT c.Name, c.Region, c.Population, c.Area, c.Population_Density, c.Coastline, c.Net_Migration, c.Infant_Mortality, c.GDP, c.Literacy, c.Phones, c.Arable, c.Crops, c.Other, c.Climate, c.Birthrate, c.Deathrate, c.Agriculture, c.Industry, c.Service, h.Score, h.Support, h.Freedom, h.Generosity, h.Corruption, s.Year, s.Sex, s.Age, s.Suicide_no, s.Population_PerYear, s.Suicide_rate, s.Country_year, s.HDI_year, s.GDP_year, s.GDP_capita, s.Generation FROM countries c, happiness_index_15 h, suicide_rates_15 s WHERE c.Name = h.Country AND c.Name = s.Country AND s.Generation = "Millenials" AND s.Age = 15 AND c.Name = "' + req.params.name + '"', data, function (error, results, fields) {
        if (error) throw error;

        if (req.headers['content-type'] == "application/json"){
            return res.send({Countries: results})
        } else if (req.headers['content-type'] == "application/xml"){
            var xmlString = '<Countries>\n';
            for (var i = 0; i < results.length; i++){
                xmlString += "<Country>\n";
                Object.keys(results[i]).forEach(function(key) {
                    var value = results[i][key];
                        xmlString += "<" + key + ">" + value + "</" + key + ">\n";
                });
                xmlString += "</Country>\n";
            }
            xmlString += "</Countries>";
            return res.send(xmlString);
        }
    });
});

module.exports = app;