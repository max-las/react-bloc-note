import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../db.js";

import ReactQuill from 'react-quill';

function RichEditor(props) {
  let navigate = useNavigate();

  let saveNote = async () => {};

  // default for new note
  let initContent = null;

  let deleteButton = null;

  const deleteNote = async () => {
    if(window.confirm("Supprimer cette note ?")){
      await db.richNotes.delete(props.note.id);
      navigate("/");
    }
  };

  if(typeof props.note === "undefined"){ // new note
    saveNote = async () => {
      if(quillContent){
        await db.richNotes.toCollection().modify((note) => {
          note.order += 1;
        });
        await db.richNotes.add({
          content: quillContent,
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
      if(quillContent){
        db.richNotes.update(props.note.id, {
          content: quillContent,
          edited_at: new Date()
        });
        navigate("/");
      }else{
        deleteNote();
      }
    };
  }

  let [quillContent, setQuillContent] = useState(initContent);

  const handleSave = async () => {
    await saveNote();
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleQuillChange = (content, delta, source, editor) => {
    if(editor.getLength() === 1){
      setQuillContent(null);
    }else{
      setQuillContent(editor.getContents());
    }
  };

  return (
    <div>
      <div className="block">
        <div className="box">
          <ReactQuill
            theme="snow"
            placeholder="À quoi pensez-vous ?"
            defaultValue={initContent}
            onChange={handleQuillChange}
            preserveWhitespace
            modules={{
              toolbar: [
                [{ 'font': [] }, { 'size': [] }],
                [{ 'color': [] }, { 'background': [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'align': [] }],
                ['link', 'image']
              ]
            }}
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