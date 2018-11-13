// @flow

// #region imports
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const { error404, error500 } = require('../middleware/errors');
const config = require('../config');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// #endregion

// #region constants
const DOCS_PATH = '../../../docs/';
// #endregion

// $FlowIgnore
const expressServer = (app = null, isDev = false) => {
  if (!app) {
    console.log('Server application instance is undefined');
    throw new Error('Server application instance is undefined');
  }

  app.set('port', config.get('server.port'));
  app.set('ipAdress', config.get('server.host'));

  app.use(
    '/assets',
    express.static(path.join(__dirname, DOCS_PATH, 'assets/')),
  );

  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, DOCS_PATH, 'index.html')),
  );

  app.get('/results', (req, res) =>
    res.send("{ \n" +
      "    \"top3\" : [\n" +
      "        {\n" +
      "            \"phoneNumber\" : \"+13097789903\", \n" +
      "            \"timeTakenMillis\" : 5000.0\n" +
      "        }, \n" +
      "        {\n" +
      "            \"phoneNumber\" : \"+13097789878\", \n" +
      "            \"timeTakenMillis\" : 6000.0\n" +
      "        }, \n" +
      "        {\n" +
      "            \"phoneNumber\" : \"+13097213333\", \n" +
      "            \"timeTakenMillis\" : 7000.0\n" +
      "        }\n" +
      "    ]\n" +
      "}"),
  );

  app.get('/results/:questionGuid', (req, res) =>
    res.send("{ \n" +
      "    \"top3\" : [\n" +
      "        {\n" +
      "            \"phoneNumber\" : \"+13097789903\", \n" +
      "            \"timeTakenMillis\" : 5000.0\n" +
      "        }, \n" +
      "        {\n" +
      "            \"phoneNumber\" : \"+13097789878\", \n" +
      "            \"timeTakenMillis\" : 6000.0\n" +
      "        }, \n" +
      "        {\n" +
      "            \"phoneNumber\" : \"+13097213333\", \n" +
      "            \"timeTakenMillis\" : 7000.0\n" +
      "        }\n" +
      "    ]\n" +
      "}"),
  );

  app.get('/questions/next', (req, res) =>
    res.send("{\"question\" : \"Who is the president of the United States of America\", \n" +
      "    \"options\" : {\n" +
      "        \"A\" : \"George Washington\", \n" +
      "        \"B\" : \"Donald Trump\", \n" +
      "        \"C\" : \"Barack Obama\", \n" +
      "        \"D\" : \"George W. Bush\"\n" +
      "    }, \n" +
      "    \"answer\" : \"B\"}"),
  );

  app.get('/questions/current', (req, res) =>
    res.send("{\"question\" : \"Who is the president of the United States of America\", \n" +
      "    \"options\" : {\n" +
      "        \"A\" : \"George Washington\", \n" +
      "        \"B\" : \"Donald Trump\", \n" +
      "        \"C\" : \"Barack Obama\", \n" +
      "        \"D\" : \"George W. Bush\"\n" +
      "    }, \n" +
      "    \"answer\" : \"B\"}"),
  );

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

  app.post('/restartQuiz', (req, res) =>
    res.send("Quiz restarted"),
  );

  app.get('/')

  app.use(error404);
  app.use(error500);

  /* eslint-disable no-console */
  app.listen(config.get('server.port'), config.get('server.host'), () =>
    console.log(`
        =====================================================
        -> Server (${chalk.bgBlue('SPA')}) 🏃 (running) on ${chalk.green(
      config.get('server.host'),
    )}:${chalk.green(config.get('server.port'))}
        =====================================================
      `),
  );
  /* eslint-enable no-console */

  return app;
};

module.exports = expressServer;
