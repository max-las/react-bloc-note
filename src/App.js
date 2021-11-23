import './App.css';
import 'bulma/css/bulma.min.css';

import { Link } from "react-router-dom";

import Note from './components/Note.js';

function App() {
  return (
    <div className="App">
      <h1 className="title">
        Bloc-notes
      </h1>

      <Note />

      <Link to="/new" className="button">Nouvelle note</Link>
      <Link to="/edit/1" className="button" style={{ marginLeft: '10px' }}>Éditer la note 1</Link>
    </div>
  );
}

export default App;
