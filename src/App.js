import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useAsync } from "react-async";

import Home from './pages/Home.js';
import Board from './pages/Board.js';
import NewBoard from './pages/NewBoard.js';
import NewNote from './pages/NewNote.js';
import Edit from './pages/Edit.js';
import IndexedDBAdapter from "./adapters/IndexedDBAdapter.js";
import SessionAdapter from "./adapters/SessionAdapter.js";

import 'bulma/css/bulma.min.css';
import 'react-quill/dist/quill.snow.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

const checkIndexedDB = async () => {
  return new Promise((resolve, reject) => {
    let testDB = indexedDB.open("test");
    testDB.onerror = () => {
      resolve(false)
    };
    testDB.onsuccess = () => {
      resolve(true)
    };
  });
}

function App() {
  let {data: indexedDBEnabled} = useAsync({
    promiseFn: checkIndexedDB
  });

  let adapter = null;

  if(indexedDBEnabled === true){
    adapter = new IndexedDBAdapter();
  } else if(indexedDBEnabled === false) {
    adapter = new SessionAdapter();
  }

  if(adapter){
    return (
      <div className="container p-4">
        <BrowserRouter>
          <h1 className="title is-2" style={{fontFamily: "Gecko Lunch"}}>
            <Link to="/" className="titleLink">SuperNotes</Link>
          </h1>
          
          <Routes>
            <Route path="/" element={<Home adapter={adapter} />} />
            <Route path="board/new" element={<NewBoard adapter={adapter} />} />
            <Route path="board/:id" element={<Board adapter={adapter} />} />
            <Route path="board/:id/new" element={<NewNote adapter={adapter} />} />
            <Route path="edit/:id" element={<Edit adapter={adapter} />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }else{
    return (
      <p>Chargement...</p>
    );
  }

}

export default App;