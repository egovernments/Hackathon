
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./db');

router.use(express.static(__dirname + '/public'));

router.get('/', function(req, res) {
    res.render('database');
});


router.post('/:user', function(req,res){
    var query = {};
    var text = '';
    query.text = req.body.query;
    query.values = [];
    fields=[]
    db.query(query.text, query.values, function (err, data) {
        if (err) {
            console.error('error', err);
            var message = 'Your query is incorrect';
            res.status(500).send('Invalid Request');
        }
        else {
            if(data.rows.length > 0) {
                fields = data.fields.map(function(f) { return f.name; })
                message = "The result of your query is:"
            }
            else{
                message = 'Your query was successful';
            }
            res.send({message: message, rows: data.rows, field: fields});
        }
    });
});

router.get('/:user', function(req, res) {
    res.render('database');
});

module.exports = router;
