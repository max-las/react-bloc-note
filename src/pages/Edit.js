import { useParams } from "react-router-dom";

import RichEditor from '../components/RichEditor.js';

import { db } from "../db.js";
import { useLiveQuery } from "dexie-react-hooks";

function Edit(){
  const {id} = useParams();

  document.title = `Note n°${id} | SuperNotes`;

  const note = useLiveQuery(
    () => {
      const intId = parseInt(id);
      if(isNaN(intId)){
        return undefined;
      }else{
        return db.richNotes.get(intId);
      }
    },
    [],
    "loading"
  );

  if(!note){
    return(
      <div className="block">
        <h2 className="title is-4">404: note introuvable</h2>
      </div>
    );
  }else{
    return(
      <div className="block">
        <h2 className="title is-4">Éditer une note</h2>
        {note !== "loading" ? <RichEditor note={note} /> : "Chargement de l'éditeur..." }
      </div>
    );
  }
}

export default Edit;
