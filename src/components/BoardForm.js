import { useState } from "react";
import { useNavigate } from "react-router";

function BoardForm({adapter}){
  const navigate = useNavigate();

  let [name, setName] = useState("");

  const createBoard = async () => {
    if(name.length > 0){
      await adapter.createBoard(name);
      navigate("/");
    }else{
      if(window.confirm("Annuler la création de ce tableau ?")){
        handleCancel();
      }
    }
  }

  const handleCancel = () => {
    window.history.back();
  }

  return (
    <div className="block">
      <div className="block">
        <label class="label">Nom du tableau</label>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>
      <button className="button is-link is-outlined" onClick={createBoard} style={{ marginRight: "10px", marginTop: "10px" }}>
        <span className="icon">
          <i className="fas fa-check"></i>
        </span>
        <span>Créer le tableau</span>
      </button>
      <button className="button is-link is-outlined" onClick={handleCancel} style={{ marginRight: "10px", marginTop: "10px" }}>
        <span className="icon">
          <i className="fas fa-backspace"></i>
        </span>
        <span>Annuler</span>
      </button>
    </div>
  )
}

export default BoardForm;