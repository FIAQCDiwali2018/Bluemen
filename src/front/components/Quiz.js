import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import AnswerOption from '../components/AnswerOption';
import posed, {PoseGroup} from 'react-pose';
import {easing} from 'popmotion';
import animationTimings from './../animation/animationTimings';

const GridProps = {
  preEnter: {
    x: -1000,
    opacity: 0
  },
  enter: {
    x: 0,
    opacity: 1,
    delayChildren: animationTimings.gridEnter,
    staggerChildren: 80,
    transition: {
      opacity: {
        duration: animationTimings.gridEnter,
        ease: easing.linear
      },
      x: {type: 'spring'}
    }
  },
  exit: {
    x: 1000,
    opacity: 0,
    delay: 0,
    staggerChildren: 50,
    transition: {
      opacity: {
        duration: animationTimings.gridLeave,
        ease: easing.linear
      },
      x: {type: 'spring'}
    }
  }
};

const itemProps = {
  preEnter: {
    y: -50,
    opacity: 0,
    transition: {type: 'spring'}
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {type: 'spring'},
    delayChildren: animationTimings.gridEnter,
    staggerChildren: 80,
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: {type: 'spring'}
  }
};

export const Parent = posed.ul(GridProps);
export const Child = posed.li(itemProps);


function Quiz(props) {
  const {questionId, answerOptions, question, answer, showAns} = props;
  const {A, B, C, D} = answerOptions;
  return (
    <PoseGroup preEnterPose="preEnter">
      <Parent pose="open" key={questionId} className="sidebar">
        <Question content={question}/>
        <PoseGroup preEnterPose="preEnter">
          <Child className={`item ${'A' === answer && showAns ? 'showAns' : ''}`} key={'aChild'}><AnswerOption key="A"
                                                                                                               label="A"
                                                                                                               answerContent={A}/></Child>
          <Child className={`item ${'B' === answer && showAns ? 'showAns' : ''}`} key={'bChild'}><AnswerOption key="B"
                                                                                                               label="B"
                                                                                                               answerContent={B}/></Child>
          <Child className={`item ${'C' === answer && showAns ? 'showAns' : ''}`} key={'cChild'}><AnswerOption key="C"
                                                                                                               label="C"
                                                                                                               answerContent={C}/></Child>
          <Child className={`item ${'D' === answer && showAns ? 'showAns' : ''}`} key={'dChild'}><AnswerOption key="D"
                                                                                                               label="D"
                                                                                                               answerContent={D}/></Child>
        </PoseGroup>
      </Parent>
    </PoseGroup>

  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.object.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  showAns: PropTypes.bool.isRequired,
};

export default Quiz;
