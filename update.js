const express = require('express');
const app = express();
var xmlparser = require('express-xml-bodyparser');
const mysql = require('mysql');
var dbconnection = require('./DBConnection.js');
var builder = require('xmlbuilder');

app.use(xmlparser());

//  Update country in countries table
app.put('/countries_update/:name', function (req, res) {

    let data = {};

    if (req.headers['content-type'] == "application/json"){
        data = {
            Name: req.body.Name,
            Region: req.body.Region,
            Population: req.body.Population,
            Area: req.body.Area,
            Population_Density: req.body.Population_Density,
            Coastline: req.body.Coastline,
            Net_Migration: req.body.Net_Migration,
            Infant_Mortality: req.body.Infant_Mortality,
            GDP: req.body.GDP,
            Literacy: req.body.Literacy,
            Phones: req.body.Phones,
            Arable: req.body.Arable,
            Crops: req.body.Crops,
            Other: req.body.Other,
            Climate: req.body.Climate,
            Birthrate: req.body.Birthrate,
            Deathrate: req.body.Deathrate,
            Agriculture: req.body.Agriculture,
            Industry: req.body.Industry,
            Service: req.body.Service
        };
    }else if (req.headers['content-type'] == "application/xml"){
        data = {
            Name: req.body.data.name,
            Region: req.body.data.region,
            Population: req.body.data.population,
            Area: req.body.data.area,
            Population_Density: req.body.data.population_density,
            Coastline: req.body.data.coastline,
            Net_Migration: req.body.data.net_migration,
            Infant_Mortality: req.body.data.infant_mortality,
            GDP: req.body.data.gdp,
            Literacy: req.body.data.literacy,
            Phones: req.body.data.phones,
            Arable: req.body.data.arable,
            Crops: req.body.data.crops,
            Other: req.body.data.other,
            Climate: req.body.data.climate,
            Birthrate: req.body.data.birthrate,
            Deathrate: req.body.data.deathrate,
            Agriculture: req.body.data.agriculture,
            Industry: req.body.data.industry,
            Service: req.body.data.service
        };
    }

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbconnection.query("UPDATE countries SET ? WHERE Name= '" + req.params.name + "'", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });

});

//  Update country in happiness_index_15 table
app.put('/happiness_update/:country', function (req, res) {

    let data = {};

    if (req.header['content-type'] == "application/json"){
        data = {
            Rank: req.body.Rank,
            Country: req.body.Country,
            Score: req.body.Score,
            Support: req.body.Support,
            Freedom: req.body.Freedom,
            Generosity: req.body.Generosity,
            Corruption: req.body.Corruption
        };
    }else if (req.header['content-type'] == "application/xml"){
        data = {
            Rank: req.body.data.rank,
            Country: req.body.data.country,
            Score: req.body.data.score,
            Support: req.body.data.support,
            Freedom: req.body.data.freedom,
            Generosity: req.body.data.generosity,
            Corruption: req.body.data.corruption
        };
    }

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbconnection.query("UPDATE happiness_index_15 SET ? WHERE Country= '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });

});

//  Update country in suicide_index_15 table
app.put('/suicide_update/:country', function (req, res) {

    let data = {};

    if (req.header['content-type'] == "application/json"){
        data = {
            Country: req.body.Country,
            Year: req.body.Year,
            Sex: req.body.Sex,
            Age: req.body.Age,
            Suicide_no: req.body.Suicide_no,
            Population_PerYear: req.body.Population_PerYear,
            Suicide_rate: req.body.Suicide_rate,
            Country_year: req.body.Country_year,
            HDI_year: req.body.HDI_year,
            GDP_year: req.body.GDP_year,
            GDP_capita: req.body.GDP_capita,
            Generation: req.body.Generation
        };
    }else if (req.header['content-type'] == "application/xml"){
        data = {
            Country: req.body.data.country,
            Year: req.body.data.year,
            Sex: req.body.data.sex,
            Age: req.body.data.age,
            Suicide_no: req.body.data.suicide_no,
            Population_PerYear: req.body.data.population_peryear,
            Suicide_rate: req.body.data.suicide_rate,
            Country_year: req.body.data.country_year,
            HDI_year: req.body.data.hdi_year,
            GDP_year: req.body.data.gdp_year,
            GDP_capita: req.body.data.gdp_capita,
            Generation: req.body.data.generation
        };
    }

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbconnection.query("UPDATE suicide_index_15 SET ? WHERE Country= '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });

});

module.exports = app;