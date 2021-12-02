import { useNavigate } from "react-router-dom";

import ReactQuill from 'react-quill';

import BoardInList from "./BoardInList.js";

function RichNoteInList({note, activateModal, closeModal, removeNoteFromState, adapter}) {
  let navigate = useNavigate();
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).replace(", ", " à ");
  };

  const moveNote = async () => {
    let boards = await adapter.getBoards();
    let map = boards.map((board) => {
      if(board.id !== note.board_id){
        return (
          <BoardInList key={board.id} board={board} click={() => {moveNoteTo(board.id)}} />
        );
      }
      return(null);
    });
    activateModal(
      <div>
        <h1 className="title has-text-white">Déplacer vers quel tableau ?</h1>
        {map}
      </div>
    );
  }

  const moveNoteTo = async (boardId) => {
    await adapter.moveNoteToBoard(note.id, boardId);
    removeNoteFromState(note.id);
    closeModal();
  }

  let history = "Créée " + formatDate(note.created_at);

  if(note.edited_at !== null){
    history += " - Modifiée " + formatDate(note.edited_at);
  }

  return (
    <div className="box InSortableList">
      <div className="block" onClick={() => {navigate("/edit/" + note.id)}}>
        <ReactQuill
          theme="snow"
          defaultValue={note.content}
          readOnly
          modules={{
            toolbar: false
          }}
        />
      </div>
      <div className="block content is-small">
        <div className="level">
          <div className="level-left">
            <p className="level-item has-text-grey-light">{history}</p>
          </div>
          <div className="level-right">
            <button className="level-item button is-link is-outlined" onClick={moveNote} >
              <span className="icon">
                <i className="fas fa-sign-out-alt"></i>
              </span>
              <span>Déplacer vers...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RichNoteInList;