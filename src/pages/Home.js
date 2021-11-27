import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAsync } from "react-async";

import { ReactSortable } from "react-sortablejs";

import { db } from "../db.js";

import RichNoteInList from "../components/RichNoteInList.js";

// Async function that loads notes from DB. To be used with useAsync() hook
const loadNotes = async () => {
  let notes = await db.richNotes.toCollection().sortBy("order");
  return notes;
}

function Home() {
  document.title = "SuperNotes";

  // notesFromDB will be undefined until notes are loaded from the DB
  let {data: notesFromDB} = useAsync({
    promiseFn: loadNotes
  });

  // ReactSortable component requires a variable bound to a useState hook
  // So can't use notesFromDB directly, because it's bound to a useAsync hook 
  let [notesFromState, setNotesFromState] = useState(undefined);

  // When notesFromDB changes (i.e. when notes are loaded), reflect its value (the notes) into notesFromState
  useEffect(() => {
    setNotesFromState(notesFromDB)
  }, [notesFromDB]);

  // When notesFromState changes (i.e. when list is reordered), reflect the list order into the DB
  useEffect(() => {
    if(notesFromState){
      // build an object that maps notes ids to their current order
      let idToOrder = {};
      for(let i = 0; i < notesFromState.length; i++){
        idToOrder[notesFromState[i].id.toString()] = i;
      }
  
      // use the object to set each note order in the DB
      db.richNotes.toCollection().modify((note) => {
        note.order = idToOrder[note.id.toString()];
      });
    }
  }, [notesFromState]);

  const clearAll = () => {
    if(notesFromDB){
      if(notesFromDB.length > 0){
        if(window.confirm("Ceci effacera toutes vos notes. Êtes-vous sûr ?")){
          db.richNotes.clear();
          setNotesFromState([]);
        }
      }
    }
  }

  let map = null;
  let sortable = null;
  if(notesFromState){
    map = notesFromState.map((note) => {
      return (
        <RichNoteInList key={note.id} note={note} />
      );
    });
    sortable = 
    <ReactSortable list={notesFromState} setList={setNotesFromState} animation={200}>
      {map}
    </ReactSortable>;
  }

  return (
    <div className="block">
      <div className="block">
        <Link to="/new" className="button is-link is-outlined" style={{ marginRight: "10px", marginTop: "10px" }}>
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
          <span>Nouvelle note</span>
        </Link>
        <button className="button is-link is-outlined" onClick={clearAll} style={{ marginRight: "10px", marginTop: "10px" }}>
          <span className="icon">
            <i className="fas fa-broom"></i>
          </span>
          <span>Tout effacer</span>
        </button>
      </div>

      {sortable}
    </div>
  );
}

export default Home;
