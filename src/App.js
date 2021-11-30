import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home.js';
import New from './pages/New.js';
import Edit from './pages/Edit.js';

import 'bulma/css/bulma.min.css';
import 'react-quill/dist/quill.snow.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  return (
    <div className="container p-4">
      <h1 className="title is-2">- SuperNotes -</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="new" element={<New />} />
          <Route path="edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;