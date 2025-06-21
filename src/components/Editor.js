
import CodeMirror from "@uiw/react-codemirror";
import extgrab from "../functions/extgrab";

const Editor = ({ code = "", ext ='js' ,setcode}) => {
  return (
    <div className="editor">
      <CodeMirror
        value={code}
        height="100vh"
        style={{textAlign:"left"}}
        extensions={extgrab(ext)}
        onChange={(value) => {
          setcode(value);
        }}
      />
    </div>
  );
};

export default Editor;
