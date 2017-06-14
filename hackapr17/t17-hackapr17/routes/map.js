var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./db');

router.use(express.static(__dirname + '/public'));

/* GET map. */
router.get('/', function(req, res) {
	res.render('map');
});


router.get('/data/:id', function(req, res){

	var areas = [ 'Ward'];
	var areasIndex = req.params.id;

	var query = {};
	var text = ''

	if (areasIndex == -1){
		res.status(500).send('Invalid Request');
	}else{


		text="select complaint_class,count(*) as count from complaint where complaint_ward=$1 group by complaint_class"


		query.text = text.replace(/\$1/g,req.params.id);
		query.values = [];


		var result = {type:"FeatureCollection", features:[] };

		db.query(query.text, query.values, function(err, data){
			if (err) {
				console.error('error', err);
				res.status(500).send('Invalid Request');
			}
			else{

				var fields = data.fields.map(function(f) { return f.name; })
				// Gets the column names from the query as an array

				for (var i = 0, len = data.rows.length; i < len; i++) {
					//loop through result rows to build Feature Collection
					var feature = {
						type : "Feature",
						properties:{}
					};

					fields.forEach(function(a){
						//set feature properties by columns selected
						feature.properties[a] = data.rows[i][a];
					});
					result.features.push(feature);
				}
				res.setHeader('Content-Type', 'application/json');
				res.json(result);
			}

		});

	}

});

router.get('/data/complaint/:complaint', function(req, res){
    var complaints = ['Animal Welfare','Citizen Services','Health and Sanitation','Public Works','Regulation','Waste Management', 'Service Delivery'];
    var complaintsIndex = crimes.indexOf(req.params.complaint);
    var query = {};
    var text = '';
    if (complaintsIndex == -1){
        res.status(500).send('Invalid Request');
    }
	else {
		text = "select complaint_ward, count(*) from complaint where complaint_class=$1 group by complaint_ward"
		query.text = text.replace(/\$1/g, req.params.complaint);
		console.log(query.text);
		query.values = [];
		var result = {type: "FeatureCollection", features: []};

		db.query(query.text, query.values, function (err, data) {
			if (err) {
				console.error('error', err);
				res.status(500).send('Invalid Request');
			}
			else {

				var fields = data.fields.map(function (f) {
					return f.name;
				});
				// Gets the column names from the query as an array

				for (var i = 0, len = data.rows.length; i < len; i++) {
					//loop through result rows to build Feature Collection
					var feature = {
						type: "Feature",
						properties: {}
					};

					fields.forEach(function (a) {
						feature.properties[a] = data.rows[i][a];
					});
					result.features.push(feature);
				}
				res.setHeader('Content-Type', 'application/json');
				res.json(result);
			}

		});
	}

});
module.exports = router;
