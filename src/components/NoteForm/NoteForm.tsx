import { useState } from "react";
import css from "./NoteForm.module.css";
import type { Note } from "../../types/note";

type Props = {
  onSubmit: (note: Note) => void;
  onCancel?: () => void;
};

export default function NoteForm({ onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Personal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      id: Date.now().toString(),
      title,
      content,
      category,
    });

    setTitle("");
    setContent("");
    setCategory("Personal");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        Title
        <input
          className={css.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={css.formGroup}>
        Content
        <textarea
          className={css.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className={css.formGroup}>
        Category
        <select
          className={css.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Todo">Todo</option>
          <option value="Shopping">Shopping</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button className={css.submitButton} type="submit">
          Add note
        </button>
        {onCancel && (
          <button
            className={css.cancelButton}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
