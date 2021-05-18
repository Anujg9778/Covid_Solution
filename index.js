var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());  //body-parser is used in order to access to the post data

//initialize port number
const PORT = process.env.PORT || 3000;


const staticPath = path.join(__dirname, "./");

//builtin middleware
app.use(express.static(staticPath));
app.get('/', (req,res) => {
    res.render('index', { root: path.join(__dirname, './')});
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });