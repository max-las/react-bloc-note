import { useParams } from "react-router-dom";

import RichEditor from '../components/RichEditor.js';

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
        return db.richNotes.get(intId);
      }
    },
    [],
    "loading"
  );

  if(!note){
    return(
      <section className="section">
        <h2 className="title is-3">404: note introuvable</h2>
      </section>
    );
  }else{
    return(
      <section className="section">
        <h2 className="title is-3">Éditer une note</h2>
        {note !== "loading" ? <RichEditor note={note} /> : "Chargement de l'éditeur..." }
      </section>
    );
  }
}

export default Edit;
