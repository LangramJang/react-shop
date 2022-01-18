import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`

    body {
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 14px;
        line-height: 1.5;
        color: #24292e;
        background-color: #fff;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    }
      
    .app {
        display: flex;
        flex-direction: column;
        height: 100vh;
        justify-content: center;
        align-items: center;
    }
    
    input.error {
        border-color: red;
    }


    .input-feedback {
        color: red;
        height: 5px;
        margin-top: -12px;
    }
  
    button {
        display: flex;
        justify-content: center;
        padding-top: 4px;
        margin-top: 50px;
        width: 120px;
        height: 30px;
        border: none;
        border-radius: 15px; 
        text-align: center;
        margin: 80px auto;
    }
`;

export default GlobalStyle;