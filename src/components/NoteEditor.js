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

  if(typeof props.which === "undefined"){
    saveNote = () => {
      notes.push(text);
    };
  } else {
    validId = typeof notes[props.which] !== "undefined";

    if(validId){
      initText = notes[props.which];

      saveNote = () => {
        notes[props.which] = text;
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

  const handleCancel = () => {
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