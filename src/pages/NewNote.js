import { useParams } from "react-router-dom";
import { useAsync } from "react-async";

import RichEditor from "../components/RichEditor.js";

const loadBoard = async ({id, adapter}) => {
  let board = await adapter.getBoard(id);
  return board;
}

function NewNote({adapter}){
  let {id: boardId} = useParams();
  boardId = parseInt(boardId);

  if(isNaN(boardId)){
    boardId = -1;
  }

  const {data: board} = useAsync({
    promiseFn: loadBoard,
    id: boardId,
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
    document.title = `Nouvelle note | SuperNotes`;
  
    return(
      <div className="block">
        <h2 className="title is-4">Nouvelle note</h2>
        {board ? <RichEditor adapter={adapter} boardId={board.id} /> : "Chargement..."}
      </div>
    );
  }
}

export default NewNote;
