import React, {Component} from 'react';
import Quiz from './../../components/Quiz';
import Top10FastestFinger from '../../components/Top10FastestFinger';
import {callApi} from '../../services/API/example';
import {Button, Col, Row} from 'react-bootstrap';
import styled from 'styled-components';

const Grid = styled('div')`
    margin: 0px 50px 0px 50px;
    max-width: 100%;
  `;

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

  restart = () => {
    this.setState({result: false});
    this.UNSAFE_componentWillMount();
    this.forceUpdate();
  };

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 0,
      question: '',
      answerOptions: {A: '', B: '', C: '', D: ''},
      answer: '',
      result: false
    };
  }

  componentDidMount() {
    if (!this.state.result) {
      callApi('/questions/current')
        .then(res => this.updateState(res))
        .catch(err => console.log(err));
    }
  }

  UNSAFE_componentWillMount() {
    callApi('/restartQuiz')
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    const {result, answer, questionId, answerOptions, question} = this.state;
    const api = result ? '/endQuiz' : '/questions/current';
    const top10Heading = result ? 'Blue Men Top 10 fasted finger:' : 'Current fasted finger are as follows:';
    return (
      <div className="QuizApp">
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              {questionId > 0 && !result ?
                <Quiz answer={answer} answerOptions={answerOptions} questionId={questionId} question={question}/> : ''}
              {!result ?
                (<div className="buttonsStyle">
                  <Button onClick={this.setNextQuestion}>NEXT</Button>
                  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
                  <Button onClick={this.setEndQuiz}>END</Button>
                </div>)
                : <Button onClick={this.restart}>Thank you</Button>}
            </Col>
            <Col xs={12} md={!result ? 6 : 12} style={{paddingLeft: 130 + 'px'}}>
              <Top10FastestFinger next={this.setNextQuestion} api={api} result={result} heading={top10Heading}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default BlueMenQuiz;
