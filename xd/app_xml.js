const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
var js2xmlparser = require("js2xmlparser");
var xmlparser = require('express-xml-bodyparser');
app.use(xmlparser());


// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'world'
});

// connect to database
dbConn.connect();


// Retrieve all countries
app.get('/countries', function (req, res) {
    dbConn.query('SELECT c.Country, c.Region, c.Population, c.Area, c.Population_Density, c.Coastline, c.Net_Migration, c.Infant_Mortality, c.GDP, c.Literacy, c.Phones, c.Arable, c.Crops, c.Other, c.Climate, c.Birthrate, c.Deathrate, c.Agriculture, c.Industry, c.Service, h.Score, h.Support, h.Freedom, h.Generosity, h.Corruption, s.Year, s.Sex, s.Age, s.Suicide_no, s.Population_PerYear, s.Suicide_rate, s.Country_year, s.HDI_year, s.GDP_year, s.GDP_capita, s.Generation FROM countries c, happiness_index_15 h, suicide_rates_15 s WHERE c.Country = h.Country AND c.Country = s.Country', function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("countries", results);
        results = results.replace("<countries>", "<countriess>");
        results = results.replace(/.{10}$/, "countriess>")
        return res.send(results);
    });
});

// Retrieve all countries grouped by country
app.get('/countries_groupby', function (req, res) {
    dbConn.query('SELECT c.Country, c.Region, c.Population, c.Area, c.Population_Density, c.Coastline, c.Net_Migration, c.Infant_Mortality, c.GDP, c.Literacy, c.Phones, c.Arable, c.Crops, c.Other, c.Climate, c.Birthrate, c.Deathrate, c.Agriculture, c.Industry, c.Service, h.Score, h.Support, h.Freedom, h.Generosity, h.Corruption, s.Year, s.Sex, s.Age, s.Suicide_no, s.Population_PerYear, s.Suicide_rate, s.Country_year, s.HDI_year, s.GDP_year, s.GDP_capita, s.Generation FROM countries c, happiness_index_15 h, suicide_rates_15 s WHERE c.Country = h.Country AND c.Country = s.Country GROUP BY c.Country', function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("countries", results);
        results = results.replace("<countries>", "<countriess>");
        results = results.replace(/.{10}$/, "countriess>")
        return res.send(results);
    });
});


// Retrieve all countries that are male, 15 and millenial
app.get('/countries_male', function (req, res) {
    dbConn.query('SELECT c.Country, c.Region, c.Population, c.Area, c.Population_Density, c.Coastline, c.Net_Migration, c.Infant_Mortality, c.GDP, c.Literacy, c.Phones, c.Arable, c.Crops, c.Other, c.Climate, c.Birthrate, c.Deathrate, c.Agriculture, c.Industry, c.Service, h.Score, h.Support, h.Freedom, h.Generosity, h.Corruption, s.Year, s.Sex, s.Age, s.Suicide_no, s.Population_PerYear, s.Suicide_rate, s.Country_year, s.HDI_year, s.GDP_year, s.GDP_capita, s.Generation FROM countries c, happiness_index_15 h, suicide_rates_15 s WHERE c.Country = h.Country AND c.Country = s.Country AND s.Generation = "Millenials" AND s.Age = 15 AND s.Sex = "male"', function (error, results, fields) {
    if (error) throw error;
        results = js2xmlparser.parse("countries", results);
        results = results.replace("<countries>", "<countriess>");
        results = results.replace(/.{10}$/, "countriess>")
        return res.send(results);
    });
});

// Retrieve all countries that are male, 15 and millenial
app.get('/countries_female', function (req, res) {
    dbConn.query('SELECT c.Country, c.Region, c.Population, c.Area, c.Population_Density, c.Coastline, c.Net_Migration, c.Infant_Mortality, c.GDP, c.Literacy, c.Phones, c.Arable, c.Crops, c.Other, c.Climate, c.Birthrate, c.Deathrate, c.Agriculture, c.Industry, c.Service, h.Score, h.Support, h.Freedom, h.Generosity, h.Corruption, s.Year, s.Sex, s.Age, s.Suicide_no, s.Population_PerYear, s.Suicide_rate, s.Country_year, s.HDI_year, s.GDP_year, s.GDP_capita, s.Generation FROM countries c, happiness_index_15 h, suicide_rates_15 s WHERE c.Country = h.Country AND c.Country = s.Country AND s.Generation = "Millenials" AND s.Age = 15 AND s.Sex = "female"', function (error, results, fields) {
        if (error) throw error;
            results = js2xmlparser.parse("countries", results);
            results = results.replace("<countries>", "<countriess>");
            results = results.replace(/.{10}$/, "countriess>")
            return res.send(results);
    });
});



// Retrieve country with country name
app.get('/country/:country', function (req, res) {

    let data = req.params.country;

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide country name'});
    }

    dbConn.query("SELECT c.Country, c.Region, c.Population, c.Area, c.Population_Density, c.Coastline, c.Net_Migration, c.Infant_Mortality, c.GDP, c.Literacy, c.Phones, c.Arable, c.Crops, c.Other, c.Climate, c.Birthrate, c.Deathrate, c.Agriculture, c.Industry, c.Service, h.Score, h.Support, h.Freedom, h.Generosity, h.Corruption, s.Year, s.Sex, s.Age, s.Suicide_no, s.Population_PerYear, s.Suicide_rate, s.Country_year, s.HDI_year, s.GDP_year, s.GDP_capita, s.Generation FROM countries c, happiness_index_15 h, suicide_rates_15 s WHERE c.Country = h.Country AND c.Country = s.Country AND s.Generation = 'Millenials' AND s.Age = 15 AND c.Country = '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("countries", results);
        return res.send(results);
    });

});

// Add a new entry into the countries table
app.post('/countries_insert', function (req, res) {
    let data = {
        Country: req.body.data.country,
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

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbConn.query("INSERT INTO countries SET ?", data, function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("countries", results);
        return res.send(results);
    });
});

// Add a new entry into the happiness_index_15 table
app.post('/happiness_insert', function (req, res) {
    let data = {
        Rank: req.body.data.rank,
        Country: req.body.data.country,
        Score: req.body.data.score,
        Support: req.body.data.support,
        Freedom: req.body.data.freedom,
        Generosity: req.body.data.generosity,
        Corruption: req.body.data.corruption
    };

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbConn.query("INSERT INTO happiness_index_15 SET ?", data, function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("countries", results);
        return res.send(results);
    });
});

// Add a new entry into the suicide_rates_15 table
app.post('/suicide_insert', function (req, res) {
    let data = {
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

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbConn.query( "INSERT INTO suicide_rates_15 SET ?", data, function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("countries", results);
        return res.send(results);
    });
});


//  Update country in countries table
app.put('/countries_update/:country', function (req, res) {

    let data = {
        Country: req.body.data.country,
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

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbConn.query("UPDATE countries SET ? WHERE Country= '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("countries", results);
        return res.send(results);
    });
});

//  Update country in happiness_index_15 table
app.put('/happiness_update/:country', function (req, res) {

    let data = {
        Rank: req.body.data.rank,
        Country: req.body.data.country,
        Score: req.body.data.score,
        Support: req.body.data.support,
        Freedom: req.body.data.freedom,
        Generosity: req.body.data.generosity,
        Corruption: req.body.data.corruption
    };

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbConn.query("UPDATE happiness_index_15 SET ? WHERE Country = '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("countries", results);
        return res.send(results);
    });
});

//  Update country in suicide_index_15 table
app.put('/suicide_update/:country', function (req, res) {

    let data = {
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

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbConn.query("UPDATE suicide_index_15 SET SET ? WHERE Country = '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("countries", results);
        return res.send(results);
    });
});


//  Delete country for countries table
app.delete('/countries_delete/:country', function (req, res) {

    let data = req.body.data.country;

    dbConn.query("DELETE FROM countries WHERE Country= '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("countries", results);
        return res.send(results);
    });
});

//  Delete country for happiness_index_15 table
app.delete('/happiness_delete/:country', function (req, res) {

    let data = req.body.data.country;

    dbConn.query("DELETE FROM happiness_index_15  WHERE Country= '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("countries", results);
        return res.send(results);
    });
});

//  Delete country for suicide_rates_15 table
app.delete('/suicide_delete/:country', function (req, res) {

    let data = req.body.data.country;

    dbConn.query("DELETE FROM suicide_rates_15  WHERE Country= '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("countries", results);
        return res.send(results);
    });
});

// set port
app.listen(3000, function () {
    console.log('node app is running on port 3000');
});

module.exports = app;