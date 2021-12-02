function SessionAdapter(){
  let nextNoteId = 0;
  let nextBoardId = 0;
  let notes = [];
  let boards = [];

  let notesJSON = sessionStorage.getItem("notes");
  if(notesJSON !== null){
    notes = JSON.parse(notesJSON); 
  }

  let boardsJSON = sessionStorage.getItem("boards");
  if(boardsJSON !== null){
    boards = JSON.parse(boardsJSON); 
  }

  let nextNoteIdStored = sessionStorage.getItem("nextNoteId");
  if(nextNoteIdStored !== null){
    nextNoteId = parseInt(nextNoteIdStored); 
  }

  let nextBoardIdStored = sessionStorage.getItem("nextBoardId");
  if(nextBoardIdStored !== null){
    nextBoardId = parseInt(nextBoardIdStored); 
  }

  const saveSession = () => {
    sessionStorage.setItem("notes", JSON.stringify(notes));
    sessionStorage.setItem("boards", JSON.stringify(boards));
    sessionStorage.setItem("nextNoteId", nextNoteId.toString());
    sessionStorage.setItem("nextBoardId", nextBoardId.toString());
  }

  this.addNote = async (boardId, newNote) => {
    notes.forEach((note) => {
      if(note.board_id === boardId){
        note.order += 1;
      }
    });
    newNote.id = nextNoteId;
    nextNoteId += 1;
    newNote.order = 0;
    newNote.board_id = boardId;
    notes.push(newNote);

    let index = boards.findIndex((board) => {
      return board.id === boardId;
    });
    boards[index].note_ids.push(newNote.id);

    saveSession();
    return true;
  };

  this.updateNote = async (id, changes) => {
    notes.forEach((note) => {
      if(note.id === id){
        Object.assign(note, changes);
      }
    });

    saveSession();
    return true;
  };

  this.modifyNote = async (fn) => {
    notes.forEach(fn);

    saveSession();
    return true;
  };

  this.deleteNote = async (id) => {
    let noteIndex = notes.findIndex((note) => {
      return note.id === id;
    });

    let boardId = notes[noteIndex].boardId;
    let boardIndex = boards.findIndex((board) => {
      return board.id === boardId;
    });

    let noteBoardIndex = boards[boardIndex].note_ids.indexOf(id);

    notes.splice(noteIndex, 1);
    boards[boardIndex].note_ids.splice(noteBoardIndex, 1);

    saveSession();
    return true;
  };

  this.clearBoard = async (id) => {
    let boardIndex = boards.findIndex((board) => {
      return board.id === id;
    });
    boards[boardIndex].note_ids.splice(0, boards[boardIndex].note_ids.length);

    let notesToRemove = [];
    notes.forEach((note, index) => {
      if(note.board_id === id){
        notesToRemove.push(index);
      }
    });
    notesToRemove.forEach((noteIndex) => {
      notes.splice(noteIndex, 1);
    });

    saveSession();
    return true;
  };

  this.getNote = async (id) => {
    const note = notes.find((note) => {
      return note.id === id;
    });
    if(!note){
      return false;
    }else{
      return note;
    }
  };

  this.getNotesFromBoard = async (id) => {
    let result = notes
      .filter((note) => {
        return note.board_id === id;
      })
      .sort((a, b) => {
        return a.order - b.order;
      });

    return result;
  };

  this.moveNoteToBoard = async (noteId, boardId) => {
    let noteIndex = notes.findIndex((note) => {
      return note.id === noteId;
    });
    let previousBoardIndex = boards.findIndex((board) => {
      return board.id === notes[noteIndex].board_id;
    });
    let nextBoardIndex = boards.findIndex((board) => {
      return board.id === boardId;
    });

    let noteBoardIndex = boards[previousBoardIndex].note_ids.indexOf(noteId);
    boards[previousBoardIndex].note_ids.splice(noteBoardIndex, 1);

    boards[nextBoardIndex].note_ids.push(noteId);

    notes[noteIndex].board_id = boardId;

    saveSession();
    return true;
  };

  this.createBoard = async (name) => {
    boards.forEach((board) => {
      board.order += 1;
    });
    boards.push({
      id: nextBoardId,
      name: name,
      order: 0,
      note_ids: []
    });
    nextBoardId += 1;

    saveSession();
    return true;
  };

  this.modifyBoard = async (fn) => {
    boards.forEach(fn);

    saveSession();
    return true;
  };

  this.updateBoard = async (id, changes) => {
    boards.forEach((board) => {
      if(board.id === id){
        Object.assign(board, changes);
      }
    });

    saveSession();
    return true;
  };

  this.getBoard = async (id) => {
    let board = boards.find((board) => {
      return board.id === id;
    });
    if(!board){
      return false;
    }else{
      return board;
    }
  };

  this.getBoards = async () => {
    boards.sort(function(a, b){
      return a.order - b.order;
    });

    return boards;
  };

  this.clearBoards = async () => {
    boards.splice(0, boards.length);
    notes.splice(0, notes.length);

    saveSession();
    return true;
  };

  this.deleteBoard = async (id) => {
    let notesToRemove = [];
    notes.forEach((note) => {
      if(note.board_id === id){
        notesToRemove.push(note.id);
      }
    });
    notesToRemove.forEach((noteIndex) => {
      notes.splice(noteIndex, 1);
    });

    let boardIndex = boards.find((board) => {
      return board.id === id;
    });
    boards.splice(boardIndex, 1);

    saveSession();
    return true;
  };
}

export default SessionAdapter;