import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";

import css from "./App.module.css";
import type { Note } from "../../types/note";

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(query.toLowerCase())
  );

  const notesPerPage = 12;
  const PAGINATION_THRESHOLD = 12;
  const totalPages =
    filteredNotes.length >= PAGINATION_THRESHOLD
      ? Math.ceil(filteredNotes.length / notesPerPage)
      : 1;


  const startIndex = (page - 1) * notesPerPage;

  const currentNotes =
    filteredNotes.length >= PAGINATION_THRESHOLD
      ? filteredNotes.slice(startIndex, startIndex + notesPerPage)
      : filteredNotes;

  const addNote = (note: Note) => {
    setNotes(prev => [note, ...prev]);
    setIsModalOpen(false);
    setPage(1);
  };


  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <div className={css.app}>

<div className={css.toolbar}>
  <SearchBox
    onSearch={(value) => {
      setQuery(value);
      setPage(1);
    }}
  />

  {filteredNotes.length >= PAGINATION_THRESHOLD && totalPages > 1 && (
    <Pagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  )}

  <button
    className={css.button}
    onClick={() => setIsModalOpen(true)}
  >
    Create note +
  </button>
</div>

      <NoteList
        notes={currentNotes}
        onDelete={deleteNote}
      />


      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={addNote}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
