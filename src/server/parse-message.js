const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  console.log(req.body.Body);
  console.log(req.body.From);
  console.log(req.body);
  if (req.body.Body == 'Hello' || req.body.Body == 'hello') {
    twiml.message('Hi, From FIAQC!');
  } else if (req.body.Body == 'bye' || req.body.Body == 'Bye') {
    twiml.message('Goodbye, From FIAQC');
  } else {
    twiml.message(
      'We have received your Answer, From FIAQC!!!'
    );
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

http.createServer(app).listen(3000, () => {
  console.log('Express server listening on port 3000');
});
