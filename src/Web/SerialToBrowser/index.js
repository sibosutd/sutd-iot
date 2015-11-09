/*
Express.js Serial to Browser example
Shows how to serve static pages along with a dynamic route
which communicates with the serial port.
in Express.js 4.0
This has a RESTful interface.  The static index.html page
will continally request /device/3, which will return the value from the
serial port.
to start this:
node index.js portname
where portname is the name of your serial port
created 10 Feb 2015
modified 10 Jun 2015
by Tom Igoe
*/

var express = require('express');				// include express.js
var app = express();								  	// a local instance of it

var shouldSimulateData = process.argv[2] === '--simulate';
const SIMULATE_DELAY = 4000;

app.use(express.static(__dirname + '/public'));			// use the /public directory for static files

// serial port initialization:
var serialport = require('serialport'),	// include the serialport library
SerialPort  = serialport.SerialPort,		// make a local instance of serial
// portName = process.argv[2],							// get the port name from the command line
portName = '/dev/tty.SLAB_USBtoUART',
portConfig = {
	baudRate: 9600,
	// call myPort.on('data') when a newline is received:
	parser: serialport.parsers.readline('\n')
};

if (!shouldSimulateData) {
    // open the serial port:
    var myPort = new SerialPort(portName, portConfig);
}

// this runs after the server successfully starts:
function serverStart() {
	var port = server.address().port;
	console.log('Server listening on port '+ port);
}

function random(low, high) {
    return Math.random() * (high - low) + low;
}

function randomData() {
    var generated = random(50, 100);
    return Math.round(generated * 100) / 100;
}

// get an analog reading from the serial port.
// This is a callback function for when the client requests /device/channel:
function getSensorReading(request, response) {

    if (shouldSimulateData) {
        var data = [randomData(), randomData(), randomData()];
        setTimeout(function () {

            response.end(data.join(' '));
        }, SIMULATE_DELAY);
        return;
    }

	// the parameter after /device/ is the channel number:
	var channel = request.params.channel;
	// console.log("getting channel: "+ channel + "...");

	// send the channel number out the serial port
	//and wait for a response:
	myPort.write(channel, function(){
		// when you get a response from the serial port,
		//write it out to the client:
		myPort.on('data', function(data) {
			// send the data and close the connection:
			response.end(data);
		});
	});
}

// start the server:
var server = app.listen(8080, serverStart);
// start the listeners for GET requests:
app.get('/device/:channel', getSensorReading);	// GET handler for /device
