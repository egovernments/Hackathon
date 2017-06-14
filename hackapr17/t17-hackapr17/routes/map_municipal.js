var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('./db');

router.use(express.static(__dirname + '/public'));

router.get('/', function(req, res) {
    res.render('map_municipal');
});


router.get('/data/:area', function(req, res){

    var areas = [ 'Ward'];
    var areasIndex = areas.indexOf(req.params.area);

    var query = {};
    var text = ''

    if (areasIndex == -1){
        res.status(500).send('Invalid Request');
    }else{


        text="SELECT ward_name as name, area_sq_km as area, dens_sqkm as dens, pop_tot as pop, pop_m as popm, pop_f as popf, c1 as c1, c2 as c2, c3 as c3, c4 as c4, c5 as c5, c6 as c6, c1f as c1f, c2f as c2f, c3f as c3f, c4f as c4f, c5f as c5f, c6f as c6f, st_asgeojson(st_simplify(geom, 0.001) ) as geom FROM $1"


        query.text = text.replace(/\$1/g,"ward");
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
                        geometry : data.rows[i].geom,
                        properties:{}
                    };

                    fields.forEach(function(a){
                        //set feature properties by columns selected
                        if (a != 'geom') feature.properties[a] = data.rows[i][a];
                    });
                    result.features.push(feature);
                }
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            }

        });

    }

});

router.get('/data/crime/:crime', function(req, res){
    var crimes = ['Crime1','Crime2','Crime3','Crime4','Crime5','Crime6'];
    var crimesIndex = crimes.indexOf(req.params.crime);
    var query = {};
    var text = '';
    if (crimesIndex == -1){
        res.status(500).send('Invalid Request');
    }
    else {
        text = "SELECT time as time_of_crime, details as details_of_crime,  st_asgeojson(st_simplify(geom, 0.001) ) as geom FROM crime where type like '$1'"
        query.text = text.replace(/\$1/g, req.params.crime);
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
                        geometry: data.rows[i].geom,
                        properties: {}
                    };

                    fields.forEach(function (a) {
                        //set feature properties by columns selected
                        if (a != 'geom') feature.properties[a] = data.rows[i][a];
                    });
                    result.features.push(feature);
                }
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            }

        });
    }

});

router.get('/auto/:value', function(req, res){
    //search landmarks & localities for autocorrect matches
    var limit = 7; //autocomplete limit
    var query = {};
    //use ~* operator for regex
    //use % for trigram
    query.text = "SELECT * FROM (SELECT name, 'landmarks' AS table_name FROM landmarks WHERE name ~* $1 UNION SELECT name, 'localities' AS table_name FROM localities landmarks WHERE name ~* $1) AS q1 order by name <-> $1 LIMIT $2";
    query.values = [req.params.value, limit];

    db.query(query.text, query.values, function(err, data){
        if (err) console.error(err);

        result = data.rows;

        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    });

});


router.get('/point/:name/:coord1/:coord2', function(req, res){

    var latlng = [req.params.coord1, req.params.coord2];

    var attributes = {"type": "Feature", "properties":{"name":req.params.name}, "geometry": {"type":"Point","coordinates":[latlng[0], latlng[1]]} };

    attributes = JSON.stringify(attributes);
    res.render('map', {"attributes": attributes})

});

//autocomplete
router.get('/.*|.?/auto/', function(req, res){
    //search landmarks & localities for autocorrect matches
    var limit = 7 //autocomplete limit
    var search = req.query.search
    var query = {}
    query.text = "SELECT title, concat('/map/point/', title) AS url, text, geom FROM (SELECT name AS title, locality AS text, st_asgeojson(geom) as geom FROM landmarks WHERE name ~* $1 UNION SELECT name AS title, name_alt AS text, st_asgeojson(geom) as geom FROM localities WHERE name ~* $1) AS q1 order by title <-> $1 LIMIT $2";
    query.values = [search, limit];

    db.query(query.text, query.values, function(err, data){
        //store results in result.results for search & autocomplete
        var result = {};
        //result.results = data.rows;

        result.results = data.rows.map(function(a){
            var b = a;
            b.url  = a.url+'/'+JSON.parse(a.geom).coordinates.toString().replace(',','/');
            return b;
        });
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    });

});

router.get('/point/', function (req, res){
    res.redirect('/');
});



module.exports = router;
