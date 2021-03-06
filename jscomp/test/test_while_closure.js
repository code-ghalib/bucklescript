// Generated CODE, PLEASE EDIT WITH CARE
'use strict';

var Caml_builtin_exceptions = require("../runtime/caml_builtin_exceptions");
var Caml_array              = require("../runtime/caml_array");
var $$Array                 = require("../stdlib/array");
var Caml_curry              = require("../runtime/caml_curry");

var v = [0];

var count = 10;

var arr = Caml_array.caml_make_vect(count, function () {
      return /* () */0;
    });

function f() {
  var n = 0;
  while(n < count) {
    var j = n;
    arr[j] = (function(j){
    return function () {
      v[0] += j;
      return /* () */0;
    }
    }(j));
    ++ n;
  };
  return /* () */0;
}

f(/* () */0);

$$Array.iter(function (x) {
      return Caml_curry.app1(x, /* () */0);
    }, arr);

var n = v[0];

console.log("" + n);

if (v[0] !== 45) {
  throw [
        Caml_builtin_exceptions.Assert_failure,
        [
          "test_while_closure.ml",
          63,
          4
        ]
      ];
}

exports.v     = v;
exports.count = count;
exports.arr   = arr;
exports.f     = f;
/*  Not a pure module */
