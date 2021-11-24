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

  let handleSave = () => {};

  let validId = true;
  let initText = "";

  if(props.mode === "new"){
    handleSave = (event) => {
      event.preventDefault();

      notes.push(text);
      localStorage.setItem("notes", JSON.stringify(notes));
      navigate("/");
    };
  } else if(props.mode === "edit"){
    validId = typeof notes[props.which] !== "undefined";

    if(validId){
      initText = notes[props.which];

      handleSave = (event) => {
        event.preventDefault();

        notes[props.which] = text;
        localStorage.setItem("notes", JSON.stringify(notes));
        navigate("/");
      };
    }
  }

  let [text, setText] = useState(initText);

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