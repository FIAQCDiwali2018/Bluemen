import React, {Component} from 'react';
import {Well} from 'react-bootstrap'

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top10: [{phoneNumber: '', timeTaken: ''}],
    };
  }


  callApi = async (api) => {
    const response = await fetch(api);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  componentDidMount() {
    setInterval(() => {
      this.callApi('/questions/current')
        .then(resp => this.setState({top10: resp.top10}))
        .catch(err => console.log(err));
      this.forceUpdate();
    }, 2000);
  }

  render() {
    return (
      <div>
        Top 10 People who have responsed with correct answer.
        
        {this.state.top10.map((person, index) => <Well
          key={index}
          bsSize="small">{`${index+1} ${person.name} ${person.phoneNumber} ${person.timeTaken / 1000}`}</Well>)}
      </div>
    );
  }
}

export default Result;
