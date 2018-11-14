// @flow

// #region imports
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const { error404, error500 } = require('../middleware/errors');
const config = require('../config');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const questionsDb = require('../config/questions.json').questions;
// #endregion

// #region constants
const DOCS_PATH = '../../../docs/';
// #endregion

class UserAnswer {
  constructor(phoneNumber, timeTaken) {
    this.phoneNumber = phoneNumber;
    this.timeTaken = timeTaken;
  }
}

class Question {
  constructor(question, answer, options) {
    this.question = question;
    this.answer = answer;
    this.options = options;
    this.timestamp = Date.now();
    this.top10 = [];
  }

  processAnswer(phoneNumber, answer) {
    if(answer.toUpperCase() === this.answer.toUpperCase()) {
      var timeTaken = Date.now() - this.timestamp;
      this.top10 = this.top10.sort((a,b) => a.timeTaken - b.timeTaken);
      if(this.top10.length < 10) {
        this.top10.insert(new UserAnswer(phoneNumber, timeTaken));
      } else {
        if(this.top10.last().timeTaken > timeTaken) {
          this.top10 = this.top10.splice(9,1,new UserAnswer(phoneNumber, timeTaken));
        }
      }
    }
  }
}

var questions = questionsDb.slice(0);
var currentQuestion = new Question("Hello, World!", "", "");
var results = [];

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
    res.send(results),
  );

  app.get('/results/:questionGuid', (req, res) =>
    res.send("Not Implemented"),
  );

  app.get('/questions/next', (req, res) => {
    if(currentQuestion.question !== "Hello, World!" && currentQuestion.question !== "") {
      console.log("Calculate Results.");
      results.push(currentQuestion.top10)
    } else {
      console.log("Will not calculate results, since its the first question or empty question");
    }

    if(questions.length != 0) {
      var nextQuestion = questions.splice(Math.floor(Math.random() * questions.length), 1)[0];
      currentQuestion = new Question(nextQuestion.question, nextQuestion.answer, nextQuestion.options);
      res.send(currentQuestion);
    } else {
      res.send(new Question("", "", ""));
    }
    },
  );

  app.get('/questions/current', (req, res) =>
    res.send(currentQuestion),
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

  app.get('/restartQuiz', (req, res) => {
      currentQuestion = new Question("Hello, World!", "", "");
      questions = questionsDb.slice(0);
      results = [];
      res.send("Quiz restarted");
    },
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
