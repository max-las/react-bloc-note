import { useParams } from "react-router-dom";

import NoteEditor from '../components/NoteEditor.js';

import { db } from "../db.js";
import { useLiveQuery } from "dexie-react-hooks";

function Edit(){
  const {id} = useParams();

  const note = useLiveQuery(
    () => {
      const intId = parseInt(id);
      if(isNaN(intId)){
        return undefined;
      }else{
        return db.notes.get(intId);
      }
    },
    [],
    "loading"
  );

  if(!note){
    return(
      <div className="container">
        <h1 className="title">404: Note non trouvée</h1>
      </div>
    );
  }else{
    return(
      <div className="container">
        <h1 className="title">Éditer une note</h1>
        {note !== "loading" ? <NoteEditor note={note} /> : "Chargement de l'éditeur..." }
      </div>
    );
  }
}

export default Edit;
