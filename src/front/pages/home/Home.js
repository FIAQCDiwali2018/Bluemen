// @flow

// #region imports
import React, {PureComponent} from 'react';
import {Link, type Location, type Match, NavLink, type RouterHistory} from 'react-router-dom';
import Jumbotron from 'reactstrap/lib/Jumbotron';
import HomeInfo from './styled/HomeInfo';
import MainTitle from './styled/MainTitle';
import LightNote from './styled/LightNote';
import SplitPane from 'react-split-pane';
import styled from 'styled-components';
import {Col, Grid, Row} from 'react-bootstrap';
import WordCloud from '../../pages/word-cloud';
import QuizComponent from "../quiz/QuizComponent";
import Result from "../../components/Result";
// #endregion

// #region flow types
export type Props = {
  // react-router 4:
  match: Match,
  location: Location,
  history: RouterHistory,
  ...any,
};

const Container = styled('div')`
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
`;

const H1 = styled('h1')`
  height: 100%;
  background-color: light;
  border-bottom: 1px solid #e0e0e0;
`;

const Header = styled('div')`
  width: 100%;
  display: flex;
  background-color: light;
  flex-direction: row;
  align-items: left;
`;

const TitleArea = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled(Link)`
  display: block;
  font-size: 2em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
  text-decoration: none;
  color: black;
`;

const Description = styled('div')`
  max-width: 100%;
  color: #c6c6c6;
  font-size: 18px;
  padding: 20px;
`;

const SectionTitle = styled('h3')`
  font-size: 20px;
  font-weight: lighter;
  margin: 0;
  margin-left: 15px;
  margin-bottom: 15px;
`;

const SectionItem = styled(NavLink)`
  font-size: 18px;
  font-weight: lighter;
  color: #8c8c8c;
  margin: 0;
  margin-left: 25px;
  margin-bottom: 15px;
  text-decoration: none;

  &:hover {
    color: #595656;
  }
`;

export type State = any;

// #endregion

class Home extends PureComponent<Props, State> {
  // #region lifecycle
  render() {
    const {sections} = this.props;
    return (
      <div>
          <Grid>
            <Row>
              <Col xs={12} md={8}>
                <Row>
                  <Col>
                    <Header>
                      <H1>Blue Men Quiz</H1>
                    </Header>
                    <div>
                      <ul>
                        <li>1. Register to 883344 with your name, city, country</li>
                        <li>2. Right side will be Quiz Questiona with 4 options. Please ans one of the option for the question.</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <QuizComponent/>
                </Row>
                <Row>
                  <Result/>
                </Row>
              </Col>
              <Col xs={12} md={4}>
                <Row className="show-grid">
                  <Col xs={12} md={12}>
                    <WordCloud/>
                  </Col>
                </Row>
                <Row className="show-grid">
                  <Col xs={12} md={12}>
                    <WordCloud/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
          {/*{sections.map(section => (*/}
            {/*<React.Fragment>*/}

              {/*<SectionTitle>{section.title}</SectionTitle>*/}
              {/*{section.items.map(item => (*/}
                {/*<SectionItem to={item.url} activeStyle={{color: '#cb659c'}}>*/}
                  {/*{item.title}*/}
                {/*</SectionItem>*/}
              {/*))}*/}
            {/*</React.Fragment>*/}
          {/*))}*/}
      </div>
    );
  }

  // #endregion
}

Home.defaultProps = {
  sections: [
    {
      title: 'Basic Usage',
      items: [
        {
          title: 'Basic Horizontal',
          url: '/basic-horizontal',
        },
      ],
    },
    {
      title: 'Advanced Usage',
      items: [
        {
          title: 'Inline styles',
          url: '/inline-styles',
        },
      ],
    },
  ],
};

export default Home;
