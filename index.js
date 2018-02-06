var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var accesslog = require('access-log');
var geoip = require('geoip-lite');

var format = {
    "recast": {
      "ip": ":ip",
      "method": ":method",
      "status": ":statusCode",
      "url": ":url",
      "referer": ":userAgent",
      "time": ":{delta}"
    }
};

format = JSON.stringify(format);


// Serve up public/ftp folder
var serve = serveStatic('.', {'index': ['index.html', 'index.htm']});

// Create server
var server = http.createServer(function onRequest (req, res) {
  accesslog(req, res, format, function(s) {
    var result = JSON.parse(s);
    var realIp = req.headers['x-forwarded-for'];

    result['recast']['mark'] = 'blue';
    if (realIp) {
      result['recast']['real-ip'] = realIp.split()[0];
      var geo = geoip.lookup(result['recast']['real-ip']);
      if (geo && geo.ll) {
        result['recast']['loc'] = [geo.ll[1], geo.ll[0]];
      }
    }

    console.log(JSON.stringify(result));
  });
  serve(req, res, finalhandler(req, res))
});

// Listen
server.listen(8080);
