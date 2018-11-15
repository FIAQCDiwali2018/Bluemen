// @flow

// #region imports
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const {error404, error500} = require('../middleware/errors');
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

class UserInfo{
  constructor(phoneNumber, name, city, state){
    this.phoneNumber = phoneNumber;
    this.name= name;
    this.city= city;
    this.state = state;
  }
}

class CityWithCount{
  constructor(city, count){
    this.city=city;
    this.count=count;
  }
}

class StateWithCount{
  constructor(state, count){
    this.state=state;
    this.count=count;
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
    if (answer.toUpperCase() === this.answer.toUpperCase()) {
      var timeTaken = Date.now() - this.timestamp;
      this.top10 = this.top10.sort((a, b) => a.timeTaken - b.timeTaken);
      if (this.top10.length < 10) {
        this.top10 = this.top10.filter(userObj => userObj.phoneNumber !== phoneNumber);
        this.top10.push(new UserAnswer(phoneNumber, timeTaken));
      } else {
        if (this.top10.last().timeTaken > timeTaken) {
          this.top10 = this.top10.splice(9, 1, new UserAnswer(phoneNumber, timeTaken));
        }
      }
    } else {
      this.top10 = this.top10.filter(userObj => userObj.phoneNumber !== phoneNumber);
    }
  }
}

var questions = null;
var currentQuestion = null;
var questionResults = null;

restartQuiz();

function getNextQuestion() {
  var nextQuestion = questions.splice(Math.floor(Math.random() * questions.length), 1)[0];
  return new Question(nextQuestion.question, nextQuestion.answer, nextQuestion.options);
}

function restartQuiz() {
  questions = questionsDb.slice(0);
  currentQuestion = getNextQuestion();
  results = [];
  registeredUsers = [];
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

  app.get('/results', (req, res) =>
    res.send(results),
  );

  app.get('/results/:questionGuid', (req, res) =>
    res.send('Not Implemented'),
  );

  app.get('/questions/next', (req, res) => {
      if(currentQuestion.question !== '') {
        results.push(currentQuestion);
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
      var userData = req.body.Body;
      var phoneNumber = req.body.From;
      if(userData.toUpperCase().includes("NAME") ){
          var userDetails = userData.split(";");
          var name = userDetails[0].split(":")[1];
          var city = userDetails[1].split(":")[1];
          var state = userDetails[2].split(":")[1];
          registeredUsers.push(new UserInfo(phoneNumber, name, city.toUpperCase(), state.toUpperCase()));
          twiml.message('We have received your registration information, From FIAQC!!!');
        }
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

  app.get('/cities', (req,res) => {
      citiesWithCount = [];
      const cities = registeredUsers.map(cnt => cnt.city);
      const uniqueCities = cities.unique();
      uniqueCities.forEach(function(city) {
        var citycount = cities.filter(equal_func(city)).length;
        citiesWithCount.push(new CityWithCount(city, citycount));
      });
      res.send(citiesWithCount);
    });

    app.get('/states', (req,res) => {
        statesWithCount = [];
        const states = registeredUsers.map(cnt => cnt.state);
        const uniqueStates = states.unique();
        uniqueStates.forEach(function(state) {
          var stateCount = states.filter(equal_func(state)).length;
          statesWithCount.push(new StateWithCount(state, stateCount));
        });
        res.send(statesWithCount);
      });

    Array.prototype.unique = function() {
      return this.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
    };

    function equal_func(x) {
      return function(it) {
        return it === x;
      }
  }

  app.get('/restartQuiz', (req, res) => {
      restartQuiz();
      res.send('Quiz restarted');
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
