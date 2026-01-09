import type { ChangeEvent } from "react";
import css from "./SearchBox.module.css";

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchBox({ onSearch }: Props) {
  return (
    <input
      className={css.input}
      placeholder="Search notes..."
      onChange={(e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
    />
  );
}
