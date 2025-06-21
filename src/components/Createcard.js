
import { useEffect, useState } from "react";
import { auth } from "../service/config";
import { createData,addNewTag,updateData } from "../service/crud";


const Createcard = ({code,setcode,ext,setcard,allTagList,setAllTagList,editDoc,docId,setdocId,setEditDoc}) =>{
    
    const [title,settitle]=useState("");
    const [description,setdescription]=useState("");
    const [tags,settags]=useState([]);
    const [fav,setfav]=useState(false);
    const [viewAll,setViewAll]=useState(true);
    const [caution,setCaution] =useState(false);
    const [tagValue,setTagvalue] = useState("");
  
  useEffect(()=>{
    const initial = () =>{
      if(docId!==""){
      settags(editDoc.tag);
      setViewAll(editDoc.viewAll);
      settitle(editDoc.viewAll);
      setdescription(editDoc.description);
    }
    }
    initial();
  },[docId,editDoc])

  const suggestions = allTagList.filter((tag)=>{return tag.label.toLowerCase().includes(tagValue.toLowerCase())});

  const handleAddNewTag = async (label) => {
  const exists = allTagList.find(tag => tag.label === label.toLowerCase());
  if (exists) {settags(exists.label)};

  const newId = Math.max(...allTagList.map(t => t.id), 0) + 1;
  const newTag = { id: newId, label: label.toLowerCase() };

  await addNewTag( newId.toString(), newTag);
  setAllTagList(prev => [...prev, newTag]);
  settags(prev => [...prev, newTag]);
  setTagvalue("");
};

   const toggleTag = (label) => {
  settags(prev =>
    prev.includes(label) ? prev.filter(taglabel => taglabel !== label) : [...prev, label]
  );
};

const removeTag = (index) => {
         const updtaedTags = tags.filter((tag,i) => i!==index);
        settags(updtaedTags);
    }

    const handleSave = async () =>{
        if(title!==""){
           const snippet ={
            userid:auth.currentUser.uid,
            title:title,
            description:description,
            lang:ext,
            tag:tags,
            code:code,
            createTime: Date.now(),
            isFav:fav,
            inTrash:false,
            viewAll:viewAll
        }
            if(docId!==""){
                await updateData(docId,snippet);
                setdocId("");
                  setEditDoc(null);
                  settitle("");
                  setcode("");
                  setdescription("");
                  settags([]);
                  setfav(false);
                  setViewAll(true);
                
            } 
            else{
                  await createData(snippet);
                   console.log("done"); 
            } 
              setcard(false);
                   
        }
        else{setCaution(true)};
    }
    return (
        // <div>
        //     <div onClick={()=>{setfav(!fav)}}>fav</div>
        //     <div onClick={()=>{setcard(false)}}>x</div>
        //     <div onClick={()=>{setViewAll(!viewAll)}}>private</div>
        // <p>title :</p><input type="text" value={title} onChange={(e)=>{settitle(e.target.value); setCaution(false);}}/>
        // {caution && <p>must add title</p>}
        //  <p>description :</p><input type="text"  value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
        //  <input onChange={(e)=>{setTagvalue(e.target.value)}} type="text"/>
        // <div>
        //      {
        //      suggestions.map(tag => 
        //         (<label key ={tag.id}>
        //             <input 
        //             type="checkbox"
        //             checked={tags.includes(tag.label)}
        //             onChange={()=>{toggleTag(tag.label)}} 
        //             />
        //              {tag.label}
        //         </label>)
        //      )}
        // </div>
        //   <button onClick={()=>{handleAddNewTag()}}>add new tag</button>
        //   {(tags).map((tag,index) => (<div key={index}><p id={index}>{tag}</p><button onClick={()=>{removeTag(index)}}>x</button></div>))}
        //  <button onClick={()=>{handleSave()}}>save</button>
       
        // </div>
        <div className="edit-card-container">
  <div className="edit-card">
    <div className="edit-card-header">
      <div onClick={() => setfav(!fav)} className="fav-toggle"> {fav ? "⭐" : "☆"}</div>
      <div onClick={() => setcard(false)} className="close-btn">✖</div>
      <div onClick={() => setViewAll(!viewAll)} className="private-toggle">{viewAll ? "🔓" : "🔒"}</div>
    </div>

    <p>Title:</p>
    <input
      type="text"
      value={title}
      onChange={(e) => {
        settitle(e.target.value);
        setCaution(false);
      }}
      className="input-text"
    />
    {caution && <p className="caution-text">* Must add title</p>}

    <p>Description:</p>
    <input
      type="text"
      value={description}
      onChange={(e) => setdescription(e.target.value)}
      className="input-text"
    />

    <p>Tag Input:</p>
    <input
      onChange={(e) => setTagvalue(e.target.value)}
      type="text"
      className="input-text"
    />

    <div className="tag-suggestions">
      {suggestions.map(tag => (
        <label key={tag.id} className="tag-label">
          <input
            type="checkbox"
            checked={tags.includes(tag.label)}
            onChange={() => toggleTag(tag.label)}
          />
          {tag.label}
        </label>
      ))}
    </div>

    <button className="btn" onClick={handleAddNewTag}>Add New Tag</button>

    <div className="selected-tags">
      {tags.map((tag, index) => (
        <div key={index} className="tag-item">
          <p>{tag}</p>
          <button className="btn-small" onClick={() => removeTag(index)}>x</button>
        </div>
      ))}
    </div>

    <button className="btn save-btn" onClick={handleSave}>Save</button>
  </div>
</div>

    )
}
export default Createcard;