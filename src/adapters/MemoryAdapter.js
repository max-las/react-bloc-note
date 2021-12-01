function MemoryAdapter(){
  let nextId = 0;
  let notes = [];

  this.add = async (newNote) => {
    notes.forEach((note) => {
      note.order += 1;
    });
    newNote.id = nextId;
    newNote.order = 0;
    notes.push(newNote);

    return true;
  };

  this.update = async (id, changes) => {
    notes.forEach((note) => {
      if(note.id === id){
        Object.assign(note, changes);
      }
    });

    return true;
  };

  this.modify = async (fn) => {
    notes.forEach(fn);

    return true;
  };

  this.delete = async (id) => {
    let index = notes.findIndex((note) => {
      return note.id === id;
    });
    notes.splice(index, 1);

    return true;
  };

  this.clear = async () => {
    notes.splice(0, notes.length);
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

export default MemoryAdapter;