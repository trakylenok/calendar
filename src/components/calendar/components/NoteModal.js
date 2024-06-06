import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, selectNotesByDate } from "../../../app/slices/calendarSlice";
import "./NoteModal.css";

function NoteModal({ date, onClose }) {
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [closing, setClosing] = useState(false);
  const dispatch = useDispatch();
  const notes = useSelector((state) => selectNotesByDate(state, date));

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) {
      setError("Note cannot be empty");
      return;
    }
    dispatch(addNote({
      date,
      note,
    }));
    handleClose();
  };

  return (
      <div className="overlay">
        <div className={`modal ${closing ? 'fadeOut' : 'fadeIn'}`}>
          <h2>Notes for {date}</h2>
          <ul>
            {notes.map((note, index) => (
                <li key={index}>{note}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
          <textarea
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                setError("");
              }}
              rows="4"
              placeholder="Add your note here..."
          />
            {error && <div className="error">{error}</div>}
            <div >
              <button type="submit">Add Note</button>
              <button type="button" onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default NoteModal;
