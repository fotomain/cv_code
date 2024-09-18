
import { createGlobalStyle } from "styled-components";

// {/*https://www.freecodecamp.org/news/css-positioning-and-flexbox-explained/*/}


export default createGlobalStyle`

    
  body {
    margin: 0;
    line-height: normal;
    //background-color: #3c39e5;
    //figma CHomePageRoot
    position: relative;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  :root {
    --color-fuchsia: #e539e2;
    //background-color: #2fdf75;
  }
`

