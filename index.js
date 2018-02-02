var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var accesslog = require('access-log');
var geoip = require('geoip-lite');

var format = {
    "ip": ":ip",
    "Xip": ":Xip",
    "method": ":method",
    "statusCode": ":statusCode",
    "url": ":url",
    "referer": ":userAgent",
    "startTime": ":startTime",
    "endTime": ":endTime",
    "delta": ":{delta}",
};

format = JSON.stringify(format);


// Serve up public/ftp folder
var serve = serveStatic('.', {'index': ['index.html', 'index.htm']});

// Create server
var server = http.createServer(function onRequest (req, res) {
  accesslog(req, res, format, function(s) {
    var result = JSON.parse(s);
    var geo = geoip.lookup(result.Xip);
    if (geo && geo.ll) {
      result['latlon'] = geo.ll;
    }

    console.log(JSON.stringify(result));
  });
  serve(req, res, finalhandler(req, res))
});

// Listen
server.listen(8080);
