import React, { FC, useEffect, useState } from "react";
import { Table, SearchInput, Pane } from "evergreen-ui";
import { centerDiv } from "../../config/shortcuts";

export interface ListItemProps {
  id: number;
  title?: string;
  artist?: string;
  rating?: number;
}

interface ListProps {
  data: ListItemProps[];
  onSelect: (item: ListItemProps) => void;
}

export const List: FC<ListProps> = ({ data, onSelect }) => {
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const output: string[] = [];
    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (!output.includes(key)) {
          output.push(key);
        }
      });
    });
    setKeys(output);
  }, [data, keys, setKeys]);
  return (
    <Pane
      style={{
        width: "100%",
        ...centerDiv,
      }}
    >
      <SearchInput />
      <Table
        style={{
          width: "100%",
          padding: "2rem",
          border: "none",
        }}
      >
        <Table.Head>
          {keys.map((k) => (
            <Table.TextHeaderCell>{k}</Table.TextHeaderCell>
          ))}
        </Table.Head>
        <Table.VirtualBody height={240}>
          {data.map((item) => (
            <Table.Row
              key={item.id}
              isSelectable
              onSelect={() => onSelect(item)}
            >
              {Object.entries(item).map(([k, v]) => (
                <Table.TextCell key={k ?? ""} isNumber={!isNaN(v)}>
                  {v}
                </Table.TextCell>
              ))}
            </Table.Row>
          ))}
        </Table.VirtualBody>
      </Table>
    </Pane>
  );
};
