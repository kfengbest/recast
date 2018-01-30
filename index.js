var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var accesslog = require('access-log');

var format = {
    "ip": ":ip",
    "method": ":method",
    "statusCode": ":statusCode",
    "url": ":url",
    "referer": ":userAgent"
};

// var format = '{"ip":":ip", "method":":method", "statusCode":":statusCode", "url":":url", "referer":":userAgent"}';
format = JSON.stringify(format);


// Serve up public/ftp folder
var serve = serveStatic('.', {'index': ['index.html', 'index.htm']});

// Create server
var server = http.createServer(function onRequest (req, res) {
  accesslog(req, res, format, function(s) {
    console.log(s);
  });
  serve(req, res, finalhandler(req, res))
});

// Listen
server.listen(8080);