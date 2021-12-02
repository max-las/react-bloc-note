import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ReactQuill from 'react-quill';

import BoardInList from "./BoardInList.js";

function RichEditor({ loadedNote, adapter, boardId, canMove }) {
  let navigate = useNavigate();

  let saveNote = async () => {};

  // default for new note
  let initContent = null;
  let deleteButton = null;
  let moveButton = null;

  let [modalContent, setModalContent] = useState(null);

  const closeModal = () => {
    setModalContent(null);
  }

  const deleteNote = async () => {
    if(window.confirm("Supprimer cette note ?")){
      await adapter.deleteNote(loadedNote.id);
      navigate(`/board/${loadedNote.board_id}`);
    }
  };

  const moveNote = async () => {
    let boards = await adapter.getBoards();
    let map = boards.map((board) => {
      if(board.id !== loadedNote.board_id){
        return (
          <BoardInList key={board.id} board={board} click={() => {moveNoteTo(board.id)}} />
        );
      }
      return(null);
    });
    setModalContent(
      <div>
        <h1 className="title has-text-white">Déplacer vers quel tableau ?</h1>
        {map}
      </div>
    );
  }

  const moveNoteTo = async (boardId) => {
    await adapter.moveNoteToBoard(loadedNote.id, boardId);
    navigate(`/board/${boardId}`);
  }

  if(typeof loadedNote === "undefined"){ // new note
    saveNote = async () => {
      if(quillContent){
        await adapter.addNote(boardId, {
          content: quillContent,
          created_at: new Date(),
          edited_at: null
        });
        navigate(`/board/${boardId}`);
      }else{
        handleCancel();
      }
    };
  } else { // edit existing note
    deleteButton = 
    <button onClick={deleteNote} className="button is-link is-outlined" style={{ marginRight: "10px", marginTop: "10px" }}>
      <span className="icon">
        <i className="far fa-trash-alt"></i>
      </span>
      <span>Supprimer</span>
    </button>;

    if(canMove){
      moveButton =
      <button className="button is-link is-outlined" onClick={moveNote} style={{ marginRight: "10px", marginTop: "10px" }}>
        <span className="icon">
          <i className="fas fa-sign-out-alt"></i>
        </span>
        <span>Déplacer vers...</span>
      </button>
    }

    initContent = loadedNote.content;

    saveNote = async () => {
      if(quillContent){
        await adapter.updateNote(loadedNote.id, {
          content: quillContent,
          edited_at: new Date()
        });
        navigate(`/board/${loadedNote.board_id}`);
      }else{
        deleteNote();
      }
    };
  }

  let [quillContent, setQuillContent] = useState(initContent);

  const handleSave = async () => {
    await saveNote();
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleQuillChange = (content, delta, source, editor) => {
    if(editor.getLength() === 1){
      setQuillContent(null);
    }else{
      setQuillContent(editor.getContents());
    }
  };

  return (
    <div>
      <div className="block">
        <div className="box">
          <ReactQuill
            theme="snow"
            placeholder="À quoi pensez-vous ?"
            defaultValue={initContent}
            onChange={handleQuillChange}
            preserveWhitespace
            modules={{
              toolbar: [
                [{ 'font': [] }, { 'size': [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'align': [] }],
                ['link', 'image']
              ]
            }}
          />
        </div>
      </div>
      <div className="block">
        <button onClick={handleSave} className="button is-link is-outlined" style={{ marginRight: "10px", marginTop: "10px" }}>
          <span className="icon">
            <i className="fas fa-check"></i>
          </span>
          <span>Enregister</span>
        </button>

        <button onClick={handleCancel} className="button is-link is-outlined" style={{ marginRight: "10px", marginTop: "10px" }}>
          <span className="icon">
            <i className="fas fa-backspace"></i>
          </span>
          <span>Annuler</span>
        </button>

        {moveButton}

        {deleteButton}
      </div>

      <div className={`modal ${modalContent !== null ? "is-active" : ""}`}>
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-content">
          <div className="p-4">
            {modalContent}
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
      </div>
    </div>
  );
}

export default RichEditor;