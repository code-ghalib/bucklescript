// Generated CODE, PLEASE EDIT WITH CARE
'use strict';

var Caml_curry = require("../runtime/caml_curry");

function sum_float_array(arr) {
  var v = 0;
  for(var i = 0 ,i_finish = arr.length - 1; i<= i_finish; ++i){
    v += arr[i];
  }
  return v;
}

function sum_int_array(arr) {
  var v = 0;
  for(var i = 0 ,i_finish = arr.length - 1; i<= i_finish; ++i){
    v += arr[i];
  }
  return v;
}

function sum_poly(zero, add, arr) {
  var v = zero;
  for(var i = 0 ,i_finish = arr.length - 1; i<= i_finish; ++i){
    v = Caml_curry.app2(add, v, arr[i]);
  }
  return v;
}

exports.sum_float_array = sum_float_array;
exports.sum_int_array   = sum_int_array;
exports.sum_poly        = sum_poly;
/* No side effect */
