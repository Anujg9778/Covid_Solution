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

app.get('/guidelines.hbs', (req,res) => {
    res.render('guidelines');
});

app.get('/about.hbs', (req,res) => {
    res.render('about');
});
app.get('/getAPIResponse', (req, res) => {
    api_helper.make_API_call('https://corona.lmao.ninja/v2/all?yesterday=')
    .then(response => {
        let x1 = response.cases;
        let x2 = response.deaths;
        let x3 = response.active;
        let x4 = response.recovered;
        let x5 = response.tests;
        console.log(response);
        res.render('index' , {d1:x1, d2:x2, d3:x3, d4:x4, d5:x5})

    })
    .catch(error => {
        console.log('Error')
    })
})

app.get('/getAPIResponse1', (req, res) => {
    api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/India')
    .then(response => {
        let  x11 = response.Last_Update
        console.log(response);
        res.render('index' ,{d11:x11});
    })
    .catch(error => {
        console.log('Error')
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });