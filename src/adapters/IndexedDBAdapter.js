import Dexie from "dexie";

function IndexedDBAdapter(){
  const db = new Dexie("notepad-db");
  db.version(5).stores({
    richNotes: "++id, board_id, order, content, created_at, edited_at",
    boards: "++id, name, order, note_ids"
  });

  this.addNote = async (boardId, newNote) => {
    await db.richNotes.where({board_id: boardId}).modify((note) => {
      note.order += 1;
    });
    newNote.order = 0;
    newNote.board_id = boardId;
    let noteId = await db.richNotes.add(newNote);
    await db.boards.where({id: boardId}).modify((board) => {
      board.note_ids.push(noteId);
    });

    return true;
  };

  this.updateNote = async (id, changes) => {
    await db.richNotes.update(id, changes);

    return true;
  };

  this.modifyNote = async (fn) => {
    await db.richNotes.toCollection().modify(fn);

    return true;
  };

  this.deleteNote = async (id) => {
    let note = await db.richNotes.get(id);
    await db.boards.where({id: note.board_id}).modify((board) => {
      let noteIdIndex = board.note_ids.indexOf(id);
      board.note_ids.splice(noteIdIndex, 1);
    });
    await db.richNotes.delete(id);

    return true;
  };

  this.clearBoard = async (id) => {
    await db.boards.where({id: id}).modify((board) => {
      board.note_ids.splice(0, board.note_ids.length);
    });
    await db.richNotes.where({board_id: id}).delete();

    return true;
  };

  this.getNote = async (id) => {
    let note = await db.richNotes.get(id);
    if(!note){
      return false;
    }else{
      return note;
    }
  };

  this.getNotesFromBoard = async (id) => {
    const notes = await db.richNotes.where({board_id: id}).sortBy("order");

    return notes;
  };

  this.moveNoteToBoard = async (noteId, boardId) => {
    let note = await db.richNotes.get(noteId);
    let previousBoard = await db.boards.get(note.board_id);

    await db.richNotes.where({board_id: boardId}).modify((note) => {
      note.order += 1;
    });

    await Promise.all([
      db.boards.where({id: previousBoard.id}).modify((board) => {
        let index = board.note_ids.indexOf(noteId);
        board.note_ids.splice(index, 1);
      }),
      db.boards.where({id: boardId}).modify((board) => {
        board.note_ids.push(noteId);
      }),
      db.richNotes.update(noteId, {
        board_id: boardId,
        order: 0
      })
    ]);

    return true;
  }

  this.createBoard = async (name) => {
    await db.boards.toCollection().modify((board) => {
      board.order += 1;
    });
    await db.boards.add({
      name: name,
      order: 0,
      note_ids: []
    });

    return true;
  };

  this.modifyBoard = async (fn) => {
    await db.boards.toCollection().modify(fn);

    return true;
  };

  this.updateBoard = async (id, changes) => {
    await db.boards.update(id, changes);

    return true;
  };

  this.getBoard = async (id) => {
    const board = await db.boards.get(id);
    if(!board){
      return false;
    }else{
      return board;
    }
  };

  this.getBoards = async () => {
    const boards = await db.boards.toCollection().sortBy("order");

    return boards;
  };

  this.clearBoards = async () => {
    await Promise.all([db.boards.clear(), db.richNotes.clear()]);

    return true;
  };

  this.deleteBoard = async (id) => {
    await Promise.all([db.boards.delete(id), db.richNotes.where({board_id: id}).delete()]);

    return true;
  };
}

export default IndexedDBAdapter;