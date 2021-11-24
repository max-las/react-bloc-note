import { Link } from "react-router-dom";
import { useState } from "react";

import NoteInList from "../components/NoteInList.js";

function Home() {
  let initNotes;
  let storedNotes = localStorage.getItem("notes");

  if(storedNotes === null){
    initNotes = [];
  } else {
    initNotes = JSON.parse(storedNotes);
  }
  let [notes, setNotes] = useState(initNotes);

  const clearAll = () => {
    localStorage.clear();
    setNotes([]);
    console.log("All clear.");
  }

  return (
    <div className="container">
      <h1 className="title">
        Bloc-notes
      </h1>

      {notes.map((note, i) => {
        return (
          <NoteInList key={i} id={i} note={note} />
        );
      })}

      <Link to="/new" className="button">Nouvelle note</Link>
      <button className="button" onClick={clearAll} style={{ marginLeft: '10px' }}>Tout effacer</button>
    </div>
  );
}

export default Home;
