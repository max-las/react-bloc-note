import { useParams } from "react-router-dom";
import { useAsync } from "react-async";

import NoteList from "../components/NoteList.js";

const loadBoard = async ({id, adapter}) => {
  let board = await adapter.getBoard(id);
  return board;
}

const loadNotes = async ({id, adapter}) => {
  let notes = await adapter.getNotesFromBoard(id);
  return notes;
}

function Board({adapter}){
  let {id} = useParams();
  id = parseInt(id);

  if(isNaN(id)){
    id = -1;
  }

  const {data: board} = useAsync({
    promiseFn: loadBoard,
    id: id,
    adapter: adapter
  });

  const {data: notes} = useAsync({
    promiseFn: loadNotes,
    id: id,
    adapter: adapter
  });

  if(board === false){
    document.title = `Tableau introuvable | SuperNotes`;

    return(
      <div className="block">
        <h2 className="title is-4">404: tableau introuvable</h2>
      </div>
    );
  }else{
    if(typeof board !== "undefined" && typeof notes !== "undefined"){
      document.title = `${board.name} | SuperNotes`;

      return(
        <div className="block">
          <h2 className="title is-4">{board.name}</h2>
          <NoteList notesFromProps={notes} adapter={adapter} boardId={board.id} />
        </div>
      );
    }else{
      return(
        <p>Chargement...</p>
      )
    }
  }
}

export default Board;
