import React from 'react';
import PropTypes from 'prop-types';
import {Well} from 'react-bootstrap'

function AnswerOption(props) {
  return (
    <Well bsSize="small">{`${props.label}: ${props.answerContent}`}</Well>
  );
}

AnswerOption.propTypes = {
  answerContent: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default AnswerOption;
