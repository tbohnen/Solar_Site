var express = require('express');
var app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
var sys = require('sys')
var exec = require('child_process').exec;

var current = 1;

app.get('/', function(req, res) {
  
  res.render('index.html');

});

app.get('/lights', function(req, res) {
var timeout = req.query.timeout;
if (timeout == undefined){
  timeout = 0;
}

  setTimeout(function(){changeLights();}, timeout);

  res.send('Changed');
});


var server = app.listen(80, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

function changeLights(){

	function puts(error, stdout, stderr) { 

console.log("sent: " + current);
}
	if (current == 1) {
	 current = 2;
	}
	else {
	 current = 1;
	}

	exec("sudo /home/pi/solar/433Utils/RPi_utils/codesend " + current, puts);

}
