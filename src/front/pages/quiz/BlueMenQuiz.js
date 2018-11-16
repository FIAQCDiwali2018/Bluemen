import React, {Component} from 'react';
import Quiz from './../../components/Quiz';
import Top10FastestFinger from '../../components/Top10FastestFinger';
import {callApi} from '../../services/API/example';
import {Button} from 'react-bootstrap';

class BlueMenQuiz extends Component {

  updateState = (questionObject) => {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    if (questionObject && questionObject.question !== '') {
      this.setState({
        counter: counter,
        questionId: questionId,
        question: questionObject.question,
        answerOptions: questionObject.options,
        answer: questionObject.answer,
      });
    }
  };

  setEndQuiz = () => {
    this.setState({result: true});
  };

  setNextQuestion = () => {
    callApi('/questions/next')
      .then(res => this.updateState(res))
      .catch(err => console.log(err));
  };

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 0,
      question: '',
      answerOptions: {A: '', B: '', C: '', D: ''},
      answer: '',
      result: false,
    };

    this.setNextQuestion = this.setNextQuestion.bind(this);
  }

  componentDidMount() {
    callApi('/questions/current')
      .then(res => this.updateState(res))
      .catch(err => console.log(err));
  }

  UNSAFE_componentWillMount() {
    callApi('/restartQuiz')
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    const {result, answer, questionId, answerOptions, question} = this.state;
    const api = result ? '/endQuiz' : '/questions/current';
    const top10Heading = result ? 'Blue Men Top 10 fasted figure:' : 'Current fasted figure are as follows:';
    return (
      <div className="QuizApp">
        {questionId > 0 || result ?
          <Quiz answer={answer} answerOptions={answerOptions} questionId={questionId} question={question}/> : ''}
        <Button disabled={result} onClick={this.setNextQuestion}>NEXT</Button>
        <Button onClick={this.setEndQuiz}>END</Button>
        <Top10FastestFinger next={this.setNextQuestion} api={api} heading={top10Heading}/>
      </div>
    );
  }
}

export default BlueMenQuiz;
