import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransitionGroup} from 'react-transition-group';
import Question from '../components/Question';
import AnswerOption from '../components/AnswerOption';

function Quiz(props) {
  const {questionId, answerOptions, question} = props;
  const {A, B, C, D} = answerOptions;
  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={50}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={questionId}>
        <Question content={question}/>
        <AnswerOption key="A" label="A" answerContent={A}/>
        <AnswerOption key="B" label="B" answerContent={B}/>
        <AnswerOption key="C" label="C" answerContent={C}/>
        <AnswerOption key="D" label="D" answerContent={D}/>
      </div>
    </CSSTransitionGroup>
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.object.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
};

export default Quiz;
