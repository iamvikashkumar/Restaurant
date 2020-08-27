const express = require('express');
const bodyParser= require('body-parser')
const app = express();

const MongoClient = require('mongodb').MongoClient
const mongoURL = 'mongodb://localhost:27017/';

MongoClient.connect(mongoURL, { useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('restaurant')
        const collection = db.collection('dishes')
    
        app.set('view engine', 'ejs');

        app.use(bodyParser.urlencoded({ extended: true }))

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/app/index.html');
        });

        app.get('/data', function(req, res){
            console.log("Will return All entire collection");
            collection.find().toArray(function(err, docs){                
                res.json(docs);
            });
        });

        app.use(express.static(__dirname + '/app'));

        app.post('/saveData', (req, res) => {
            console.log(req.body);
            var data ={};
            data.name = req.body.name;
            data.category = req.body.category === "0" ? "Starter" : req.body.category === "1" ? "Breakfast" : 
                        req.body.category === "2" ? "Salads" : req.body.category === "3" ? "Meal" : "Beverage";
            data.type = req.body.type === "0" ? "Veg" : "Non-Veg";
            data.time_to_serve = req.body.time_to_serve === "0" ? "10 Mins" : req.body.time_to_serve === "1" ? "20 Mins" :
                                 req.body.time_to_serve === "2" ? "30 Mins" : req.body.time_to_serve === "3" ? "45 Mins" : 
                                 req.body.time_to_serve === "4" ? "60 Mins" : "90 Mins";
            data.price = req.body.price;
            data.image = req.body.image;
            collection.insertOne(data)
            .then(result => {
            console.log(result);
            res.redirect('/');
            })
            .catch(error => console.error(error))
        })

        app.listen(3000, function() {
            console.log('listening on 3000')
        }); 
    })
    .catch(error => console.error(error));


