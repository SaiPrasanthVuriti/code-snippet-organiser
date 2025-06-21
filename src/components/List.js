import { useState } from "react";
import {langParse1} from "../functions/langParse";
import Readonly from "../components/Readonly"
import { updateData,deleteData } from "../service/crud";

const List = ({ snippets , searchTerm ,myCode,setEdit}) => {
  const [copied, setCopied] = useState(-1);
  const handleFav= (docId,fav)=>{
   try{
    updateData(docId,{isFav:!fav});
   }
   catch(err){console.log(err);}
  }
    const handleTrash= (docId,inTrash)=>{
      try{
     if(!inTrash){updateData(docId,{inTrash:true});}
     else{ deleteData(docId);}
   }
   catch(err){console.log(err);}
  }
  const timeago = (time) =>{
    const now = Date.now();
    const diffH=Math.floor((now-time)/3600000);
    if(diffH < 1){return "just now"}
    else {
     const diffD = Math.floor(diffH/24);
      if(diffD < 1){return `${diffH} hours ago`; }
      else {
       return `${diffD} days ago`; 
      }
    }
    
  }
  const handleCopy = async (code,index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(index);
      setTimeout(() => setCopied(-1), 2000); 
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    // <div id="list" >
    //   {snippets.map((snippet,index) => {
    //      return (
    //        <div key ={index}>
    //       <button  onClick={()=>{handleCopy(snippet.code,index)}}>{copied===index ? "Copied!" : "Copy"}</button>
    //       {myCode&&(
    //         <div>
    //            <button onClick={()=>{handleTrash(snippet.id,snippet.inTrash)}}>{snippet.inTrash?'delete':'trash'}</button>
    //           {!snippet.inTrash&&
    //              <div>
    //               <button onClick={()=>{handleFav(snippet.id,snippet.isFav)}}>{snippet.isFav?'fav':'notfav'}</button>
    //               <button onClick={()=>{setEdit(snippet.id);}}>edit</button>
    //               </div>
    //           }
    //         </div>
    //       )}
    //       <h3 >{snippet.title}</h3>
    //       <p>{snippet.description}</p>
    //       <p ><strong>Language:</strong> {langParse1(snippet.lang)}</p>
    //       <div >
    //         {snippet.tag.map((tag, index) => (
    //           <span key={index}>#{tag}</span>
    //         ))}
    //       </div>
    //       <div>
    //         {searchTerm===""?<Readonly code={snippet.code} ext={snippet.lang}/>:<pre>{snippet.code}</pre>}
    //       </div>
    //       <small >Updated {timeago(snippet.createTime)}</small>
    //     </div>
    //      )
    //   })}
    // </div>
    <div id="list" className="snippet-list">
  {snippets.map((snippet, index) => (
    <div key={index} className="snippet-card">
      <div className="snippet-actions">
        <button className="copy-btn" onClick={() => handleCopy(snippet.code, index)}>
          {copied === index ? "Copied!" : "Copy"}
        </button>

        {myCode && (
          <div className="mycode-actions">
            <button className="trash-btn" onClick={() => handleTrash(snippet.id, snippet.inTrash)}>
              {snippet.inTrash ? "Delete" : "Trash"}
            </button>

            {!snippet.inTrash && (
              <div className="fav-edit-actions">
                <button className="fav-btn" onClick={() => handleFav(snippet.id, snippet.isFav)}>
                  {snippet.isFav ? "Fav" : "Not Fav"}
                </button>
                <button className="edit-btn" onClick={() => setEdit(snippet.id)}>Edit</button>
              </div>
            )}
          </div>
        )}
      </div>

      <h3 className="snippet-title">{snippet.title}</h3>
      <p className="snippet-description">{snippet.description}</p>
      <p className="snippet-language"><strong>Language:</strong> {langParse1(snippet.lang)}</p>

      <div className="snippet-tags">
        {snippet.tag.map((tag, idx) => (
          <span key={idx} className="tag">#{tag}</span>
        ))}
      </div>

      <div className="snippet-code">
        {searchTerm === "" ? (
          <Readonly code={snippet.code} ext={snippet.lang} />
        ) : (
          <pre>{snippet.code}</pre>
        )}
      </div>

      <small className="snippet-time">Updated {timeago(snippet.createTime)}</small>
    </div>
  ))}
</div>

  );
}

export default List;
