import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * , *:before, *:after{ 
     box-sizing:border-box; 
     -moz-box-sizing:border-box; 
     -webkit-box-sizing:border-box; 
     -ms-box-sizing:border-box;
   }  
  html {
    scroll-snap-type: y mandatory;
    -webkit-overflow-scrolling: touch;
  } 
  html,
  body {
    padding-right: 0 !important; 
    height: 100%;
    width: 100%;
    margin: 0;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 10pt;
    line-height: 18pt;
    text-transform: uppercase;
  }
  ul {
    padding-inline-start: 16px;
        margin-block-start: 0;
    margin-block-end: 0;
  }
`;

export default GlobalStyle;