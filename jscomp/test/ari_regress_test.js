// Generated CODE, PLEASE EDIT WITH CARE
'use strict';

var Mt         = require("./mt");
var Caml_curry = require("../runtime/caml_curry");

var g = 7;

function gg(x, y) {
  var u = x + y;
  return function (z) {
    return u + z;
  };
}

function g1(x, y) {
  var u = x + y;
  return function (xx, yy) {
    return xx + yy + u;
  };
}

var x = gg(3, 5)(6);

function v(param) {
  return g1(3, 4)(6, param);
}

var suites_000 = /* tuple */[
  "curry",
  function () {
    return /* Eq */{
            0: g,
            1: 7,
            length: 2,
            tag: 0
          };
  }
];

var suites_001 = /* :: */[
  /* tuple */[
    "curry2",
    function () {
      return /* Eq */{
              0: 14,
              1: Caml_curry.app1(v, 1),
              length: 2,
              tag: 0
            };
    }
  ],
  /* :: */[
    /* tuple */[
      "curry3",
      function () {
        return /* Eq */{
                0: x,
                1: 14,
                length: 2,
                tag: 0
              };
      }
    ],
    /* [] */0
  ]
];

var suites = /* :: */[
  suites_000,
  suites_001
];

Mt.from_pair_suites("ari_regress_test.ml", suites);

/* x Not a pure module */
