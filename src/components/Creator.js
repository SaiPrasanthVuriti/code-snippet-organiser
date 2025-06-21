
import Editor from "./Editor";
import { useEffect, useState } from "react";
import Createcard from "./Createcard";
import { readSingleData } from "../service/crud";

const Creator = ({allTagList,setAllTagList,edit,setEdit}) => { 
const [card,setcard]=useState(false);
const [code, setcode] = useState("");
const [ext, setext] = useState("cpp");
const [caution,setCaution]=useState(false);
const [editDoc,setEditDoc]=useState(null);
useEffect(()=>{
 const  handleEdit = async () =>{
   if (edit!==""){
  const Precode = await readSingleData(edit);
  setEditDoc(Precode);
  setcode(Precode.code);
}
 }
 handleEdit();
},[edit])
const handleCreate = () =>{
    if(code!==""){
     setcard(!card);}
     else{setCaution(true)};
  }

  return (
    <div>
       <button  className="btn-small"onClick={handleCreate}>{edit===""?"Save":"edit others"}</button>
       {caution&&code===""&&<p>must add some code</p>}
      {card&&(<Createcard code={code} ext={ext} setcard={setcard} setcode={setcode} allTagList={allTagList} setAllTagList={setAllTagList} setdocId={setEdit} setEditDoc={setEditDoc} editDoc={editDoc} docId={edit}
      />
        )}
      <select className="simple-dropdown"
        onChange={(e) => {
          setext(e.target.value);
        }}
      >
        <option value="cpp">C / C++</option>
        <option value="j">java</option>
        <option value="js">javascript</option>
        <option value="ts">typescript</option>
        <option value="p">python</option>
        <option value="h">HTML</option>
        <option value="c">CSS</option>
        <option value="m">Markdown</option>
        <option value="n">json</option>
        <option value="s">SQL</option>
      </select>
      <Editor code ={code} ext={ext} setcode={setcode}/>
      
    </div>
  );
};
export default Creator;
