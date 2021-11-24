import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home.js';
import New from './pages/New.js';
import Edit from './pages/Edit.js';

import 'bulma/css/bulma.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="new" element={<New />} />
        <Route path="edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;