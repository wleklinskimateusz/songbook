import { createGlobalStyle } from "styled-components";
import {colors} from "./config"

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: ${(props) => (props.darkMode ? "white" : "black")};
    background-color: ${colors.background};
  }
`;
