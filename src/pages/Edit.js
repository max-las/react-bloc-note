import { useParams } from "react-router-dom";
import { useAsync } from "react-async";

import RichEditor from '../components/RichEditor.js';

const loadNote = async ({id, adapter}) => {
  let note = await adapter.getOne(id);
  return note;
}

function Edit({adapter}){
  let {id} = useParams();
  id = parseInt(id);

  if(isNaN(id)){
    id = -1;
  }

  const {data: note} = useAsync({
    promiseFn: loadNote,
    id: id,
    adapter: adapter
  });

  if(note === false){
    document.title = `Note introuvable | SuperNotes`;

    return(
      <div className="block">
        <h2 className="title is-4">404: note introuvable</h2>
      </div>
    );
  }else{
    document.title = `Note n°${id} | SuperNotes`;
  
    return(
      <div className="block">
        <h2 className="title is-4">Éditer une note</h2>
        {typeof note !== "undefined" ? <RichEditor loadedNote={note} adapter={adapter} /> : "Chargement de l'éditeur..." }
      </div>
    );
  }
}

export default Edit;
