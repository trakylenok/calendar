import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, selectNotesByDate } from "../../../app/slices/calendarSlice";
import "./NoteModal.css";

function NoteModal({ date, onClose }) {
  const [note, setNote] = useState("");
  const dispatch = useDispatch();
  const notes = useSelector((state) => selectNotesByDate(state, date));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.trim()) {
      dispatch(
        addNote({
          date,
          note,
        })
      );
      onClose();
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Notes for {date}</h2>
        <ul>
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="4"
            placeholder="Add your note here..."
          />
          <div>
            <button type="submit">Add Note</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;
