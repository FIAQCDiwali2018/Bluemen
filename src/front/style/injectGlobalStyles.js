// @flow

// #region imports
import { injectGlobal } from 'styled-components';
// #endregion

const injectGlobalStyle = () => injectGlobal`
  html, body {
    margin: 0;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    background: black;
  }

  * {
    box-sizing: border-box;
  }

  .answer {
    color: white;
    font-size: 1.3rem;
    padding: 14px 0 0 30px;
  }

  .question {
    color: blue;
    width: 554px;
    font-size: 2.2rem;
    padding: 0 0 0 2px;
  }

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: none;
    }
  }
`;

export default injectGlobalStyle;
