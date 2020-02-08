import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/python/python.js'; 
import 'codemirror/theme/monokai.css';

import styles from "codemirror/lib/codemirror.css";

function draw(canvas) {
  console.log("hello")
  console.log(canvas)
  if (canvas.getContext) {
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  ctx.fillRect(30, 30, 50, 50);
  }
}

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

const canvas = document.getElementById('canvas');
console.log(document.getElementById('canvas'))
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 150, 100);
