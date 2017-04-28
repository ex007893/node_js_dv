var http=require("http");
var url=require("url");

function first_route(request,response){
  console.log("received sth");
  var path=url.parse(request.url).pathname;//only get the path after the/  
  response.writeHead(200,{"Content-Type": "text/plain"});
  response.write(path);
  response.end();
}

function launch(){
  http.createServer(first_route).listen(1991);
  console.log('Started');
}

exports.launch=launch;
