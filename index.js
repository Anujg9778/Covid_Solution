var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api_helper = require('./API_helper');
const { fileURLToPath } = require('url');
const hbs = require('hbs')
const fs = require('fs');
var app = express();
app.set('view engine', 'hbs')
app.set('views', "./public/view/")


// REST URL : https://covid-19.dataflowkit.com
// https://covid-19.dataflowkit.com/v1/India

app.use(bodyParser());  //body-parser is used in order to access to the post data

//initialize port number
const PORT = process.env.PORT || 3000;

const partialspath = path.join(__dirname, "/public/partials");
const staticPath = path.join(__dirname, "/public");

hbs.registerPartials(partialspath);

//builtin middleware
app.use(express.static(staticPath));
//app.use(express.static("./public/static/css/"));

app.get('/', (req,res) => {
    res.render('index');
});

// app.get('/home', (req,res) => {
//     res.render('index');
// });

app.get('/guidelines', (req,res) => {
    res.render('guidelines');
});

app.get('/about', (req,res) => {
    res.render('about');
});
app.get('/home', async(req, res) => {
        var result1 = await api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/world');
        console.log(result1);
        var result2 = await api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/India');
        console.log(result2);
      
        
        res.render('index' , {WorldActive : result1["Active Cases_text"], WorldLastUpdate: result1['Last Update'], WorldNewCases: result1['New Cases_text'], WorldTotalCases: result1['Total Cases_text'], WorldTotalDeaths: result1['Total Deaths_text'], WorldRecoveredCases: result1['Total Recovered_text'],
        IndiaActive : result2["Active Cases_text"], IndiaLastUpdate: result2['Last Update'], IndiaNewCases: result2['New Cases_text'], IndiaTotalCases: result2['Total Cases_text'], IndiaTotalDeaths: result2['Total Deaths_text'], IndiaRecoveredCases: result2['Total Recovered_text']    })
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });