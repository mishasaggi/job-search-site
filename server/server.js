var http = require('http');

var server = http.createServer(function(request, response){
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var body = [];
  request.on('error', function(err){
    console.log(err);
  }).on('data', function(chunk){
    body.push(chunck);
  }).on('end', function(){
    body = Buffer.concat(body).toString();

    response.on('error', function(){
      console.log(err);
    })

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // or  response.writeHead(200, {"Content-Type": "text/plain"});

    var responseBody = {
      headers: headers,
      method: method,
      url: url,
      body: body
    };

    response.write(JSON.stringify(responseBody));
    response.end();

  });

}).listen(8080);
