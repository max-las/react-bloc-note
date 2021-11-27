import RichEditor from "../components/RichEditor.js";

function New(){
  document.title = "Nouvelle note | SuperNotes";

  return(
    <div className="block">
      <h2 className="title is-4">Nouvelle note</h2>
      <RichEditor />
    </div>
  );
}

export default New;
