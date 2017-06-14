var mysql = require('mysql');
var express = require('express');
var router = express.Router();

var connection  = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mellon',
    database : 'baba'
});


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});


module.exports = {
	query: function(text, values, cb) {
      connection.query(text, values, function(err, result) {
          cb(err, result);
        })
      }
   };



