![https://travis-ci.org/datesss/Signal-Node](https://travis-ci.org/datesss/Signal-Node.svg?branch=master)

![](../master/readme.jpg)

# Signal-Node
This is a (very) thin wrapper over the Signal-CLI executable, for easier integration with node projects. It is experimental and very not secure.

## installation
import:
`import Signal from './Signal';`
create a new instance:
`const signal = new Signal(__PHONE_NUMBER__);`

## examples
Check out the example folders in this repo for :
1. A script that forwards SMS messages to a specified Signal Group. Use case: tip hotline.
2. a script that sends signal messages to a SMS number. Use case: your friend with a shitty flip phone.
3. A script that sends a message to a signal group when an Amazon Dash button is clicked.

## commands

#### version
`signal.version()`
#### register
`signal.register(__PHONE_NUMBER__)`
#### verify
`signal.verify(___VERIFCATION_CODE___)`
#### send
Send a message. set third argument to true to send to a group.

`signal.send(number,message,isGroup)`
#### receive
returns messages as Javascript Object.
`signal.receive()`
