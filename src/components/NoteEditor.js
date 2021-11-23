function NoteEditor() {
  return (
    <div className="card">
      <textarea className="textarea" placeholder="À quoi pensez-vous ?"></textarea>
      <footer className="card-footer">
        <a href="#" className="card-footer-item">Enregister</a>
        <a href="#" className="card-footer-item">Annuler</a>
      </footer>
    </div>
  );
}

export default NoteEditor;