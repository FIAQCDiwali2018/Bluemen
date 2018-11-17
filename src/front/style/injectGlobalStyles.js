// @flow

// #region imports
import { injectGlobal } from 'styled-components';
// #endregion

const injectGlobalStyle = () => injectGlobal`
  html, body {
    margin: 0;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    background: white;
  }

  * {
    box-sizing: border-box;
  }

  .answer {
    color: white;
    font-size: 2.3rem;
    padding: 13px 0 0 30px;
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
