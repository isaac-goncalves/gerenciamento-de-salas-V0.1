// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  *, body {
    margin: 0;
    padding: 0;
    
    box-sizing: border-box;
    font-family: 'Poppins', Helvetica, Sans-Serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  
  body {
    height: 100vh;
  }

  /* *:hover {
    display:none;
  } */

  #root {
    height: 100vh;
    width: 100vw;
  }

`;

//color variables 

export default GlobalStyle;