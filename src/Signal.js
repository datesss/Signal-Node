import 'babel-polyfill';
import shell from 'shelljs';
import _ from 'lodash';

class Signal {
  constructor(username) {
    this.username = username;
  }
  static itemContains(collection, string) {
    const foundItem = _.filter(collection, item => item.indexOf(string) !== -1);
    if (!foundItem[0]) { return ''; }
    return foundItem[0].replace(string, '');
  }

  async run(commands) {
    console.log(`signal-cli -u ${this.username} ${commands}`)
    const command = await shell.exec(`signal-cli -u ${this.username} ${commands}`, { silent: true });
    return command;
  }
  version() { this.run('-v'); }
  register() { this.run('register'); }
  verify(verificationCode) { this.run(`verify ${verificationCode}`); }
  send(number, message, group) {
    if (group) {
      this.run(`send -m "${message}" -g ${number}`);
    } else {
      this.run(`send -m ${message} ${number}`);
    }
  }
  async receive() {
    const command = await this.run('receive');
    const messages = _.filter(command.stdout.split('\n\n'), message => message.length);
    const newMessages = _.map(messages, (message) => {
      const messageArray = message.split('\n');
      const messageJSON = {};
      messageJSON.from = Signal.itemContains(messageArray, 'Envelope from: ') ? Signal.itemContains(messageArray, 'Envelope from: ').split(' ')[0] : undefined;
      messageJSON.device = Signal.itemContains(messageArray, 'Envelope from: ') ? Signal.itemContains(messageArray, 'Envelope from: ').split(' ')[2].replace(')', '') : undefined;
      messageJSON.timestamp = Signal.itemContains(messageArray, 'Timestamp: ') ? Signal.itemContains(messageArray, 'Timestamp: ').substring(0, 14) : undefined;
      messageJSON.messageTimestamp = Signal.itemContains(messageArray, 'Message timestamp: ') ? Signal.itemContains(messageArray, 'Message timestamp: ').substring(0, 14) : undefined;
      messageJSON.body = Signal.itemContains(messageArray, 'Body: ');
      return messageJSON;
    });
    return newMessages;
  }
}

export default Signal;

/* link,addDevice,listDevices,removeDevice,register,unregister,updateAccount,verify,send,quitGroup,
updateGroup,listIdentities,trust,receive,daemon
*/
