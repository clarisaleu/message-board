console.log("test");
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;
//const url = 'mongodb://user:userpwd1@ds125058.mlab.com:25058/heroku_lm6jlxkb';
var url = process.env.MONGOLAB_URI;

var db;
MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err)
  db = client.db('messages') 
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('Saved to database!')
    res.redirect('/')
  })
})


