import { useParams } from "react-router-dom";

import NoteEditor from '../components/NoteEditor.js';

function Edit(){
  let {id} = useParams();
  
  return(
    <div className="container">
      <h1 className="title">Éditer une note</h1>
      <NoteEditor mode="edit" which={id} />
    </div>
  );
}

export default Edit;
