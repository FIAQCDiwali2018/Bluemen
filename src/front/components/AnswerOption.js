import React from 'react';
import PropTypes from 'prop-types';
import {Well} from 'react-bootstrap';
import logo from '../style/Artboard 2.png'

const style = {
  backgroundImage: `url(${logo})`,
  backgroundRepeat: 'no-repeat',
  height: '100px',
  width: '735px'
};

function AnswerOption(props) {
  return (
    <Well bsSize="lg">
      <div className="answer" style={style}>{`${props.label}: ${props.answerContent}`}</div>
    </Well>
  );
}

AnswerOption.propTypes = {
  answerContent: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default AnswerOption;
