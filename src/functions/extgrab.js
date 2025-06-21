import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { sql } from "@codemirror/lang-sql";
import { markdown } from "@codemirror/lang-markdown";
import { StreamLanguage } from "@codemirror/language";
import { cpp, java } from "@codemirror/legacy-modes/mode/clike";


 const extgrab = (ext) => {
    switch (ext) {
      case "js":
      case "ts":
        return javascript({ typescript: ext === "ts" });
      case "p":
        return python();
      case "h":
        return html();
      case "c":
        return css();
      case "n":
        return json();
      case "s":
        return sql();
      case "m":
        return markdown();
      case "j":
        return StreamLanguage.define(java);
      case "cpp":
        return StreamLanguage.define(cpp);
      default:
        return javascript();
    }
  };
  export default extgrab;