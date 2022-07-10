import React from "react";
import styled from "styled-components";
import { colors } from "../../config";
import { fonts } from "../../config/fonts";
import { centerDiv } from "../../config/shortcuts";

export const containerStyles: React.CSSProperties = {
  margin: "0.5rem",
  padding: "0.5rem",
  ...centerDiv,
  width: "fit-content",
  border: `1px solid ${colors.accent}`,
  borderRadius: "4px",
};

// export const Container = styled.div`
//   margin: 0.5rem;
//   padding: 0.5rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: fit-content;
//   border: 1px solid ${colors.accent};
//   border-radius: 0.5rem;
//   color: ${colors.primary};
// `;

export const titleStyles: React.CSSProperties = {
  margin: "0.5rem",
  padding: "0.5rem",
  fontSize: fonts.big,
  fontWeight: "bold",
  color: colors.primary,
  transition: "all 0.4s ease-in-out",
};

// styled.h3`
//   margin: 0.5rem;
//   padding: 0.5rem;
//   font-size: ${fonts.big};
//   font-weight: bold;
//   color: ${colors.primary};
//   transition: all 0.4s ease-in-out;
// `;

export const LyricsContainer = styled.div`
  display: flex;
`;

export const lyricsStyles: React.CSSProperties = {
  margin: "0.5rem",
  padding: "0.5rem",
  fontSize: fonts.middle,
  color: colors.primary,
};

export const chordsStyles: React.CSSProperties = {
  ...lyricsStyles,
};
