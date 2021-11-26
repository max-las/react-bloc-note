import RichEditor from "../components/RichEditor.js";

function New(){
  document.title = "Nouvelle note | SuperNotes";

  return(
    <section className="section">
      <h2 className="title is-3">Nouvelle note</h2>
      <RichEditor />
    </section>
  );
}

export default New;
