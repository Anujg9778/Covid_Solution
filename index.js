var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api_helper = require('./API_helper');
const { fileURLToPath } = require('url');
const hbs = require('hbs')
const fs = require('fs');
const nodemailer = require('nodemailer')
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

app.get('/', async(req,res) => {
    var result1 = await api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/world');
    console.log(result1);
    var result2 = await api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/India');
    console.log(result2);
    res.render('index' , {WorldActive : result1["Active Cases_text"], WorldLastUpdate: result1['Last Update'], WorldNewCases: result1['New Cases_text'], WorldTotalCases: result1['Total Cases_text'], WorldTotalDeaths: result1['Total Deaths_text'], WorldRecoveredCases: result1['Total Recovered_text'],
    IndiaActive : result2["Active Cases_text"], IndiaLastUpdate: result2['Last Update'], IndiaNewCases: result2['New Cases_text'], IndiaTotalCases: result2['Total Cases_text'], IndiaTotalDeaths: result2['Total Deaths_text'], IndiaRecoveredCases: result2['Total Recovered_text']    })
});

app.get('/aboutcovid#status', async(req,res) => {
    var result1 = await api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/world');
    console.log(result1);
    var result2 = await api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/India');
    console.log(result2);
    res.render('index' , {WorldActive : result1["Active Cases_text"], WorldLastUpdate: result1['Last Update'], WorldNewCases: result1['New Cases_text'], WorldTotalCases: result1['Total Cases_text'], WorldTotalDeaths: result1['Total Deaths_text'], WorldRecoveredCases: result1['Total Recovered_text'],
    IndiaActive : result2["Active Cases_text"], IndiaLastUpdate: result2['Last Update'], IndiaNewCases: result2['New Cases_text'], IndiaTotalCases: result2['Total Cases_text'], IndiaTotalDeaths: result2['Total Deaths_text'], IndiaRecoveredCases: result2['Total Recovered_text']    })
});
app.get('/guidelines/#status', async(req,res) => {
    var result1 = await api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/world');
    console.log(result1);
    var result2 = await api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/India');
    console.log(result2);
    res.render('index' , {WorldActive : result1["Active Cases_text"], WorldLastUpdate: result1['Last Update'], WorldNewCases: result1['New Cases_text'], WorldTotalCases: result1['Total Cases_text'], WorldTotalDeaths: result1['Total Deaths_text'], WorldRecoveredCases: result1['Total Recovered_text'],
    IndiaActive : result2["Active Cases_text"], IndiaLastUpdate: result2['Last Update'], IndiaNewCases: result2['New Cases_text'], IndiaTotalCases: result2['Total Cases_text'], IndiaTotalDeaths: result2['Total Deaths_text'], IndiaRecoveredCases: result2['Total Recovered_text']    })
});

app.get('/guidelines', (req,res) => {
    res.render('guidelines');
});

app.get('/aboutcovid', (req,res) => {
    res.render('about');
});

app.get('/guidelines', (req,res) => {
    res.render('guidelines');
});

app.get('/home', async(req, res) => {
        var result1 = await api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/world');
        console.log(result1);
        var result2 = await api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/India');
        console.log(result2);
      
        
        res.render('index' , {WorldActive : result1["Active Cases_text"], WorldLastUpdate: result1['Last Update'], WorldNewCases: result1['New Cases_text'], WorldTotalCases: result1['Total Cases_text'], WorldTotalDeaths: result1['Total Deaths_text'], WorldRecoveredCases: result1['Total Recovered_text'],
        IndiaActive : result2["Active Cases_text"], IndiaLastUpdate: result2['Last Update'], IndiaNewCases: result2['New Cases_text'], IndiaTotalCases: result2['Total Cases_text'], IndiaTotalDeaths: result2['Total Deaths_text'], IndiaRecoveredCases: result2['Total Recovered_text']    })
})


//post request after completion
app.post('/subscribe', (req,res) => {

    const transporter = nodemailer.createTransport({
        host : 'smtp.gmail.com',
        port:465,
        service: 'gmail',
        secure: true,
        auth:{
            user: 'anmolgupta20715@gmail.com', //user mail who handle the server
            pass:'Anmolg@1411'
        }
    });

    const mail = req.body.email;  //mail of person who register
    const mailOptions = {
        from:'anmolgupta20715@gmail.com',
        to: mail,
        subject:'Confirmation message',
        text: 'You have successfully register',
    };
    transporter.sendMail(mailOptions, function(err,info){
        if(err){
            console.log(err);
        }
        else{
            console.log('Email Sent :'+ info.response);
        }
    });
    var file = []
    var trigger = false
     fs.readFile('\recordData.json', 'utf8', function (err, data){
        if (err) {
            console.log(err)
        } else {
            console.log('data', req.body)

            if(data.length == 0)
                {
                    file = [];
                }
                else
                {
                    file = JSON.parse(data);
                    for(var i =0;i<file.length;i++)
                    {
                        if(req.body.email == file[i].email)
                        {
                            console.log('Same Email');
                            trigger = true
                        }
                    }
                }

            if(trigger == false)
            {
                console.log('Data Inserted Successfully !!')
                            file.push(req.body);
            }
            const json = JSON.stringify(file);
            fs.writeFile('/recordData.json', json, 'utf8', function(err){
                 if(err){
                       console.log(err);
                 } else {
                       console.log("Everything went OK");
                 }});
        }
     });
     console.log(req.body);
     res.end(JSON.stringify(req.body));
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });