var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var axios = require('axios');
var bodyParser = require('body-parser');
var data = [];

server.listen(8000, () => {
	console.log('listening on port ' + 8000)
});
// WARNING: app.listen(80) will NOT work here!

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', function (req, res) {
  res.send(data);
});

app.post('/', (req, res) => {
	var temperature = req.body.temperature;
	var humidity = req.body.humidity;
	var date = req.body.date;
	io.emit('data', {temperature, humidity, date});
	res.send(true);
});

io.on('connection', function (socket) {
	console.log('connected');
});
