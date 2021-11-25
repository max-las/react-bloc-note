import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NoteEditor(props) {
  let navigate = useNavigate();

  let notes = localStorage.getItem("notes");
  if(notes === null){
    notes = [];
  }else{
    notes = JSON.parse(notes);
  }

  let validId = true;
  let initText = "";

  let saveNote = () => {};

  let deleteButton = null;

  const deleteNote = () => {
    notes.splice(props.which, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    navigate("/");
  };

  if(typeof props.which === "undefined"){
    saveNote = () => {
      let now = new Date();

      let note = {
        text: text,
        created_at: now,
        edited_at: null
      }
      notes.push(note);
    };
  } else {
    validId = typeof notes[props.which] !== "undefined";

    if(validId){
      deleteButton = <a href="/" onClick={deleteNote} className="card-footer-item">Supprimer</a>;

      initText = notes[props.which].text;

      saveNote = () => {
        let now = new Date();

        notes[props.which].text = text;
        notes[props.which].edited_at = now;
      };
    }
  }

  let [text, setText] = useState(initText);

  const handleSave = (event) => {
    event.preventDefault();

    saveNote();
    localStorage.setItem("notes", JSON.stringify(notes));
    navigate("/");
  }

  const handleCancel = (event) => {
    event.preventDefault();

    window.history.back();
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  if(validId){
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
  }else{
    return (
      <h2 className="subtitle">404: Note non trouvée.</h2>
    );
  }
}

export default NoteEditor;