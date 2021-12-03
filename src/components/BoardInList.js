function BoardInList({board, click}) {
  return (
    <div className="box InSortableList BoardInList" onClick={click}>
      <div className="block">
        <strong style={{fontSize: "25px"}}>{board.name}</strong>
      </div>
      <div className="block content is-small">
        <p className="has-text-white-ter">Contient {board.note_ids.length} notes</p>
      </div>
    </div>
  );
}

export default BoardInList;