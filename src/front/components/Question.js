import React from 'react';
import PropTypes from 'prop-types';
import logo from '../style/Artboard-q.png'

const style = {
  backgroundImage: `url(${logo})`,
  backgroundRepeat: 'no-repeat',
  height: '100px',
  width: '735px'
};

function Question(props) {
  return <h3 className="question">{props.content}</h3>;
}

Question.propTypes = {
  content: PropTypes.string.isRequired
};

export default Question;
