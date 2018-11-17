// @flow

// #region imports
import React, {PureComponent} from 'react';
import * as WordCloudComponent from 'react-d3-cloud';
import {callApi} from '../../services/API/example';
// #endregion

// #region flow types
export type Props = {
  ...any,
};
export type State = any;

// #endregion

class WordCloud extends PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    setInterval(() => {
      callApi('/cities')
        .then(resp => this.setState({data: resp}))
        .catch(err => console.log(err));
      this.forceUpdate();
    }, 1000);
  }

  // #region lifecycle
  render() {
    const {data} = this.state;
    return (
      <WordCloudComponent width={400} height={300} data={data}
                          fontSizeMapper={word => Math.log2(word.value * 1000) * 5}/>);
  }

  // #endregion
}

export default WordCloud;
