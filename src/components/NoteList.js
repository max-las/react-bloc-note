import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ReactSortable } from "react-sortablejs";

import { db } from "../db.js";

import RichNoteInList from "../components/RichNoteInList.js";

function NoteList({ notesFromProps }){
  let [notesFromState, setNotesFromState] = useState(notesFromProps);

  useEffect(() => {
    // build an object that maps notes ids to their current order
    let idToOrder = {};
    for(let i = 0; i < notesFromState.length; i++){
      idToOrder[notesFromState[i].id.toString()] = i;
    }

    // use the object to set each note order in the DB
    db.richNotes.toCollection().modify((note) => {
      note.order = idToOrder[note.id.toString()];
    });
  }, [notesFromState]);

  const clearAll = () => {
    if(notesFromState){
      if(notesFromState.length > 0){
        if(window.confirm("Ceci effacera toutes vos notes. Êtes-vous sûr ?")){
          db.richNotes.clear();
          setNotesFromState([]);
        }
      }
    }
  }

  let map = notesFromState.map((note) => {
    return (
      <RichNoteInList key={note.id} note={note} />
    );
  });

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

      <ReactSortable list={notesFromState} setList={setNotesFromState} animation={200} delay={200} delayOnTouchOnly={true} >
        {map}
      </ReactSortable>
    </div>
  );

}

export default NoteList;