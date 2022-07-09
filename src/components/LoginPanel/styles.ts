import styled from "styled-components";
import {colors} from "../../config";

export const Box = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  color: ${colors.primary};
`;

export const Button = styled.button`
  cursor: pointer;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: transparent;
  color: ${colors.primary};
  border: none;
  border: 1px solid ${colors.accent};
  border-radius: 0.5rem;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.secondary};
  }
`;