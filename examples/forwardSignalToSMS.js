import 'babel-polyfill';
import _ from 'lodash';
import Signal from './Signal';
import Twilio from './twilio';
import config from './config';
console.log(config.signalAccount);
const signal = new Signal(config.signalAccount);
const twilio = new Twilio();
// signal.receive();
signal.receive();

const logMessages = async function logMessages() {
  console.log('checking')
  const messages = await signal.receive();
  _.each(messages, (message) => {
    twilio.sendSMS(`${message.from}: ${message.body}`);
  });
};
setInterval(() => {
  logMessages();
}, 5000);
