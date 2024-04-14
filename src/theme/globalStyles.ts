import { normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  ${normalize};

  /** Main resets and styles */
  html,
  body,
  body > #__next {
    height: 100%;
    width: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    @supports (padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)) {
      padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    }
  }

  
  
  *, *:before, *:after {
    box-sizing: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  p {
    margin: 0;
    padding: 0;
  }

  ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  input {
    border: none;
  }

  input:-webkit-autofill { transition: background-color 5000s ease-in-out 0s; }

  select {
    background-color: white;
    padding: 0;
    margin: 0;
    border: none;
  }

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
      outline: none;
  }

  button,
  input[type="submit"] {
    text-transform: none;
    background: none;
    color: inherit;
    border: none;
    margin: 0;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  ::placeholder {
  }

  /** End main resets and styles */
`;

export default GlobalStyle;
