import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ReactSortable } from "react-sortablejs";

import BoardInList from "../components/BoardInList.js";

function BoardList({ boardsFromProps, adapter }){
  let navigate = useNavigate();

  let [boardsFromState, setBoardsFromState] = useState(boardsFromProps);

  useEffect(() => {
    // build an object that maps notes ids to their current order
    let idToOrder = {};
    for(let i = 0; i < boardsFromState.length; i++){
      idToOrder[boardsFromState[i].id.toString()] = i;
    }

    // use the object to set each note order in the DB
    adapter.modifyBoard((board) => {
      board.order = idToOrder[board.id.toString()];
    });
  }, [boardsFromState, adapter]);

  const clearAll = () => {
    if(boardsFromState){
      if(boardsFromState.length > 0){
        if(window.confirm("Ceci effacera tous vos tableaux. Êtes-vous sûr ?")){
          adapter.clearBoards();
          setBoardsFromState([]);
        }
      }
    }
  }

  let sortableList =
  <div style={{textAlign: "center"}}>
    <img src="/img/69-eye-outline.gif" height="100" width="100" alt=""/>
    <p>Il n'y aucun tableau pour l'instant...</p>
  </div>

  if(boardsFromState.length > 0){
    let map = boardsFromState.map((board) => {
      return (
        <BoardInList key={board.id} board={board} click={() => {navigate("/board/" + board.id)}} />
      );
    });

    sortableList =
    <ReactSortable list={boardsFromState} setList={setBoardsFromState} animation={200} delay={100} delayOnTouchOnly={true} chosenClass="sortable-chosen">
      {map}
    </ReactSortable>
  }

  return (
    <div className="block">
      <div className="block">
        <Link to="/board/new" className="button is-link is-outlined" style={{ marginRight: "10px", marginTop: "10px" }}>
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
          <span>Nouveau tableau</span>
        </Link>
        <button className="button is-link is-outlined" onClick={clearAll} style={{ marginRight: "10px", marginTop: "10px" }} disabled={boardsFromState.length === 0}>
          <span className="icon">
            <i className="fas fa-broom"></i>
          </span>
          <span>Tout effacer</span>
        </button>
      </div>
      {sortableList}
    </div>
  );

}

export default BoardList;