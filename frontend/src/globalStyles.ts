// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  *, body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', Helvetica, Sans-Serif;
    text-rendering: optimizeLegibility;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;

  }
  
`;

//color variables 

export default GlobalStyle;