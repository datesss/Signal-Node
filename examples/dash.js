import Signal from './Signal';
import config from './config';
var dash_button = require('node-dash-button');
const signal = new Signal(config.signalAccount);

var dash = dash_button("68:37:e9:7e:0e:8f", null, null, 'all'); //address from step above
dash.on("detected", function (){
	signal.send(config.groupID, `SOMEONE HIT THE BUTTON`, true);;
});
