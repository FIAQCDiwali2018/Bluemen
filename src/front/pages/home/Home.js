// @flow

// #region imports
import React, { PureComponent } from 'react';
import {
  type Match,
  type Location,
  type RouterHistory,
} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Jumbotron from 'reactstrap/lib/Jumbotron';
import HomeInfo from './styled/HomeInfo';
import MainTitle from './styled/MainTitle';
import LightNote from './styled/LightNote';
import SplitterLayout from './../../../../node_modules/react-split-layout';
// #endregion

// #region flow types
export type Props = {
  // react-router 4:
  match: Match,
  location: Location,
  history: RouterHistory,

  ...any,
};

export type State = any;
// #endregion

class Home extends PureComponent<Props, State> {
  // #region lifecycle
  render() {
    return (
      <div>
        <Jumbotron>
          <HomeInfo>
            <SplitterLayout vertical secondaryInitialSize={500}>
              <header className="">
                <img src={logo} className="App-logo" alt="logo"/>
              </header>
              <SplitterLayout secondaryInitialSize={500}>
                <div className="my-pane">
                  <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                  </header>
                </div>
                <div className="my-pane">
                  <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                  </header>
                </div>
              </SplitterLayout>
            </SplitterLayout>
          </HomeInfo>
        </Jumbotron>
      </div>
    );
  }
  // #endregion
}

export default Home;
