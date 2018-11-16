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
    setInterval(() => {
      callApi(this.props.api)
        .then(resp => {
          if (resp.top10.length > 10) {
            this.props.next();
          } else {
            this.setState({top10: resp.top10});
          }
        })
        .catch(err => console.log(err));
      this.forceUpdate();
    }, 1000);
  }

  render() {
    const {top10} = this.state;
    const {heading} = this.props;
    return (
      <div>
        <Well bsSize="lg">{heading}</Well>
        <Grid>
          {top10.slice(0, 10).map((person, index) => (
            <Row key={person.name + 'person' + index}>
              <Col xs={12} md={3}>
                <Well
                  bsSize="small">${index + 1}</Well>
              </Col>
              <Col xs={12} md={3}>
                <Well
                  bsSize="small">{person.name}</Well>
              </Col>
              <Col xs={12} md={3}>
                <Well
                  bsSize="small">{person.phoneNumber}</Well>
              </Col>
              <Col xs={12} md={3}>
                <Well
                  bsSize="small">{person.timeTaken / 1000}</Well>
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
};


export default Top10FastestFinger;
