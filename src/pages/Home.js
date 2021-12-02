import { useAsync } from "react-async";

import BoardList from "../components/BoardList.js";

function Home({adapter}) {
  document.title = "SuperNotes";

  let {data: boardsFromDB} = useAsync({
    promiseFn: adapter.getBoards
  });

  if(boardsFromDB){
    return (
      <BoardList boardsFromProps={boardsFromDB} adapter={adapter} />
    );
  }else{
    return (
      <div className="block">
        Chargement des tableaux...
      </div>
    )
  }

}

export default Home;
