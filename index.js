var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api_helper = require('./API_helper');
const { fileURLToPath } = require('url');
const hsb = require('hbs')
const fs = require('fs');
var app = express();
app.set('view engine', 'hbs')
app.set('views', "./public/view/")

// REST URL : https://covid-19.dataflowkit.com

app.use(bodyParser());  //body-parser is used in order to access to the post data

//initialize port number
const PORT = process.env.PORT || 3000;


const staticPath = path.join(__dirname, "/public");

//builtin middleware
app.use(express.static(staticPath));
//app.use(express.static("./public/static/css/"));

app.get('/', (req,res) => {
    res.render('index');
});

app.get('/getAPIResponse', (req, res) => {
    api_helper.make_API_call('https://corona.lmao.ninja/v2/all?yesterday=')
    .then(response => {
        res.render('index', {data : JSON.stringify(response)})
        console.log(response);

    })
    .catch(error => {
        console.log('Error')
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });