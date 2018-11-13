// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'AC20e9a62cf8f866b7302e288719d926f0';
const authToken = '659b4b60ebce109a0fdc569197bbd026';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is test from Vikram',
     from: '+14199316125',
     to: '+13099126291'
   })
  .then(message => console.log(message.sid))
  .done();