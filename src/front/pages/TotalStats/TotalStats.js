// @flow

// #region imports
import React, {PureComponent} from 'react';
import {callApi} from '../../services/API/example';
import AnswerOption from '../../components/AnswerOption';
import {PoseGroup} from 'react-pose';
import {Child, Parent} from './../../components/Quiz';
// #endregion

// #region flow types
export type Props = {
  ...any,
};
export type State = any;

// #endregion

class TotalStats extends PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {first3Fastest: [{phoneNumber: '', timeTaken: '', name: ''}], totalRegisteredUsers: 0};
  }

  componentDidMount() {
    setInterval(() => {
      callApi('/totalStats')
        .then(resp => this.setState(resp))
        .catch(err => console.log(err));
      this.forceUpdate();
    }, 3000);
  }

  // #region lifecycle
  render() {
    const {first3Fastest, totalRegisteredUsers} = this.state;
    return (
      <div>
        <PoseGroup preEnterPose="preEnter">
          <Parent pose="open" key={'stats'} className="sidebar">
            <PoseGroup preEnterPose="preEnter">
              <Child className="item" key={'aUserRegisteredChild'}><AnswerOption key="userRegistered"
                                                                                 label="Total User Registered"
                                                                                 answerContent={totalRegisteredUsers}/></Child>
              {first3Fastest.filter(p => p.phoneNumber && p.phoneNumber !== '').map((person, index) => (
                <Child className="item" key={`aUserRegisteredFastest${index}`}><AnswerOption
                  key={`aUserRegisteredFastest${index}`} label={person.name} answerContent={person.timeTaken}/></Child>
              ))}
            </PoseGroup>
          </Parent>
        </PoseGroup>
      </div>
    );
  }

  // #endregion
}

export default TotalStats;
