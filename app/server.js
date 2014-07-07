var express = require('express');
var server = express();


server.use(express.static(__dirname));

var port = process.env.PORT || 1111;

server.listen(port);
