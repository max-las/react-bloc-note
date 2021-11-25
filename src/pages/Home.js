import { Link } from "react-router-dom";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db.js";

import NoteInList from "../components/NoteInList.js";

function Home() {
  const notes = useLiveQuery(
    () => db.notes.toArray()
  );

  const clearAll = () => {
    db.notes.clear();
  }

  return (
    <div className="container">
      <h1 className="title">
        Bloc-notes
      </h1>

      {notes?.map((note) => {
        return (
          <NoteInList key={note.id} note={note} />
        );
      })}

      <Link to="/new" className="button">Nouvelle note</Link>
      <button className="button" onClick={clearAll} style={{ marginLeft: '10px' }}>Tout effacer</button>
    </div>
  );
}

export default Home;
