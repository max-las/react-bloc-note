import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../db.js";

import { ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

function RichEditor(props) {
  let navigate = useNavigate();

  let saveNote = async () => {};

  // default for new note
  let initContent = convertToRaw(ContentState.createFromText(""));
  let deleteButton = null;

  const deleteNote = async () => {
    if(window.confirm("Supprimer cette note ?")){
      await db.richNotes.delete(props.note.id);
      navigate("/");
    }
  };

  if(typeof props.note === "undefined"){ // new note
    saveNote = async () => {
      const contentState = convertFromRaw(rawContentState);
      if(contentState.hasText()){
        await db.richNotes.toCollection().modify((note) => {
          note.order += 1;
        });
        await db.richNotes.add({
          content: rawContentState,
          order: 0,
          created_at: new Date(),
          edited_at: null
        });
        navigate("/");
      }else{
        handleCancel();
      }
    };
  } else { // edit existing note
    deleteButton = 
    <button onClick={deleteNote} className="button is-link is-outlined" style={{ marginRight: "10px", marginTop: "10px" }}>
      <span className="icon">
        <i className="far fa-trash-alt"></i>
      </span>
      <span>Supprimer</span>
    </button>;

    initContent = props.note.content;

    saveNote = async () => {
      const contentState = convertFromRaw(rawContentState);
      if(contentState.hasText()){
        db.richNotes.update(props.note.id, {
          content: rawContentState,
          edited_at: new Date()
        });
        navigate("/");
      }else{
        deleteNote();
      }
    };
  }

  let [rawContentState, setRawContentState] = useState(initContent);

  const handleSave = async () => {
    await saveNote();
  }

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div>
      <div className="block">
        <div className="box">
          <Editor 
            onContentStateChange={setRawContentState}
            defaultContentState={initContent}
            placeholder="À quoi pensez-vous ?"
            editorStyle={{minHeight: "200px"}}
          />
        </div>
      </div>
      <div className="block">
        <button onClick={handleSave} className="button is-link is-outlined" style={{ marginRight: "10px", marginTop: "10px" }}>
          <span className="icon">
            <i className="fas fa-check"></i>
          </span>
          <span>Enregister</span>
        </button>

        <button onClick={handleCancel} className="button is-link is-outlined" style={{ marginRight: "10px", marginTop: "10px" }}>
          <span className="icon">
            <i className="fas fa-backspace"></i>
          </span>
          <span>Annuler</span>
        </button>

        {deleteButton}
      </div>
    </div>
  );
}

export default RichEditor;