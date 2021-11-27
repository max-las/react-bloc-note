import Dexie from "dexie";

export const db = new Dexie("notepad-db");
db.version(4).stores({
  richNotes: "++id, order, content, created_at, edited_at"
});