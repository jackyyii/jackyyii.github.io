var express = require('express');
var server = express();

var portNum=process.argv[2] || 3000; //take the 3rd arguement, if not just use 3000
console.log("will listen on port " + portNum)

// Use www as the "root" directory for all requests.
// if no path is given, it will look for index.html in that directoy.
server.use(express.static("www"));

// Start the server listening on a port
server.listen(portNum, function(){
	console.log ("server listening on port " + portNum);
});




