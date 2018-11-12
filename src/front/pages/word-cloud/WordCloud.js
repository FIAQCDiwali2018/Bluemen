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
  componentDidMount(){
    setInterval(() => {
      this.forceUpdate();
    }, 3000);
  }

  // #region lifecycle
  render() {
    return (<WordCloudComponent width={400} height={300} data={this.props.data} fontSizeMapper={word => Math.log2(word.value) * 5} />);
  }
  // #endregion
}

WordCloud.defaultProps = {
  data: [
    {text: 'Indore', value: 1000},
    {text: 'Agra', value: 200},
    {text: 'Jabalpur', value: 800},
    {text: 'Delhi', value: 1000000},
    {text: 'Tamil Nadu', value: 10},
    {text: 'Indore', value: 1000},
    {text: 'Agra', value: 200},
    {text: 'Jabalpur', value: 800},
    {text: 'Delhi', value: 1000000},
    {text: 'Tamil Nadu', value: 10},
    {text: 'Indore', value: 1000},
    {text: 'Agra', value: 200},
    {text: 'Jabalpur', value: 800},
    {text: 'Delhi', value: 1000000},
    {text: 'Tamil Nadu', value: 10},
    {text: 'Indore', value: 1000},
    {text: 'Agra', value: 200},
    {text: 'Jabalpur', value: 800},
    {text: 'Delhi', value: 1000000},
    {text: 'Tamil Nadu', value: 10},
  ],
};

export default WordCloud;
