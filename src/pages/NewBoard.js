import BoardForm from "../components/BoardForm.js";

function NewBoard({adapter}){

  return(
    <div className="block">
      <h2 className="title is-4">Nouveau Tableau</h2>
      <BoardForm adapter={adapter} />
    </div>
  );
}

export default NewBoard;
