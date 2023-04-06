import { createGlobalStyle } from 'styled-components';
 
import { Colors } from '../colors';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${Colors.primary};
    font-family: Open-Sans, Helvetica, Sans-Serif;
    box-sizing: border-box;
    z-index: 0;
  }

`;
 
export default GlobalStyle;