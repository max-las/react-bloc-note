import { useNavigate } from "react-router-dom";

function NoteInList({note, id}) {
  let navigate = useNavigate();
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).replace(", ", " à ");
  };

  let history = "Créée " + formatDate(note.created_at);

  if(note.edited_at !== null){
    history += " - Modifiée " + formatDate(note.edited_at);
  }

  return (
    <div className="box" onClick={() => {navigate("/edit/" + id)}}>
      <div className="block">
        <p>{note.text}</p>
      </div>
      <div className="block content is-small">
        <p className="has-text-grey-light">{history}</p>
      </div>
    </div>
  );
}

export default NoteInList;