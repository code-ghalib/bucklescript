// Generated CODE, PLEASE EDIT WITH CARE
'use strict';

var Caml_builtin_exceptions = require("../runtime/caml_builtin_exceptions");
var Caml_obj                = require("../runtime/caml_obj");
var Pervasives              = require("./pervasives");
var Sys                     = require("./sys");
var Caml_primitive          = require("../runtime/caml_primitive");
var Caml_array              = require("../runtime/caml_array");
var $$Array                 = require("./array");
var Caml_curry              = require("../runtime/caml_curry");

function length(x) {
  return x.length - 1;
}

function fill(ar, ofs, len, x) {
  if (ofs < 0 || len < 0 || ofs + len > ar.length - 1) {
    throw [
          Caml_builtin_exceptions.Invalid_argument,
          "Weak.fill"
        ];
  }
  else {
    for(var i = ofs ,i_finish = ofs + len - 1; i<= i_finish; ++i){
      Caml_primitive.caml_weak_set(ar, i, x);
    }
    return /* () */0;
  }
}

function Make(H) {
  var emptybucket = Caml_primitive.caml_weak_create(0);
  var get_index = function (t, h) {
    return (h & Pervasives.max_int) % t[0].length;
  };
  var limit = 7;
  var over_limit = 2;
  var create = function (sz) {
    var sz$1 = sz < 7 ? 7 : sz;
    var sz$2 = sz$1 > Sys.max_array_length ? Sys.max_array_length : sz$1;
    return /* record */[
            Caml_array.caml_make_vect(sz$2, emptybucket),
            Caml_array.caml_make_vect(sz$2, /* int array */[]),
            limit,
            0,
            0
          ];
  };
  var clear = function (t) {
    for(var i = 0 ,i_finish = t[0].length - 1; i<= i_finish; ++i){
      t[0][i] = emptybucket;
      t[1][i] = /* int array */[];
    }
    t[2] = limit;
    t[3] = 0;
    return /* () */0;
  };
  var fold = function (f, t, init) {
    return $$Array.fold_right(function (param, param$1) {
                var _i = 0;
                var b = param;
                var _accu = param$1;
                while(true) {
                  var accu = _accu;
                  var i = _i;
                  if (i >= b.length - 1) {
                    return accu;
                  }
                  else {
                    var match = Caml_primitive.caml_weak_get(b, i);
                    if (match) {
                      _accu = Caml_curry.app2(f, match[0], accu);
                      _i = i + 1;
                      continue ;
                      
                    }
                    else {
                      _i = i + 1;
                      continue ;
                      
                    }
                  }
                };
              }, t[0], init);
  };
  var iter = function (f, t) {
    return $$Array.iter(function (param) {
                var _i = 0;
                var b = param;
                while(true) {
                  var i = _i;
                  if (i >= b.length - 1) {
                    return /* () */0;
                  }
                  else {
                    var match = Caml_primitive.caml_weak_get(b, i);
                    if (match) {
                      Caml_curry.app1(f, match[0]);
                      _i = i + 1;
                      continue ;
                      
                    }
                    else {
                      _i = i + 1;
                      continue ;
                      
                    }
                  }
                };
              }, t[0]);
  };
  var iter_weak = function (f, t) {
    return $$Array.iteri(function (param, param$1) {
                var _i = 0;
                var j = param;
                var b = param$1;
                while(true) {
                  var i = _i;
                  if (i >= b.length - 1) {
                    return /* () */0;
                  }
                  else {
                    var match = Caml_primitive.caml_weak_check(b, i);
                    if (match !== 0) {
                      Caml_curry.app3(f, b, t[1][j], i);
                      _i = i + 1;
                      continue ;
                      
                    }
                    else {
                      _i = i + 1;
                      continue ;
                      
                    }
                  }
                };
              }, t[0]);
  };
  var count_bucket = function (_i, b, _accu) {
    while(true) {
      var accu = _accu;
      var i = _i;
      if (i >= b.length - 1) {
        return accu;
      }
      else {
        _accu = accu + (
          Caml_primitive.caml_weak_check(b, i) ? 1 : 0
        );
        _i = i + 1;
        continue ;
        
      }
    };
  };
  var count = function (t) {
    return $$Array.fold_right(function (param, param$1) {
                return count_bucket(0, param, param$1);
              }, t[0], 0);
  };
  var next_sz = function (n) {
    return Pervasives.min((3 * n / 2 | 0) + 3, Sys.max_array_length);
  };
  var prev_sz = function (n) {
    return ((n - 3) * 2 + 2) / 3 | 0;
  };
  var test_shrink_bucket = function (t) {
    var bucket = t[0][t[4]];
    var hbucket = t[1][t[4]];
    var len = bucket.length - 1;
    var prev_len = prev_sz(len);
    var live = count_bucket(0, bucket, 0);
    if (live <= prev_len) {
      var loop = function (_i, _j) {
        while(true) {
          var j = _j;
          var i = _i;
          if (j >= prev_len) {
            if (Caml_primitive.caml_weak_check(bucket, i)) {
              _i = i + 1;
              continue ;
              
            }
            else if (Caml_primitive.caml_weak_check(bucket, j)) {
              Caml_primitive.caml_weak_blit(bucket, j, bucket, i, 1);
              hbucket[i] = hbucket[j];
              _j = j - 1;
              _i = i + 1;
              continue ;
              
            }
            else {
              _j = j - 1;
              continue ;
              
            }
          }
          else {
            return 0;
          }
        };
      };
      loop(0, bucket.length - 1 - 1);
      if (prev_len) {
        Caml_obj.caml_obj_truncate(bucket, prev_len + 1);
        Caml_obj.caml_obj_truncate(hbucket, prev_len);
      }
      else {
        t[0][t[4]] = emptybucket;
        t[1][t[4]] = /* int array */[];
      }
      if (len > t[2] && prev_len <= t[2]) {
        -- t[3];
      }
      
    }
    t[4] = (t[4] + 1) % t[0].length;
    return /* () */0;
  };
  var add_aux = function (t, setter, d, h, index) {
    var bucket = t[0][index];
    var hashes = t[1][index];
    var sz = bucket.length - 1;
    var _i = 0;
    while(true) {
      var i = _i;
      if (i >= sz) {
        var newsz = Pervasives.min((3 * sz / 2 | 0) + 3, Sys.max_array_length - 1);
        if (newsz <= sz) {
          throw [
                Caml_builtin_exceptions.Failure,
                "Weak.Make: hash bucket cannot grow more"
              ];
        }
        var newbucket = Caml_primitive.caml_weak_create(newsz);
        var newhashes = Caml_array.caml_make_vect(newsz, 0);
        Caml_primitive.caml_weak_blit(bucket, 0, newbucket, 0, sz);
        $$Array.blit(hashes, 0, newhashes, 0, sz);
        Caml_curry.app3(setter, newbucket, sz, d);
        newhashes[sz] = h;
        t[0][index] = newbucket;
        t[1][index] = newhashes;
        if (sz <= t[2] && newsz > t[2]) {
          ++ t[3];
          for(var _i$1 = 0; _i$1<= over_limit; ++_i$1){
            test_shrink_bucket(t);
          }
        }
        if (t[3] > (t[0].length / over_limit | 0)) {
          var t$1 = t;
          var oldlen = t$1[0].length;
          var newlen = next_sz(oldlen);
          if (newlen > oldlen) {
            var newt = create(newlen);
            var add_weak = (function(newt){
            return function (ob, oh, oi) {
              var setter = function (nb, ni, _) {
                return Caml_primitive.caml_weak_blit(ob, oi, nb, ni, 1);
              };
              var h = oh[oi];
              return add_aux(newt, setter, /* None */0, h, get_index(newt, h));
            }
            }(newt));
            iter_weak(add_weak, t$1);
            t$1[0] = newt[0];
            t$1[1] = newt[1];
            t$1[2] = newt[2];
            t$1[3] = newt[3];
            t$1[4] = t$1[4] % newt[0].length;
            return /* () */0;
          }
          else {
            t$1[2] = Pervasives.max_int;
            t$1[3] = 0;
            return /* () */0;
          }
        }
        else {
          return 0;
        }
      }
      else if (Caml_primitive.caml_weak_check(bucket, i)) {
        _i = i + 1;
        continue ;
        
      }
      else {
        Caml_curry.app3(setter, bucket, i, d);
        hashes[i] = h;
        return /* () */0;
      }
    };
  };
  var add = function (t, d) {
    var h = Caml_curry.app1(H[1], d);
    return add_aux(t, function (prim, prim$1, prim$2) {
                return Caml_primitive.caml_weak_set(prim, prim$1, prim$2);
              }, /* Some */[d], h, get_index(t, h));
  };
  var find_or = function (t, d, ifnotfound) {
    var h = Caml_curry.app1(H[1], d);
    var index = get_index(t, h);
    var bucket = t[0][index];
    var hashes = t[1][index];
    var sz = bucket.length - 1;
    var _i = 0;
    while(true) {
      var i = _i;
      if (i >= sz) {
        return Caml_curry.app2(ifnotfound, h, index);
      }
      else if (h === hashes[i]) {
        var match = Caml_primitive.caml_weak_get_copy(bucket, i);
        if (match) {
          if (Caml_curry.app2(H[0], match[0], d)) {
            var match$1 = Caml_primitive.caml_weak_get(bucket, i);
            if (match$1) {
              return match$1[0];
            }
            else {
              _i = i + 1;
              continue ;
              
            }
          }
          else {
            _i = i + 1;
            continue ;
            
          }
        }
        else {
          _i = i + 1;
          continue ;
          
        }
      }
      else {
        _i = i + 1;
        continue ;
        
      }
    };
  };
  var merge = function (t, d) {
    return find_or(t, d, function (h, index) {
                add_aux(t, function (prim, prim$1, prim$2) {
                      return Caml_primitive.caml_weak_set(prim, prim$1, prim$2);
                    }, /* Some */[d], h, index);
                return d;
              });
  };
  var find = function (t, d) {
    return find_or(t, d, function (_, _$1) {
                throw Caml_builtin_exceptions.Not_found;
              });
  };
  var find_shadow = function (t, d, iffound, ifnotfound) {
    var h = Caml_curry.app1(H[1], d);
    var index = get_index(t, h);
    var bucket = t[0][index];
    var hashes = t[1][index];
    var sz = bucket.length - 1;
    var _i = 0;
    while(true) {
      var i = _i;
      if (i >= sz) {
        return ifnotfound;
      }
      else if (h === hashes[i]) {
        var match = Caml_primitive.caml_weak_get_copy(bucket, i);
        if (match) {
          if (Caml_curry.app2(H[0], match[0], d)) {
            return Caml_curry.app2(iffound, bucket, i);
          }
          else {
            _i = i + 1;
            continue ;
            
          }
        }
        else {
          _i = i + 1;
          continue ;
          
        }
      }
      else {
        _i = i + 1;
        continue ;
        
      }
    };
  };
  var remove = function (t, d) {
    return find_shadow(t, d, function (w, i) {
                return Caml_primitive.caml_weak_set(w, i, /* None */0);
              }, /* () */0);
  };
  var mem = function (t, d) {
    return find_shadow(t, d, function (_, _$1) {
                return /* true */1;
              }, /* false */0);
  };
  var find_all = function (t, d) {
    var h = Caml_curry.app1(H[1], d);
    var index = get_index(t, h);
    var bucket = t[0][index];
    var hashes = t[1][index];
    var sz = bucket.length - 1;
    var _i = 0;
    var _accu = /* [] */0;
    while(true) {
      var accu = _accu;
      var i = _i;
      if (i >= sz) {
        return accu;
      }
      else if (h === hashes[i]) {
        var match = Caml_primitive.caml_weak_get_copy(bucket, i);
        if (match) {
          if (Caml_curry.app2(H[0], match[0], d)) {
            var match$1 = Caml_primitive.caml_weak_get(bucket, i);
            if (match$1) {
              _accu = /* :: */[
                match$1[0],
                accu
              ];
              _i = i + 1;
              continue ;
              
            }
            else {
              _i = i + 1;
              continue ;
              
            }
          }
          else {
            _i = i + 1;
            continue ;
            
          }
        }
        else {
          _i = i + 1;
          continue ;
          
        }
      }
      else {
        _i = i + 1;
        continue ;
        
      }
    };
  };
  var stats = function (t) {
    var len = t[0].length;
    var lens = $$Array.map(length, t[0]);
    $$Array.sort(function (prim, prim$1) {
          return Caml_obj.caml_compare(prim, prim$1);
        }, lens);
    var totlen = $$Array.fold_left(function (prim, prim$1) {
          return prim + prim$1;
        }, 0, lens);
    return /* tuple */[
            len,
            count(t),
            totlen,
            lens[0],
            lens[len / 2 | 0],
            lens[len - 1]
          ];
  };
  return [
          create,
          clear,
          merge,
          add,
          remove,
          find,
          find_all,
          mem,
          iter,
          fold,
          count,
          stats
        ];
}

function create(prim) {
  return Caml_primitive.caml_weak_create(prim);
}

function set(prim, prim$1, prim$2) {
  return Caml_primitive.caml_weak_set(prim, prim$1, prim$2);
}

function get(prim, prim$1) {
  return Caml_primitive.caml_weak_get(prim, prim$1);
}

function get_copy(prim, prim$1) {
  return Caml_primitive.caml_weak_get_copy(prim, prim$1);
}

function check(prim, prim$1) {
  return Caml_primitive.caml_weak_check(prim, prim$1);
}

function blit(prim, prim$1, prim$2, prim$3, prim$4) {
  return Caml_primitive.caml_weak_blit(prim, prim$1, prim$2, prim$3, prim$4);
}

exports.create   = create;
exports.length   = length;
exports.set      = set;
exports.get      = get;
exports.get_copy = get_copy;
exports.check    = check;
exports.fill     = fill;
exports.blit     = blit;
exports.Make     = Make;
/* No side effect */
