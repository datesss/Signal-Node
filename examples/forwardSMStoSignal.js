import 'babel-polyfill';
import _ from 'lodash';
import express from 'express';
import bodyParser from 'body-parser'
import Signal from './Signal';
import Twilio from './twilio';
import config from './config';

const signal = new Signal(config.signalAccount);
// const twilio = new Twilio();
const app = express();
app.use(bodyParser.urlencoded({ extended: true}));

app.post('/sms', (req, res) => {
  console.log(req.body);
  console.log(`${req.body.From}: ${req.body.Body}`)
  signal.send(config.groupID, `${req.body.From}: ${req.body.Body}`, true);
  res.send();
});


app.listen(3000);
//
// const logMessages = async function logMessages() {
//   const messages = await signal.receive();
//   _.each(messages, (message) => {
//     twilio.sendSMS(`${message.from}: ${message.body}`);
//   });
// };
// setInterval(() => {
//   logMessages();
// }, 5000);
