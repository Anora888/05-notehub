import css from "./NoteList.module.css";
import type { Note } from "../../types/note";

type Props = {
  notes: Note[];
  onDelete: (id: string) => void;
};

export default function NoteList({ notes, onDelete }: Props) {
  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.category}</span>
            <button
              className={css.button}
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

