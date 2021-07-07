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


//initialize port number
const port = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI;

app.use(express.static('public/static/js'))

// connection with the database

require('./db')()

// Mongoose Schema

const Comment = require('./models/comments')
const YourSpace = require('./models/YourSpace')

// Setting Up express To allow JSON based data on routes

app.use(express.json())

// Routes 

// to save comments

app.get('/comment', (req,res) => {
    res.render('letshelpeachother');
});

app.get('/YourSpace', (req,res) => {
    res.render('YourSpace');
});

app.get('/hospitals', (req,res) => {
    res.render('hospital');
});

app.post('/api/comments', (req, res) => {
    const comment = new Comment({
        username: req.body.username,
        comment: req.body.comment
    })
    comment.save().then(response => {
        res.send(response)
    })

});

// to retrive comments

app.get('/api/comments', (req, res) => {
    Comment.find().then(function(comments) {
        res.send(comments)
    })
});

// YourSpace

app.post('/api/YourSpace', (req, res) => {
    const comment = new Comment({
        username: req.body.username,
        comment: req.body.comment
    })
    comment.save().then(response => {
        res.send(response)
    })

});

// to retrive comments

app.get('/api/YourSpace', (req, res) => {
    Comment.find().then(function(comments) {
        res.send(comments)
    })
});

// REST URL : https://covid-19.dataflowkit.com
// https://covid-19.dataflowkit.com/v1/India

app.use(bodyParser());  //body-parser is used in order to access to the post data

const partialspath = path.join(__dirname, "/public/partials");
const staticPath = path.join(__dirname, "/public");

hbs.registerPartials(partialspath);

//builtin middleware
app.use(express.static(staticPath));
//app.use(express.static("./public/static/css/"));

// app.get('/', (req,res) => {
//     res.render('index');
// });

app.get('/guidelines', (req,res) => {
    res.render('guidelines');
});

app.get('/commentbox', (req,res) => {
    res.render('commentbox');
});

app.get('/aboutcovid', (req,res) => {
    res.render('aboutcovid');
});

app.get('/content', (req,res) => {
    res.render('content');
});

app.get('/tile', (req,res) => {
    res.render('tile');
});

app.get('/new', (req,res) => {
    res.render('new');
});

app.get('/helpsection', (req,res) => {
    res.render('helpsection');
});

app.get('/space', (req,res) => {
    res.render('space');
});


app.get('/vaccine', (req,res) => {
    res.render('vaccine');
});

app.get('/fungus', (req,res) => {
    res.render('fungus');
});
app.get('/mentalhelporg', (req,res) => {
    res.render('mentalhelporg');
});
app.get('/org', (req,res) => {
    res.render('org');
});
app.get('/postcovid', (req,res) => {
    res.render('postcovid');
});

app.get('/', async(req,res) => {
    var result1 = await api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/world');
    console.log(result1);
    var result2 = await api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/India');
    console.log(result2);
    var result3 = await api_helper.make_API_call('https://corona.lmao.ninja/v2/all?yesterday');
    res.render('index' , {WorldActive : result3["active"], WorldLastUpdate: result1['Last Update'], WorldNewCases: result1['New Cases_text'], WorldTotalCases: result1['Total Cases_text'], WorldTotalDeaths: result1['Total Deaths_text'], WorldRecoveredCases: result1['Total Recovered_text'],
    IndiaActive : result2["Active Cases_text"], IndiaLastUpdate: result2['Last Update'], IndiaNewCases: result2['New Cases_text'], IndiaTotalCases: result2['Total Cases_text'], IndiaTotalDeaths: result2['Total Deaths_text'], IndiaRecoveredCases: result2['Total Recovered_text']    })
})

app.get('/home', async(req, res) => {
        var result1 = await api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/world');
        console.log(result1);
        var result2 = await api_helper.make_API_call('https://covid-19.dataflowkit.com/v1/India');
        console.log(result2)
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
     fs.readFile('/recordData.json', 'utf8', function (err, data){
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


 const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });

  let io = require('socket.io')(server);

  io.on('connection', (socket) => {
     
      // this function will be fired whenever a socket (browser tab) gets connected.
      
      // we are receiving a object named 'socket' which is an instance of connected client
      
      socket.on('comment', (data) => {
           
           // this will be fired whenever a 'comment' event gets fired.
           
           // getting current timestamp
           
           data.time = Date()
           
           // sending back an event to all other clients named 'comment', which we are already listening in client side
           
           socket.broadcast.emit('comment', data)
       
       })
      
});
