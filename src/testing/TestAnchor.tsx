import React, { FC } from "react";

export const TestAnchor: FC<{ tag: string; children: React.ReactNode }> = ({
  tag,
  children,
}) => {
  return <div data-testid={tag}>{children}</div>;
};
