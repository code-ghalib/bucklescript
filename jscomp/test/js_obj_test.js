// Generated CODE, PLEASE EDIT WITH CARE
'use strict';

var Mt             = require("./mt");
var CamlinternalOO = require("../stdlib/camlinternalOO");
var Caml_curry     = require("../runtime/caml_curry");

function f(u) {
  if (u.tag === 248) {
    return Caml_curry.js2(5740587, 1, u, 32);
  }
  else {
    return Caml_curry.app1(u.say.bind(u), 32);
  }
}

var class_tables = [
  0,
  0,
  0
];

var suites_000 = /* tuple */[
  "caml_obj",
  function () {
    if (!class_tables[0]) {
      var $$class = CamlinternalOO.create_table(["say"]);
      var say = CamlinternalOO.get_method_label($$class, "say");
      CamlinternalOO.set_method($$class, say, function (_, x) {
            return 1 + x;
          });
      var env_init = function () {
        return CamlinternalOO.create_object_opt(0, $$class);
      };
      CamlinternalOO.init_class($$class);
      class_tables[0] = env_init;
    }
    return /* Eq */{
            0: 33,
            1: f(Caml_curry.app1(class_tables[0], 0)),
            length: 2,
            tag: 0
          };
  }
];

var suites_001 = /* :: */[
  /* tuple */[
    "js_obj",
    function () {
      return /* Eq */{
              0: 34,
              1: f({
                    "say": function (x) {
                      return x + 2;
                    }
                  }),
              length: 2,
              tag: 0
            };
    }
  ],
  /* [] */0
];

var suites = /* :: */[
  suites_000,
  suites_001
];

Mt.from_pair_suites("js_obj_test.ml", suites);

exports.f      = f;
exports.suites = suites;
/*  Not a pure module */
