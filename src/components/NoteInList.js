import { useNavigate } from "react-router-dom";

function NoteInList({note, id}) {
  let navigate = useNavigate();
  
  const formatDate = (dateStr) => {
    let date = new Date(dateStr);

    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).replace(", ", " à ");
  };

  return (
    <div className="box" onClick={() => {navigate("/edit/" + id)}}>
      <div className="block">
        <p>{note.text}</p>
      </div>
      <div className="block content is-small">
        <p className="has-text-grey-light">Créée {formatDate(note.created_at)} - Modifiée {formatDate(note.edited_at)}</p>
      </div>
    </div>
  );
}

export default NoteInList;