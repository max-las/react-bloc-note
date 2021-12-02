import { useNavigate } from "react-router-dom";

function BoardInList({board}) {
  let navigate = useNavigate();

  return (
    <div className="box InSortableList" onClick={() => {navigate("/board/" + board.id)}}>
      <div className="block">
        <strong>{board.name}</strong>
      </div>
      <div className="block content is-small">
        <p className="has-text-grey-light">Contient {board.note_ids.length} notes</p>
      </div>
    </div>
  );
}

export default BoardInList;