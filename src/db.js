import Dexie from "dexie";

export const db = new Dexie("notepad-db");
db.version(1).stores({
  notes: "++id, text, created_at, edited_at"
});