import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/python/python.js'; 

import styles from "codemirror/lib/codemirror.css";

const myTextarea = document.getElementById("textarea");

//console.log("here!!!");
//console.log(styles);

console.log(CodeMirror.modes);

const editor = CodeMirror.fromTextArea(myTextarea, {
  lineNumbers: true,
  mode: "python"
});

document.write("Hello World from JavaScript");
