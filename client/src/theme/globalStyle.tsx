import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    /* background-color: black; */
    font-family: Open-Sans, Helvetica, Sans-Serif;
    box-sizing: border-box;
    z-index: 0;
  }
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
    text-align: left;

  }



  /* *:hover {
    display:none;
  } */

  #root {
    height: 100vh;
    width: 100vw;
  }

`;
 
export default GlobalStyle;