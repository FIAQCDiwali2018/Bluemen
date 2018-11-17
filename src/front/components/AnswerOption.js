import React from 'react';
import PropTypes from 'prop-types';
import SplitText from 'react-pose-text';

function AnswerOption(props) {
  const charPoses = {
    exit: {opacity: 0, y: 20},
    enter: {
      opacity: 1,
      y: 0,
      delay: ({charIndex}) => charIndex * 30
    }
  };

  return (
    <div className="containerText">
      <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
        {`${props.label}: ${props.answerContent}`}
      </SplitText>
    </div>
  );
}

AnswerOption.propTypes = {
  answerContent: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default AnswerOption;
