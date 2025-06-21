import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import extgrab from "../functions/extgrab";

const ReadOnlyEditor = ({ code,ext}) => {
  return (
    <CodeMirror
      value={code}
      height="100px"
      extensions={extgrab(ext)}
      readOnly={true} // 👈 This is the key
      theme="dark"
      style={{textAlign:"left"}}
    />
  );
};

export default ReadOnlyEditor;