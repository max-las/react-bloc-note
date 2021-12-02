function SessionAdapter(){
  let nextId = 0;
  let notes = [];

  let notesJSON = sessionStorage.getItem("notes");
  if(notesJSON !== null){
    notes = JSON.parse(notesJSON); 
  }

  let nextIdStored = sessionStorage.getItem("nextId");
  if(nextIdStored !== null){
    nextId = parseInt(nextIdStored); 
  }

  const saveSession = () => {
    sessionStorage.setItem("notes", JSON.stringify(notes));
    sessionStorage.setItem("nextId", nextId.toString());
  }

  this.add = async (newNote) => {
    notes.forEach((note) => {
      note.order += 1;
    });
    newNote.id = nextId;
    nextId += 1;
    newNote.order = 0;
    notes.push(newNote);

    saveSession();

    return true;
  };

  this.update = async (id, changes) => {
    notes.forEach((note) => {
      if(note.id === id){
        Object.assign(note, changes);
      }
    });

    saveSession();

    return true;
  };

  this.modify = async (fn) => {
    notes.forEach(fn);

    saveSession();

    return true;
  };

  this.delete = async (id) => {
    let index = notes.findIndex((note) => {
      return note.id === id;
    });
    notes.splice(index, 1);

    saveSession();

    return true;
  };

  this.clear = async () => {
    notes.splice(0, notes.length);

    saveSession();

    return true;
  }

  this.getOne = async (id) => {
    const note = notes.find((note) => {
      return note.id === id;
    });
    if(!note){
      return false;
    }else{
      return note;
    }
  };

  this.getAll = async () => {
    notes.sort((a, b) => {
      return a.order - b.order;
    });

    return notes;
  };
}

export default SessionAdapter;