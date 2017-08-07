'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Signal = function () {
  function Signal(username) {
    _classCallCheck(this, Signal);

    this.username = username;
  }

  _createClass(Signal, [{
    key: 'run',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(commands) {
        var command;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _shelljs2.default.exec('signal-cli -u ' + this.username + ' ' + commands, { silent: true });

              case 2:
                command = _context.sent;

                if (!command.stdout) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', command.stdout);

              case 5:
                if (!command.stderr) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt('return', command.stderr);

              case 7:
                return _context.abrupt('return');

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run(_x) {
        return _ref.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: 'version',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.run('-v');

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function version() {
        return _ref2.apply(this, arguments);
      }

      return version;
    }()
  }, {
    key: 'register',
    value: function register() {
      this.run('register');
    }
  }, {
    key: 'verify',
    value: function verify(verificationCode) {
      this.run('verify ' + verificationCode);
    }
  }, {
    key: 'send',
    value: function send(number, message, group) {
      if (group) {
        this.run('send -m "' + message + '" -g ' + number);
      } else {
        this.run('send -m ' + message + ' ' + number);
      }
    }
  }, {
    key: 'quitGroup',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(groupNumber) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.run('quitGroup -g ' + groupNumber);

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function quitGroup(_x2) {
        return _ref3.apply(this, arguments);
      }

      return quitGroup;
    }()
  }, {
    key: 'listDevices',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.run('listDevices');

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function listDevices() {
        return _ref4.apply(this, arguments);
      }

      return listDevices;
    }()
  }, {
    key: 'receive',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        var command, messages, newMessages;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.run('receive');

              case 2:
                command = _context5.sent;
                messages = _lodash2.default.filter(command.stdout.split('\n\n'), function (message) {
                  return message.length;
                });
                newMessages = _lodash2.default.map(messages, function (message) {
                  var messageArray = message.split('\n');
                  var messageJSON = {};
                  messageJSON.from = Signal.itemContains(messageArray, 'Envelope from: ') ? Signal.itemContains(messageArray, 'Envelope from: ').split(' ')[0] : undefined;
                  messageJSON.device = Signal.itemContains(messageArray, 'Envelope from: ') ? Signal.itemContains(messageArray, 'Envelope from: ').split(' ')[2].replace(')', '') : undefined;
                  messageJSON.timestamp = Signal.itemContains(messageArray, 'Timestamp: ') ? Signal.itemContains(messageArray, 'Timestamp: ').substring(0, 14) : undefined;
                  messageJSON.messageTimestamp = Signal.itemContains(messageArray, 'Message timestamp: ') ? Signal.itemContains(messageArray, 'Message timestamp: ').substring(0, 14) : undefined;
                  messageJSON.body = Signal.itemContains(messageArray, 'Body: ');
                  return messageJSON;
                });
                return _context5.abrupt('return', newMessages);

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function receive() {
        return _ref5.apply(this, arguments);
      }

      return receive;
    }()
  }], [{
    key: 'itemContains',
    value: function itemContains(collection, string) {
      var foundItem = _lodash2.default.filter(collection, function (item) {
        return item.indexOf(string) !== -1;
      });
      if (!foundItem[0]) {
        return '';
      }
      return foundItem[0].replace(string, '');
    }
  }]);

  return Signal;
}();

exports.default = Signal;

/* link,addDevice,listDevices,removeDevice,register,unregister,updateAccount,verify,send,quitGroup,
updateGroup,listIdentities,trust,receive,daemon
*/