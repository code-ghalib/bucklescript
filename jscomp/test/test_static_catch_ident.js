// Generated CODE, PLEASE EDIT WITH CARE
'use strict';

var Caml_builtin_exceptions = require("../runtime/caml_builtin_exceptions");

var Scan_failure = {
  0: "Test_static_catch_ident.Scan_failure",
  1: ++ Caml_builtin_exceptions.caml_oo_last_id,
  length: 2,
  tag: 248
};

function scanf_bad_input(_, x) {
  var exit = 0;
  var s;
  if (x[0] === Scan_failure) {
    s = x[1];
    exit = 1;
  }
  else if (x[0] === Caml_builtin_exceptions.Failure) {
    s = x[1];
    exit = 1;
  }
  else {
    throw x;
  }
  if (exit === 1) {
    for(var i = 0; i<= 100; ++i){
      console.log(s);
      console.log("don't inlinie");
    }
    return /* () */0;
  }
  
}

exports.Scan_failure    = Scan_failure;
exports.scanf_bad_input = scanf_bad_input;
/* No side effect */
