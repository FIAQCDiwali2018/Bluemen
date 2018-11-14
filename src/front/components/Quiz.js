import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import {CSSTransitionGroup} from 'react-transition-group';
import Question from '../components/Question';
import AnswerOption from '../components/AnswerOption';

function Quiz(props) {
  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={100}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.questionId}>
        {/*<QuestionCount counter={props.questionId} total={props.questionTotal} />*/}
        <Question content={props.question} />
        <div className="answerOptions">
          <AnswerOption
            key="A"
            label= "A"
            answerContent={props.answerOptions.A}
          />
          <AnswerOption
            key="B"
            label= "B"
            answerContent={props.answerOptions.B}
          />
          <AnswerOption
            key="C"
            label= "C"
            answerContent={props.answerOptions.C}
          />
          <AnswerOption
            key="D"
            label= "D"
            answerContent={props.answerOptions.D}
          />
        </div>
        <Button onClick={props.onAnswerSelected}>NEXT</Button>
      </div>
    </CSSTransitionGroup>
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.object.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;
