import styled from "styled-components";
import colors from "../../colors";

interface ListItemProps {
  selected: boolean;
}

export const List = styled.ul`
  list-style: none;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid ${colors.accent};
  border-radius: 0.5rem;
`;

export const ListItem = styled.li<ListItemProps>`
  margin: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: col;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  transition: all 0.4s ease-in-out;
  background-color: ${(props) =>
    props.selected ? colors.primary : "transparent"};
  color: ${(props) => (props.selected ? colors.secondary : colors.primary)};
  &:hover {
    border: 1px solid ${colors.accent};
    background-color: ${(props) =>
      props.selected ? colors.primary : "transparent"};
  }
`;

export const ListTitle = styled.h3`

    margin: 0.5rem;
    padding: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${colors.primary};
    transition: all 0.4s ease-in-out;
`