import React, { FC, useEffect, useState } from "react";
import { Table, SearchInput, Pane } from "evergreen-ui";
import { centerDiv } from "../../../config/shortcuts";

export interface ListItemProps {
  id?: string;
  title?: string;
  artist?: string;
  rating?: number;
}

type Props = {
  data: ListItemProps[];
  onSelect: (id: string) => void;
};

export const List: FC<Props> = ({ data, onSelect }) => {
  const [keys, setKeys] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<ListItemProps[]>([]);

  useEffect(() => {
    if (!filter) {
      setFilteredItems(data);
      return;
    }
    const output = data.filter(
      (item) =>
        item.title?.toLowerCase().includes(filter.toLowerCase()) ||
        item.artist?.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredItems(output);
  }, [filter, data]);

  useEffect(() => {
    const output: string[] = [];
    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (!output.includes(key) && key !== "id") {
          output.push(key);
        }
      });
    });
    setKeys(output);
  }, [data]);
  return (
    <Pane
      style={{
        width: "100%",
        ...centerDiv,
      }}
    >
      <SearchInput
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFilter(e.target.value);
        }}
      />
      <Table
        style={{
          width: "100%",
          padding: "2rem",
          border: "none",
        }}
      >
        <Table.Head>
          {keys.map((k) => (
            <Table.TextHeaderCell key={k}>{k}</Table.TextHeaderCell>
          ))}
        </Table.Head>
        <Table.VirtualBody height={240}>
          {filteredItems.map((item) => (
            <Table.Row
              key={item.id}
              isSelectable
              onSelect={() => onSelect(item.id ?? "")}
            >
              {Object.entries(item)
                .filter(([k]) => k !== "id")
                .map(([k, v]) => (
                  <Table.TextCell key={k} isNumber={!isNaN(v)}>
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
