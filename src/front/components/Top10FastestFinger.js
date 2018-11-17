import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {callApi} from '../services/API/example';
import {PoseGroup} from 'react-pose';
import {Child, Parent} from './../components/Quiz';
import {charPoses} from './../components/AnswerOption';
import SplitText from 'react-pose-text';

class Top10FastestFinger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top10: [{phoneNumber: '', timeTaken: '', name: ''}],
    };
  }

  componentDidMount() {
    const {api, result, next} = this.props;
    setInterval(() => {
      if (!result) {
        callApi(api)
          .then(resp => {
            if (resp.top10.length > 10) {
              next();
            } else {
              this.setState({top10: resp.top10});
            }
          })
          .catch(err => console.log(err));
      }
      this.forceUpdate();
    }, 1000);
  }

  render() {
    const {top10} = this.state;
    const {heading} = this.props;
    return (
      <div>
        <PoseGroup preEnterPose="preEnter">
          <Parent pose="open" key={'stats1'} className="totalSldebarTop10">
            <h6 className="questionTop10">{heading}</h6>
            <PoseGroup preEnterPose="preEnter">
              {top10.slice(0, 6).filter(p => p.phoneNumber && p.phoneNumber !== '').map((person, index) => (
                <Child className="item" key={`aUserRegisteredFastest${index}`}>
                  <Row key={person.name + 'person' + index}>
                    <Col xs={1} md={1} key={`Col1-${index}`}>
                      <SplitText className="containerTextTop10" initialPose="exit" pose="enter" charPoses={charPoses}>
                        {(index + 1 )+''}
                      </SplitText>
                    </Col>
                    <Col xs={7} md={7} key={`Col2-${index}`}>
                      <SplitText className="containerTextTop10" initialPose="exit" pose="enter" charPoses={charPoses}>
                        {`${person.name} ${person.phoneNumber}`}
                      </SplitText>
                    </Col>
                    <Col xs={3} md={3} key={`Col3-${index}`}>
                      <SplitText className="containerTextTop10" initialPose="exit" pose="enter" charPoses={charPoses}>
                        {(person.timeTaken / 1000).toFixed(2) + ''}
                      </SplitText>
                    </Col>
                  </Row>
                </Child>
              ))}
            </PoseGroup>
          </Parent>
        </PoseGroup>
      </div>
    );
  }
}


Top10FastestFinger.propTypes = {
  next: PropTypes.func.isRequired,
  api: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  result: PropTypes.bool.isRequired,
};


export default Top10FastestFinger;
