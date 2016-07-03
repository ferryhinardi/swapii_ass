var express = require('express');
var app = express();
var compression = require('compression');
var https = require('https');
 
app.use(compression());
app.use('/', express.static(__dirname + '/dist'));
 
app.get('*', function(req, res) {
	res.sendFile(__dirname + '/dist/index.html');
})

app.listen(process.env.PORT || 7000, function() {
	console.log(`Listening on Port: ${process.env.PORT || 7000}`);
});