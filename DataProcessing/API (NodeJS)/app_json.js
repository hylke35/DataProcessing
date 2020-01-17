const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


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
        return res.send({data: results});
    });
});

// Retrieve all countries grouped by country
app.get('/countries_groupby', function (req, res) {
    dbConn.query('SELECT c.Country, c.Region, c.Population, c.Area, c.Population_Density, c.Coastline, c.Net_Migration, c.Infant_Mortality, c.GDP, c.Literacy, c.Phones, c.Arable, c.Crops, c.Other, c.Climate, c.Birthrate, c.Deathrate, c.Agriculture, c.Industry, c.Service, h.Score, h.Support, h.Freedom, h.Generosity, h.Corruption, s.Year, s.Sex, s.Age, s.Suicide_no, s.Population_PerYear, s.Suicide_rate, s.Country_year, s.HDI_year, s.GDP_year, s.GDP_capita, s.Generation FROM countries c, happiness_index_15 h, suicide_rates_15 s WHERE c.Country = h.Country AND c.Country = s.Country GROUP BY c.Country', function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });
});

// Retrieve all countries that are male, 15 and millenial
app.get('/countries_male', function (req, res) {
    dbConn.query('SELECT c.Country, c.Region, c.Population, c.Area, c.Population_Density, c.Coastline, c.Net_Migration, c.Infant_Mortality, c.GDP, c.Literacy, c.Phones, c.Arable, c.Crops, c.Other, c.Climate, c.Birthrate, c.Deathrate, c.Agriculture, c.Industry, c.Service, h.Score, h.Support, h.Freedom, h.Generosity, h.Corruption, s.Year, s.Sex, s.Age, s.Suicide_no, s.Population_PerYear, s.Suicide_rate, s.Country_year, s.HDI_year, s.GDP_year, s.GDP_capita, s.Generation FROM countries c, happiness_index_15 h, suicide_rates_15 s WHERE c.Country = h.Country AND c.Country = s.Country AND s.Generation = "Millenials" AND s.Age = 15 and s.Sex = "male"', function (error, results, fields) {
    if (error) throw error;
        return res.send({data: results});
    });
});

// Retrieve all countries that are female, 15 and millenial
app.get('/countries_female', function (req, res) {
    dbConn.query('SELECT c.Country, c.Region, c.Population, c.Area, c.Population_Density, c.Coastline, c.Net_Migration, c.Infant_Mortality, c.GDP, c.Literacy, c.Phones, c.Arable, c.Crops, c.Other, c.Climate, c.Birthrate, c.Deathrate, c.Agriculture, c.Industry, c.Service, h.Score, h.Support, h.Freedom, h.Generosity, h.Corruption, s.Year, s.Sex, s.Age, s.Suicide_no, s.Population_PerYear, s.Suicide_rate, s.Country_year, s.HDI_year, s.GDP_year, s.GDP_capita, s.Generation FROM countries c, happiness_index_15 h, suicide_rates_15 s WHERE c.Country = h.Country AND c.Country = s.Country AND s.Generation = "Millenials" AND s.Age = 15 and s.Sex = "female"', function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
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
        return res.send({data: results[0]});
    });

});

// Add a new entry into the countries table
app.post('/countries_insert', function (req, res) {
    let data = {
        Country: req.body.Country,
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

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbConn.query("INSERT INTO countries SET ?", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });
});

// Add a new entry into the happiness_index_15 table
app.post('/happiness_insert', function (req, res) {
    let data = {
        Rank: req.body.Rank,
        Country: req.body.Country,
        Score: req.body.Score,
        Support: req.body.Support,
        Freedom: req.body.Freedom,
        Generosity: req.body.Generosity,
        Corruption: req.body.Corruption
    };

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbConn.query("INSERT INTO happiness_index_15 SET ?", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });
});

// Add a new entry into the suicide_rates_15 table
app.post('/suicide_insert', function (req, res) {
    let data = {
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

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbConn.query( "INSERT INTO suicide_rates_15 VALUES ?", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });
});


//  Update country in countries table
app.put('/countries_update/:country', function (req, res) {

    let data = {
        Country: req.body.Country,
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

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbConn.query("UPDATE countries SET ? WHERE Country= '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });
});

//  Update country in happiness_index_15 table
app.put('/happiness_update/:country', function (req, res) {

    let data = {
        Rank: req.body.Rank,
        Country: req.body.Country,
        Score: req.body.Score,
        Support: req.body.Support,
        Freedom: req.body.Freedom,
        Generosity: req.body.Generosity,
        Corruption: req.body.Corruption
    };

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbConn.query("UPDATE happiness_index_15 SET ? WHERE Country = '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });
});

//  Update country in suicide_index_15 table
app.put('/suicide_update/:country', function (req, res) {

    let data = {
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

    if (!data) {
        return res.status(400).send({ error: true, message: 'please provide all required fields'});
    }

    dbConn.query("UPDATE suicide_index_15 SET SET ? WHERE Country = '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });
});


//  Delete country for countries table
app.delete('/countries_delete/:country', function (req, res) {

    let data = req.body.Country;

    dbConn.query("DELETE FROM countries WHERE Country= '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });
});

//  Delete country for happiness_index_15 table
app.delete('/happiness_delete/:country', function (req, res) {

    let data = req.body.data.country;

    dbConn.query("DELETE FROM happiness_index_15  WHERE Country= '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });
});

//  Delete country for suicide_rates_15 table
app.delete('/suicide_delete/:country', function (req, res) {

    let data = req.body.Country;
    
    dbConn.query("DELETE FROM suicide_rates_15  WHERE Country= '" + req.params.country + "'", data, function (error, results, fields) {
        if (error) throw error;
        return res.send({data: results});
    });
});

// set port
app.listen(3000, function () {
    console.log('node app is running on port 3000');
});

module.exports = app;