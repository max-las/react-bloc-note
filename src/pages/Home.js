import { useAsync } from "react-async";

import NoteList from "../components/NoteList.js";

function Home({adapter}) {
  document.title = "SuperNotes";

  // notesFromDB will be undefined until notes are loaded from the DB
  let {data: notesFromDB} = useAsync({
    promiseFn: adapter.getAll
  });

  if(notesFromDB){
    return (
      <NoteList notesFromProps={notesFromDB} adapter={adapter} />
    );
  }else{
    return (
      <div className="block">
        Chargement de la liste...
      </div>
    )
  }

}

export default Home;
