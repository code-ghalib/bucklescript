// Generated CODE, PLEASE EDIT WITH CARE
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions");

function caml_obj_dup(x) {
  var len = x.length;
  var v = {
    length: len,
    tag: x.tag | 0
  };
  for(var i = 0 ,i_finish = len - 1; i<= i_finish; ++i){
    v[i] = v[i];
  }
  return v;
}

function caml_obj_truncate(x, new_size) {
  var len = x.length;
  if (new_size <= 0 || new_size > len) {
    throw [
          Caml_builtin_exceptions.Invalid_argument,
          "Obj.truncate"
        ];
  }
  else if (len !== new_size) {
    for(var i = new_size ,i_finish = len - 1; i<= i_finish; ++i){
      x[i] = 0;
    }
    x.length = new_size;
    return /* () */0;
  }
  else {
    return 0;
  }
}

function caml_lazy_make_forward(x) {
  return {
          0: x,
          length: 1,
          tag: 250
        };
}

function caml_update_dummy(x, y) {
  var len = y.length;
  for(var i = 0 ,i_finish = len - 1; i<= i_finish; ++i){
    x[i] = y[i];
  }
  x.tag = y.tag | 0;
  x.length = y.length;
  return /* () */0;
}

function caml_int_compare(x, y) {
  if (x < y) {
    return -1;
  }
  else if (x === y) {
    return 0;
  }
  else {
    return 1;
  }
}

function caml_compare(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    if (typeof a === "string") {
      var x = a;
      var y = b;
      if (x < y) {
        return -1;
      }
      else if (x === y) {
        return 0;
      }
      else {
        return 1;
      }
    }
    else if (typeof a === "number") {
      return caml_int_compare(a, b);
    }
    else {
      var tag_a = a.tag | 0;
      var tag_b = b.tag | 0;
      if (tag_a === 250) {
        _a = a[0];
        continue ;
        
      }
      else if (tag_b === 250) {
        _b = b[0];
        continue ;
        
      }
      else if (tag_a === 248) {
        return caml_int_compare(a[1], b[1]);
      }
      else if (tag_a === 251) {
        throw [
              Caml_builtin_exceptions.Invalid_argument,
              "equal: abstract value"
            ];
      }
      else if (tag_a !== tag_b) {
        if (tag_a < tag_b) {
          return -1;
        }
        else {
          return 1;
        }
      }
      else {
        var len_a = a.length;
        var len_b = b.length;
        if (len_a === len_b) {
          var a$1 = a;
          var b$1 = b;
          var _i = 0;
          var same_length = len_a;
          while(true) {
            var i = _i;
            if (i === same_length) {
              return 0;
            }
            else {
              var res = caml_compare(a$1[i], b$1[i]);
              if (res !== 0) {
                return res;
              }
              else {
                _i = i + 1;
                continue ;
                
              }
            }
          };
        }
        else if (len_a < len_b) {
          var a$2 = a;
          var b$2 = b;
          var _i$1 = 0;
          var short_length = len_a;
          while(true) {
            var i$1 = _i$1;
            if (i$1 === short_length) {
              return -1;
            }
            else {
              var res$1 = caml_compare(a$2[i$1], b$2[i$1]);
              if (res$1 !== 0) {
                return res$1;
              }
              else {
                _i$1 = i$1 + 1;
                continue ;
                
              }
            }
          };
        }
        else {
          var a$3 = a;
          var b$3 = b;
          var _i$2 = 0;
          var short_length$1 = len_b;
          while(true) {
            var i$2 = _i$2;
            if (i$2 === short_length$1) {
              return 1;
            }
            else {
              var res$2 = caml_compare(a$3[i$2], b$3[i$2]);
              if (res$2 !== 0) {
                return res$2;
              }
              else {
                _i$2 = i$2 + 1;
                continue ;
                
              }
            }
          };
        }
      }
    }
  };
}

function caml_equal(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    if (typeof a === "string") {
      return +(a === b);
    }
    else if (typeof a === "number") {
      return +(a === b);
    }
    else {
      var tag_a = a.tag | 0;
      var tag_b = b.tag | 0;
      if (tag_a === 250) {
        _a = a[0];
        continue ;
        
      }
      else if (tag_b === 250) {
        _b = b[0];
        continue ;
        
      }
      else if (tag_a === 248) {
        return +(a[1] === b[1]);
      }
      else if (tag_a === 251) {
        throw [
              Caml_builtin_exceptions.Invalid_argument,
              "equal: abstract value"
            ];
      }
      else if (tag_a !== tag_b) {
        return /* false */0;
      }
      else {
        var len_a = a.length;
        var len_b = b.length;
        if (len_a === len_b) {
          var a$1 = a;
          var b$1 = b;
          var _i = 0;
          var same_length = len_a;
          while(true) {
            var i = _i;
            if (i === same_length) {
              return /* true */1;
            }
            else if (caml_equal(a$1[i], b$1[i])) {
              _i = i + 1;
              continue ;
              
            }
            else {
              return /* false */0;
            }
          };
        }
        else {
          return /* false */0;
        }
      }
    }
  };
}

function caml_notequal(a, b) {
  return !caml_equal(a, b);
}

function caml_greaterequal(a, b) {
  return +(caml_compare(a, b) >= 0);
}

function caml_greaterthan(a, b) {
  return +(caml_compare(a, b) > 0);
}

function caml_lessequal(a, b) {
  return +(caml_compare(a, b) <= 0);
}

function caml_lessthan(a, b) {
  return +(caml_compare(a, b) < 0);
}

var caml_int32_compare = caml_int_compare;

var caml_nativeint_compare = caml_int_compare;

exports.caml_obj_dup           = caml_obj_dup;
exports.caml_obj_truncate      = caml_obj_truncate;
exports.caml_lazy_make_forward = caml_lazy_make_forward;
exports.caml_update_dummy      = caml_update_dummy;
exports.caml_int_compare       = caml_int_compare;
exports.caml_int32_compare     = caml_int32_compare;
exports.caml_nativeint_compare = caml_nativeint_compare;
exports.caml_compare           = caml_compare;
exports.caml_equal             = caml_equal;
exports.caml_notequal          = caml_notequal;
exports.caml_greaterequal      = caml_greaterequal;
exports.caml_greaterthan       = caml_greaterthan;
exports.caml_lessthan          = caml_lessthan;
exports.caml_lessequal         = caml_lessequal;
/* No side effect */
