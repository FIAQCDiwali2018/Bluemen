// @flow

// #region imports
import React, {PureComponent} from 'react';
import {Link, type Location, type Match, NavLink, type RouterHistory} from 'react-router-dom';
import styled from 'styled-components';
import {Col, Grid, Row} from 'react-bootstrap';
import WordCloud from '../../pages/word-cloud';
import BlueMenQuiz from '../quiz/BlueMenQuiz';
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
                        <li>Send SMS to 883344 with your name and city. e.g Rahul Dravid;Banglore</li>
                        <li>Send SMS to 883344 with correct option(A, B, C or D) for below Question</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
                <Row>
                  &nbsp;
                </Row>
                <Row>
                  <BlueMenQuiz/>
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
                    &nbsp;
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
