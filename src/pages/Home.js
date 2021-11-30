import { useEffect, useState } from "react";

import { useAsync } from "react-async";

import { db } from "../db.js";

import NoteList from "../components/NoteList.js";

// Async function that loads notes from DB. To be used with useAsync() hook
const loadNotes = async () => {
  let notes = await db.richNotes.toCollection().sortBy("order");
  return notes;
}

function Home() {
  document.title = "SuperNotes";

  // notesFromDB will be undefined until notes are loaded from the DB
  let {data: notesFromDB} = useAsync({
    promiseFn: loadNotes
  });

  if(notesFromDB){
    return (
      <NoteList notesFromProps={notesFromDB} />
    );
  }else{
    return (
      <div className="block">
        Chargement de la liste...
      </div>
    )
  }

}

export default Home;
