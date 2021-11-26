import Dexie from "dexie";

export const db = new Dexie("notepad-db");
db.version(3).stores({
  richNotes: "++id, content, created_at, edited_at"
});