var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response){

  if(request.method === 'GET' && request.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('index.html').pipe(response);
  }
  if(request.method === 'GET' && request.url === '/node_modules/angular/angular.min.js'){
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    fs.createReadStream('node_modules/angular/angular.min.js').pipe(response);
  }
  if(request.method === 'GET' && request.url === '/client/app/app.js'){
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    fs.createReadStream('client/app/app.js').pipe(response);
  }

}).listen(8080);

