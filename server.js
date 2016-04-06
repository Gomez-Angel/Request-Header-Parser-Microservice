var http = require('http');
var os = require('os');
var port = process.env.PORT || 15454;

var server= http.createServer(function(request,response){
  var ip = request.headers['x-forwarded-for'] || 
     request.connection.remoteAddress || 
     request.socket.remoteAddress ||
     request.connection.socket.remoteAddress;  
  
  var language = request.headers["accept-language"];
  language=language.split(',');
  
  var system = os.platform();
  
  var info ={ 'ipaddress' : ip, 'language' : language[0], 'software': system};   
     
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write(JSON.stringify(info));
  response.end();
});


server.listen(port);
console.log('Server running in ' + port);