import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../db.js";

function NoteEditor(props) {
  let navigate = useNavigate();


  let saveNote = async () => {};

  // default for new note
  let initText = "";
  let deleteButton = null;

  const deleteNote = async (event) => {
    event.preventDefault();

    await db.notes.delete(props.note.id);
    navigate("/");
  };

  if(typeof props.note === "undefined"){ // new note
    saveNote = async () => {
      db.notes.add({
        text: text,
        created_at: new Date(),
        edited_at: null
      });
    };
  } else { // edit existing note
    deleteButton = <a href="/" onClick={deleteNote} className="card-footer-item">Supprimer</a>;

    initText = props.note.text;

    saveNote = async () => {
      db.notes.update(props.note.id, {
        text: text,
        edited_at: new Date()
      });
    };
  }

  let [text, setText] = useState(initText);

  const handleSave = async (event) => {
    event.preventDefault();

    await saveNote();
    navigate("/");
  }

  const handleCancel = (event) => {
    event.preventDefault();

    window.history.back();
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="card">
      <textarea className="textarea" placeholder="À quoi pensez-vous ?" value={text} onChange={handleTextChange}></textarea>
      <footer className="card-footer">
        <a href="/" onClick={handleSave} className="card-footer-item">Enregister</a>
        {deleteButton}
        <a href="/" onClick={handleCancel} className="card-footer-item">Annuler</a>
      </footer>
    </div>
  );
}

export default NoteEditor;