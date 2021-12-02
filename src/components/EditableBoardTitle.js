import { useState } from "react";

function EditableBoardTitle({board, adapter}){
  let [canEdit, setCanEdit] = useState(false);
  let [boardName, setBoardName] = useState(board.name);

  const saveName = () => {
    if(boardName.length > 0){
      adapter.updateBoard(board.id, {
        name: boardName
      });
    }else{
      setBoardName(board.name);
    }
    setCanEdit(false);
  }

  if(canEdit){
    return(
      <input autoFocus className="input title is-4 has-text-primary" value={boardName} onChange={(event) => {setBoardName(event.target.value)}} onBlur={saveName} />
    )
  }else{
    return(
      <h2 className="title is-4 has-text-primary" onClick={() => {setCanEdit(true)}}>{boardName}</h2>
    )
  }
}

export default EditableBoardTitle;