import twilio from 'twilio';
import config from './config';

class Twilio {
  constructor() {
    this.client = new twilio.RestClient(config.twilioSID, config.twilioAUTH);
  }
  sendSMS(body) {
    console.log('sending');
    this.client.messages.create({
      body,
      to: config.twilioTo,
      from: config.twilioFrom,
    }, (err, message) => {
      console.log(err);
      console.log(message);
    });
  }
  sendMedia(body, mediaUrl) {
    this.client.messages.create({
      body,
      mediaUrl,
      to: config.twilioTo,
      from: config.twilioFrom,
    }, (err, message) => {
      console.log(err);
      console.log(message);
    });
  }
}

export default Twilio;
