// Generated CODE, PLEASE EDIT WITH CARE
'use strict';

var Mt    = require("./mt");
var Stack = require("../stdlib/stack");
var List  = require("../stdlib/list");

function to_list(v) {
  var acc = /* [] */0;
  while(v[0] !== /* [] */0) {
    acc = /* :: */[
      Stack.pop(v),
      acc
    ];
  };
  return List.rev(acc);
}

function v() {
  var v$1 = /* record */[/* [] */0];
  Stack.push(3, v$1);
  Stack.push(4, v$1);
  Stack.push(1, v$1);
  return to_list(v$1);
}

var suites_000 = /* tuple */[
  "push_test",
  function () {
    return /* Eq */{
            0: /* :: */[
              1,
              /* :: */[
                4,
                /* :: */[
                  3,
                  /* [] */0
                ]
              ]
            ],
            1: v(/* () */0),
            length: 2,
            tag: 0
          };
  }
];

var suites = /* :: */[
  suites_000,
  /* [] */0
];

Mt.from_pair_suites("stack_test.ml", suites);

exports.to_list = to_list;
exports.v       = v;
exports.suites  = suites;
/*  Not a pure module */
