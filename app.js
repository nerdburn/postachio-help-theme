// make connect server
var connect = require('connect'), http = require('http');
connect.createServer(connect.static(__dirname)).listen(3000);

// log it
console.log('Listening on port 3000');