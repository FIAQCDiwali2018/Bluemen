// @flow

// #region imports
import React, {PureComponent} from 'react';
import * as WordCloudComponent from 'react-d3-cloud';
// #endregion

// #region flow types
export type Props = {
  ...any,
};
export type State = any;

// #endregion

class WordCloud extends PureComponent<Props, State> {
  callApi = async (api) => {
    const response = await fetch(api);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    setInterval(() => {
      this.callApi('/cities')
        .then(resp => this.setState({data: resp}))
        .catch(err => console.log(err));
      this.forceUpdate();
    }, 3000);
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
