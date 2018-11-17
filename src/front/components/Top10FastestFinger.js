import React, {Component} from 'react';
import {Col, Grid, Row, Well} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {callApi} from '../services/API/example';

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
        <span style={{fontSize: 'larger'}}><b>{heading}</b></span>
        <Grid>
          {top10.slice(0, 10).filter(p => p.phoneNumber && p.phoneNumber !== '').map((person, index) => (
            <Row key={person.name + 'person' + index}>
              <Col xs={1} md={1}>
                <Well
                  bsSize="small">{index + 1}</Well>
              </Col>
              <Col xs={7} md={7}>
                <Well
                  bsSize="small">{person.name} / {person.phoneNumber}</Well>
              </Col>
              <Col xs={2} md={2}>
                <Well
                  bsSize="small">{(person.timeTaken / 1000).toFixed(2)}</Well>
              </Col>
            </Row>
          ))}
        </Grid>
      </div>
    );
  }
}


Top10FastestFinger.propTypes = {
  next: PropTypes.func.isRequired,
  api: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  result: PropTypes.bool.isRequired
};


export default Top10FastestFinger;
