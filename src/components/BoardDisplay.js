import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ReactSortable } from "react-sortablejs";

import RichNoteInList from "../components/RichNoteInList.js";

function BoardDisplay({ notesFromProps, boardId, adapter }){
  const navigate = useNavigate();

  let [notesFromState, setNotesFromState] = useState(notesFromProps);

  useEffect(() => {
    // build an object that maps notes ids to their current order
    let idToOrder = {};
    for(let i = 0; i < notesFromState.length; i++){
      idToOrder[notesFromState[i].id.toString()] = i;
    }

    // use the object to set each note order in the DB
    adapter.modifyNote((note) => {
      const order = idToOrder[note.id.toString()];
      if(order){
        note.order = order;
      }
    });
  }, [notesFromState, adapter]);

  const clearAll = () => {
    if(notesFromState){
      if(notesFromState.length > 0){
        if(window.confirm("Ceci effacera toutes vos notes. Êtes-vous sûr ?")){
          adapter.clearBoard(boardId);
          setNotesFromState([]);
        }
      }
    }
  }

  const deleteBoard = async () => {
    if(window.confirm("Supprimer ce tableau ?")){
      await adapter.deleteBoard(boardId);
      navigate("/");
    }
  }

  let sortableList =
  <div style={{textAlign: "center"}}>
    <img src="/img/69-eye-outline.gif" height="100" width="100" alt=""/>
    <p>Il n'y aucune note pour l'instant...</p>
  </div>

  if(notesFromState.length > 0){
    let map = notesFromState.map((note) => {
      return (
        <RichNoteInList key={note.id} note={note} />
      );
    });

    sortableList =
    <ReactSortable list={notesFromState} setList={setNotesFromState} animation={200} delay={100} delayOnTouchOnly={true} chosenClass="sortable-chosen">
      {map}
    </ReactSortable>
  }

  return (
    <div className="block">
      <div className="block">
        <Link to={`/board/${boardId}/new`} className="button is-link is-outlined" style={{ marginRight: "10px", marginTop: "10px" }}>
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
          <span>Nouvelle note</span>
        </Link>
        <button className="button is-link is-outlined" onClick={clearAll} style={{ marginRight: "10px", marginTop: "10px" }} disabled={notesFromState.length === 0}>
          <span className="icon">
            <i className="fas fa-broom"></i>
          </span>
          <span>Vider ce tableau</span>
        </button>
        <button className="button is-link is-outlined" onClick={deleteBoard} style={{ marginRight: "10px", marginTop: "10px" }}>
          <span className="icon">
            <i className="far fa-trash-alt"></i>
          </span>
          <span>Supprimer ce tableau</span>
        </button>
      </div>
      {sortableList}
    </div>
  );

}

export default BoardDisplay;