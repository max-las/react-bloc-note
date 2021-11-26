import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../db.js";

import { ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

function RichEditor(props) {
  let navigate = useNavigate();

  let saveNote = async () => {};

  // default for new note
  let initContent = convertToRaw(ContentState.createFromText(""));
  let deleteButton = null;

  const deleteNote = async (event) => {
    event.preventDefault(); // prevent link from navigating automatically

    if(window.confirm("Supprimer cette note ?")){
      await db.richNotes.delete(props.note.id);
      navigate("/");
    }
  };

  if(typeof props.note === "undefined"){ // new note
    saveNote = async () => {
      db.richNotes.add({
        content: rawContentState,
        created_at: new Date(),
        edited_at: null
      });
    };
  } else { // edit existing note
    deleteButton = 
    <a href="/" onClick={deleteNote} className="card-footer-item">
      <span className="icon">
        <i className="far fa-trash-alt"></i>
      </span>
      <span style={{ marginLeft: '10px' }}>Supprimer</span>
    </a>;

    initContent = props.note.content;

    saveNote = async () => {
      db.richNotes.update(props.note.id, {
        content: rawContentState,
        edited_at: new Date()
      });
    };
  }

  let [rawContentState, setRawContentState] = useState(initContent);

  const handleSave = async (event) => {
    event.preventDefault(); // prevent link from navigating automatically

    await saveNote();
    navigate("/");
  }

  const handleCancel = (event) => {
    event.preventDefault(); // prevent link from navigating automatically

    window.history.back();
  };

  return (
    <div className="card">
      <Editor onContentStateChange={setRawContentState} defaultContentState={initContent} />
      <footer className="card-footer">
        {/* Use <a/> instead of <button/> for the beautiful style of bulma.css to apply */}
        <a href="/" onClick={handleSave} className="card-footer-item">
          <span className="icon">
            <i className="fas fa-check"></i>
          </span>
          <span style={{ marginLeft: '10px' }}>Enregister</span>
        </a>
        {deleteButton}
        <a href="/" onClick={handleCancel} className="card-footer-item">
          <span className="icon">
            <i className="fas fa-backspace"></i>
          </span>
          <span style={{ marginLeft: '10px' }}>Annuler</span>
        </a>
      </footer>
    </div>
  );
}

export default RichEditor;