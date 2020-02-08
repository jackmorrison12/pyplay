import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/python/python.js'; 
import 'codemirror/theme/monokai.css';

import styles from "codemirror/lib/codemirror.css";

const myTextarea = document.getElementById("textarea");

//console.log("here!!!");
//console.log(styles);

console.log(CodeMirror.modes);

const editor = CodeMirror.fromTextArea(myTextarea, {
  lineNumbers: true,
  mode: "python",
  theme: "monokai"
});

console.log(document.getElementById("run"));

document.getElementById("run").addEventListener("click", () => {
   console.log(editor.getValue());
   console.log(typeof editor.getValue());
   eval(Sk.importMainWithBody("<stdin>", false, editor.getValue()));
});
