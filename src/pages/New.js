import NoteEditor from '../components/NoteEditor.js';

function New(){
  return(
    <div className="container">
      <h1 className="title">Nouvelle note</h1>
      <NoteEditor />
    </div>
  );
}

export default New;