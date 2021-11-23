import { useParams } from "react-router-dom";

function Edit(){
  let {id} = useParams();
  
  return(
    <p>Edit {id}</p>
  );
}

export default Edit;
