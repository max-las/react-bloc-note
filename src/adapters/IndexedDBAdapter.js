import Dexie from "dexie";

function IndexedDBAdapter(){
  const db = new Dexie("notepad-db");
  db.version(4).stores({
    richNotes: "++id, order, content, created_at, edited_at"
  });

  this.add = async (newNote) => {
    await db.richNotes.toCollection().modify((note) => {
      note.order += 1;
    });
    newNote.order = 0;
    await db.richNotes.add(newNote);

    return true;
  };

  this.update = async (id, changes) => {
    await db.richNotes.update(id, changes);

    return true;
  };

  this.modify = async (fn) => {
    await db.richNotes.toCollection().modify(fn);

    return true;
  };

  this.delete = async (id) => {
    await db.richNotes.delete(id);

    return true;
  };

  this.clear = async () => {
    await db.richNotes.clear();

    return true;
  };

  this.getOne = async (id) => {
    console.log(typeof id);
    let note = await db.richNotes.get(id);
    console.log(note);
    if(!note){
      console.log("return false");
      return false;
    }else{
      console.log("return note");
      return note;
    }
  };

  this.getAll = async () => {
    const notes = await db.richNotes.toCollection().sortBy("order");

    return notes;
  };
}

export default IndexedDBAdapter;