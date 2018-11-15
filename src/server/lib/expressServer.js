// @flow

// #region imports
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const {error404, error500} = require('../middleware/errors');
const config = require('../config');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const questionsDb = require('../config/questions.json').questions;
const uuidv4 = require('uuid/v4');
const fs = require('fs');
// #endregion

// #region constants
const DOCS_PATH = '../../../docs/';

// #endregion

class UserAnswer {
  constructor(phoneNumber, timeTaken) {
    this.phoneNumber = phoneNumber;
    this.timeTaken = timeTaken;
    this.count = 1;
  }
}

class Question {
  constructor(question, answer, options) {
    this.question = question;
    this.answer = answer;
    this.options = options;
    this.timestamp = Date.now();
    this.top10 = [];
    this.guid = uuidv4();
  }

  processAnswer(phoneNumber, answer) {
    if (!totalsMap.has(phoneNumber)) {
      totalsMap.set(phoneNumber, new Map());
    }

    if (answer.toUpperCase() === this.answer.toUpperCase()) {
      const timeTaken = Date.now() - this.timestamp;
      totalsMap.get(phoneNumber).set(this.guid, new UserAnswer(phoneNumber, timeTaken));

      this.top10 = this.top10.sort((a, b) => a.timeTaken - b.timeTaken);
      this.top10 = this.top10.filter(userObj => userObj.phoneNumber !== phoneNumber);
      if (this.top10.length < 10) {
        this.top10.push(new UserAnswer(phoneNumber, timeTaken));
      } else {
        if (this.top10.last().timeTaken > timeTaken) {
          this.top10 = this.top10.splice(9, 1, new UserAnswer(phoneNumber, timeTaken));
        }
      }
    } else {
      totalsMap.get(phoneNumber).delete(this.guid);
      this.top10 = this.top10.filter(userObj => userObj.phoneNumber !== phoneNumber);
    }
  }
}

// overallTop10 = groupBy(overallTop10.sort((a, b) => b.count - a.count), ua => ua.count).flatMap(uaGroup => uaGroup.sort((a, b) => a.timeTaken - b.timeTaken));

var questions = null;
var currentQuestion = null;
var questionResults = null;
var totalsMap = null;

restartQuiz();

function getNextQuestion() {
  const nextQuestion = questions.splice(Math.floor(Math.random() * questions.length), 1)[0];
  return new Question(nextQuestion.question, nextQuestion.answer, nextQuestion.options);
}

function restartQuiz() {
  questions = questionsDb.slice(0);
  currentQuestion = getNextQuestion();
  questionResults = [];
  if(totalsMap && totalsMap.size > 0) {
    fs.writeFile('./results_' + Date.now() + '.json', JSON.stringify(totalsMap), 'utf-8');
  }
  totalsMap = new Map();
}

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return Array.from(map);
}

function getOverallTop10() {
  const totalsArray = Array.from(totalsMap);
  const accTotals = totalsArray.flatMap(total => Array.from(total[1].values().reduce((accUa, ua) => {
    accUa.timeTaken = accUa.timeTaken + ua.timeTaken;
    accUa.count = accUa.count + 1;
    return accUa;
  }, new UserAnswer(total[0], 0))));

  const accTotalsSorted = groupBy(accTotals.sort((a, b) => b.count - a.count), ua => ua.count).flatMap(uaGroup => uaGroup.sort((a, b) => a.timeTaken - b.timeTaken));
  return accTotalsSorted.slice(0, 10).map(ua => ua.phoneNumber);
}

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

  app.get('/results', (req, res) => {
      res.send(getOverallTop10());
    },
  );

  app.get('/results/:questionGuid', (req, res) =>
    res.send('Not Implemented'),
  );

  app.get('/questions/next', (req, res) => {
      if (currentQuestion.question !== '') {
        questionResults.push(currentQuestion);
      }

      if (questions.length !== 0) {
        currentQuestion = getNextQuestion();
      } else {
        currentQuestion = new Question('', '', '');
      }

      res.send(currentQuestion);
    },
  );

  app.get('/questions/current', (req, res) =>
    res.send(currentQuestion),
  );

  app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    if (req.body.Body.toUpperCase() === 'A' || req.body.Body.toUpperCase() === 'B' || req.body.Body.toUpperCase() === 'C' || req.body.Body.toUpperCase() === 'D') {
      currentQuestion.processAnswer(req.body.From, req.body.Body);
      twiml.message('We have received your Answer, From FIAQC!!!');
    } else {
      if (req.body.Body === 'Hello' || req.body.Body === 'hello') {
        twiml.message('Hi, From FIAQC!');
      } else if (req.body.Body === 'bye' || req.body.Body === 'Bye') {
        twiml.message('Good-bye, From FIAQC');
      } else {
        twiml.message('We have received your Answer, From FIAQC!!!');
      }
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

  app.get('/restartQuiz', (req, res) => {
      restartQuiz();
      res.send('Quiz restarted');
    },
  );

  app.get('/endQuiz', (req, res) => {
      if (currentQuestion.question !== '') {
        questionResults.push(currentQuestion);
        currentQuestion = new Question('', '', '');
      }

      res.send(getOverallTop10());
    },
  );

  app.get('/');

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
