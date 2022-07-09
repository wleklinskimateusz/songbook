import styled from "styled-components";
import {colors} from "../../config";
import { fonts } from "../../config/fonts";

export const Container = styled.div`
    margin: 0.5rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    border: 1px solid ${colors.accent};
    border-radius: 0.5rem;
    color: ${colors.primary};
    
`

export const Title = styled.h3`
    margin: 0.5rem;
    padding: 0.5rem;
    font-size: ${fonts.big};
    font-weight: bold;
    color: ${colors.primary};
    transition: all 0.4s ease-in-out;
    
`

export const Lyrics = styled.div`
    margin: 0.5rem;
    padding: 0.5rem;
    font-size: ${fonts.middle}
    color: ${colors.primary};
    white-space: pre
`