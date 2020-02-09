import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/python/python.js'; 
import 'codemirror/theme/monokai.css';

import styles from "codemirror/lib/codemirror.css";

/*function draw(canvas) {
  console.log("hello")
  console.log(canvas)
  if (canvas.getContext) {
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  ctx.fillRect(30, 30, 50, 50);
  }
}*/

var cons = document.getElementById("console");

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

Sk.configure({read:builtinRead, __future__: Sk.python3, output: function(f) {
  cons.innerHTML += f.replace(/(?:\r\n|\r|\n)/g, '<br>');
}});


const Canvas = function (el) {
  this.ctx = el.getContext('2d');

  this.tp$getattr = (str) => {
    return Canvas.prototype.tp$getattr.call(this, str);
  }; 
};

Sk.abstr.setUpInheritance("Canvas", Canvas, Sk.builtin.object);

Canvas.prototype.fillRect = new Sk.builtin.func(function (self, x, y, width, height, colour) {
  Sk.builtin.pyCheckArgsLen("fillRect", arguments.length, 6, 6);
  Sk.builtin.pyCheckType("x", "number", Sk.builtin.checkNumber(x));
  Sk.builtin.pyCheckType("y", "number", Sk.builtin.checkNumber(y));
  Sk.builtin.pyCheckType("width", "number", Sk.builtin.checkNumber(width));
  Sk.builtin.pyCheckType("height", "number", Sk.builtin.checkNumber(height));
  Sk.builtin.pyCheckType("colour", "string", Sk.builtin.checkString(colour));
  self.ctx.fillStyle = colour.$jsstr();
  var x_ = Sk.builtin.asnum$(x);
  var y_ = Sk.builtin.asnum$(y);
  var width_ = Sk.builtin.asnum$(width);
  var height_ = Sk.builtin.asnum$(height);
  self.ctx.fillRect(x_, y_, width_, height_);
});

Canvas.prototype.clear = new Sk.builtin.func(function (self) {
  Sk.builtin.pyCheckArgsLen("clear", arguments.length, 1, 1);
  self.ctx.clearRect(0, 0, 400, 400);
});

console.log(Canvas.prototype);

Sk.builtins["getCanvas"] = new Sk.builtin.func(function () {
  console.log(arguments);
  Sk.builtin.pyCheckArgsLen("getCanvas", arguments.length, 0, 0);

  return new Canvas(document.getElementById("canvas"));
});

var handler2;

Sk.builtins["setInterval"] = new Sk.builtin.func(function(interval, func) {
  Sk.builtin.pyCheckArgsLen("getCanvas", arguments.length, 2, 2);
  Sk.builtin.pyCheckType("interval", "number", Sk.builtin.checkNumber(interval));
  Sk.builtin.pyCheckType("func", "function", Sk.builtin.checkFunction(func));
  console.log(Sk.builtin.asnum$(interval));
  clearInterval(handler2);
  handler2 = setInterval(() => {
    asyncEval(func, []);
  }, Sk.builtin.asnum$(interval));
});

var handler = null;

Sk.builtins["setKeyHandler"] = new Sk.builtin.func(function(func) {
  Sk.builtin.pyCheckArgsLen("getCanvas", arguments.length, 1, 1);
  Sk.builtin.pyCheckType("func", "function", Sk.builtin.checkFunction(func));
  handler = func;
});

Sk.builtins["colours"] = Sk.ffi.remapToPy({
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  yellow: "#FFFF00"
});

window.addEventListener("keydown", (e) => {
  if (handler && e.target == document.body) {
    asyncEval(handler, [Sk.builtin.int_(e.keyCode)]);
    //handler.func_code(Sk.builtin.int_(e.keyCode));
  }
});

const myTextarea = document.getElementById("textarea");

//console.log("here!!!");
//console.log(styles);

console.log(CodeMirror.modes);

const editor = CodeMirror.fromTextArea(myTextarea, {
  lineNumbers: true,
  mode: "python",
  theme: "monokai"
});

editor.on("change", () => {
  localStorage.setItem("saved", editor.getValue());
});

var v = localStorage.getItem("saved");
if (v) {
  editor.setValue(v);
}

const resetState = () => {
  handler = null;
  clearInterval(handler2);
}

const asyncEval = function(func, args) {
  try {
     Sk.misceval.callsimArray(func, args);       
  } catch(e) {
     resetState();
     addError(e.toString());
  }
}

const addError = function(str) {
  cons.innerHTML += '<span class="error">' + str + '</span><br/>';
}

console.log(document.getElementById("run"));

document.getElementById("stop").addEventListener("click", () => {
  resetState();
});

document.getElementById("run").addEventListener("click", () => {
   cons.innerHTML = "";
   document.getElementById("canvas").getContext('2d').clearRect(0, 0, 400, 400);
   resetState();
   console.log(editor.getValue());
   console.log(typeof editor.getValue());
   try {
     eval(Sk.importMainWithBody("<stdin>", false, editor.getValue()));
   } catch (e) {
      addError(e.toString());
   }
});

/*const canvas = document.getElementById('canvas');
console.log(document.getElementById('canvas'))
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 150, 100);*/
  
