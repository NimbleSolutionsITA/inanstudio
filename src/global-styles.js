import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * , *:before, *:after{ 
     box-sizing:border-box; 
     -moz-box-sizing:border-box; 
     -webkit-box-sizing:border-box; 
     -ms-box-sizing:border-box;
   } 
  html,
  body {
    padding-right: 0 !important; 
    height: 100%;
    width: 100%;
    margin: 0;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 11px;
    line-height: 18px;
    text-transform: uppercase;
  }
  ul {
    padding-inline-start: 16px;
        margin-block-start: 0;
    margin-block-end: 0;
  }
  @keyframes logoAnimation {
    0% { opacity: 0; }
    50% { opacity: 1; }
  }
  @-webkit-keyframes logoAnimation {
    0% { opacity: 0; }
    50% { opacity: 1; }
  }
  #logoINAN .logoIN {
    -webkit-animation: logoAnimation 4s infinite ;
    animation: logoAnimation 4s infinite ;
    animation-timing-function: step-end;
  }
  #logoINAN .logoAN {
    -webkit-animation: logoAnimation 4s infinite ;
    animation: logoAnimation 4s infinite;
    animation-timing-function: step-end;
    animation-delay: 2s;
  }
  .react-multi-carousel-list {
    overflow: visible;
  }
  .carousel-item-padding-40-px {
    padding-right: 10px;
  }
  .ohnohoney{
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      height: 0;
      width: 0;
      z-index: -1;
    }
    @media (min-width: 735px) {
      html,
      body {
        font-size: 10px;
      }
    }
`;

export default GlobalStyle;
