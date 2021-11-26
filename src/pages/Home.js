import { Link } from "react-router-dom";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db.js";

import RichNoteInList from "../components/RichNoteInList.js";

function Home() {
  document.title = "SuperNotes";

  const notes = useLiveQuery(
    () => db.richNotes.toArray()
  );

  const clearAll = () => {
    if(notes){
      if(notes.length > 0){
        if(window.confirm("Ceci effacera toutes vos notes. Êtes-vous sûr ?")){
          db.richNotes.clear();
        }
      }
    }
  }

  return (
    <div className="block">
      <div className="block">
        <Link to="/new" className="button is-link is-outlined">
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
          <span>Nouvelle note</span>
        </Link>
        <button className="button is-link is-outlined" onClick={clearAll} style={{ marginLeft: '10px' }}>
          <span className="icon">
            <i className="fas fa-broom"></i>
          </span>
          <span>Tout effacer</span>
        </button>
      </div>

      {notes?.map((note) => {
        return (
          <RichNoteInList key={note.id} note={note} />
        );
      })}
    </div>
  );
}

export default Home;
