// Generated CODE, PLEASE EDIT WITH CARE
'use strict';

var Caml_builtin_exceptions = require("../runtime/caml_builtin_exceptions");
var Caml_obj                = require("../runtime/caml_obj");
var Mt                      = require("./mt");
var List                    = require("../stdlib/list");
var Caml_string             = require("../runtime/caml_string");

function height(param) {
  if (param) {
    return param[4];
  }
  else {
    return 0;
  }
}

function create(l, x, d, r) {
  var hl = height(l);
  var hr = height(r);
  return /* Node */{
          0: l,
          1: x,
          2: d,
          3: r,
          4: hl >= hr ? hl + 1 : hr + 1,
          length: 5,
          tag: 0
        };
}

function bal(l, x, d, r) {
  var hl = l ? l[4] : 0;
  var hr = r ? r[4] : 0;
  if (hl > hr + 2) {
    if (l) {
      var lr = l[3];
      var ld = l[2];
      var lv = l[1];
      var ll = l[0];
      if (height(ll) >= height(lr)) {
        return create(ll, lv, ld, create(lr, x, d, r));
      }
      else if (lr) {
        return create(create(ll, lv, ld, lr[0]), lr[1], lr[2], create(lr[3], x, d, r));
      }
      else {
        throw [
              Caml_builtin_exceptions.Invalid_argument,
              "Map.bal"
            ];
      }
    }
    else {
      throw [
            Caml_builtin_exceptions.Invalid_argument,
            "Map.bal"
          ];
    }
  }
  else if (hr > hl + 2) {
    if (r) {
      var rr = r[3];
      var rd = r[2];
      var rv = r[1];
      var rl = r[0];
      if (height(rr) >= height(rl)) {
        return create(create(l, x, d, rl), rv, rd, rr);
      }
      else if (rl) {
        return create(create(l, x, d, rl[0]), rl[1], rl[2], create(rl[3], rv, rd, rr));
      }
      else {
        throw [
              Caml_builtin_exceptions.Invalid_argument,
              "Map.bal"
            ];
      }
    }
    else {
      throw [
            Caml_builtin_exceptions.Invalid_argument,
            "Map.bal"
          ];
    }
  }
  else {
    return /* Node */{
            0: l,
            1: x,
            2: d,
            3: r,
            4: hl >= hr ? hl + 1 : hr + 1,
            length: 5,
            tag: 0
          };
  }
}

function add(x, data, param) {
  if (param) {
    var r = param[3];
    var d = param[2];
    var v = param[1];
    var l = param[0];
    var c = Caml_obj.caml_int_compare(x, v);
    if (c) {
      if (c < 0) {
        return bal(add(x, data, l), v, d, r);
      }
      else {
        return bal(l, v, d, add(x, data, r));
      }
    }
    else {
      return /* Node */{
              0: l,
              1: x,
              2: data,
              3: r,
              4: param[4],
              length: 5,
              tag: 0
            };
    }
  }
  else {
    return /* Node */{
            0: /* Empty */0,
            1: x,
            2: data,
            3: /* Empty */0,
            4: 1,
            length: 5,
            tag: 0
          };
  }
}

function find(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var c = Caml_obj.caml_int_compare(x, param[1]);
      if (c) {
        _param = c < 0 ? param[0] : param[3];
        continue ;
        
      }
      else {
        return param[2];
      }
    }
    else {
      throw Caml_builtin_exceptions.Not_found;
    }
  };
}

var m = List.fold_left(function (acc, param) {
      return add(param[0], param[1], acc);
    }, /* Empty */0, /* :: */[
      /* tuple */[
        10,
        /* "a" */97
      ],
      /* :: */[
        /* tuple */[
          3,
          /* "b" */98
        ],
        /* :: */[
          /* tuple */[
            7,
            /* "c" */99
          ],
          /* :: */[
            /* tuple */[
              20,
              /* "d" */100
            ],
            /* [] */0
          ]
        ]
      ]
    ]);

function height$1(param) {
  if (param) {
    return param[4];
  }
  else {
    return 0;
  }
}

function create$1(l, x, d, r) {
  var hl = height$1(l);
  var hr = height$1(r);
  return /* Node */{
          0: l,
          1: x,
          2: d,
          3: r,
          4: hl >= hr ? hl + 1 : hr + 1,
          length: 5,
          tag: 0
        };
}

function bal$1(l, x, d, r) {
  var hl = l ? l[4] : 0;
  var hr = r ? r[4] : 0;
  if (hl > hr + 2) {
    if (l) {
      var lr = l[3];
      var ld = l[2];
      var lv = l[1];
      var ll = l[0];
      if (height$1(ll) >= height$1(lr)) {
        return create$1(ll, lv, ld, create$1(lr, x, d, r));
      }
      else if (lr) {
        return create$1(create$1(ll, lv, ld, lr[0]), lr[1], lr[2], create$1(lr[3], x, d, r));
      }
      else {
        throw [
              Caml_builtin_exceptions.Invalid_argument,
              "Map.bal"
            ];
      }
    }
    else {
      throw [
            Caml_builtin_exceptions.Invalid_argument,
            "Map.bal"
          ];
    }
  }
  else if (hr > hl + 2) {
    if (r) {
      var rr = r[3];
      var rd = r[2];
      var rv = r[1];
      var rl = r[0];
      if (height$1(rr) >= height$1(rl)) {
        return create$1(create$1(l, x, d, rl), rv, rd, rr);
      }
      else if (rl) {
        return create$1(create$1(l, x, d, rl[0]), rl[1], rl[2], create$1(rl[3], rv, rd, rr));
      }
      else {
        throw [
              Caml_builtin_exceptions.Invalid_argument,
              "Map.bal"
            ];
      }
    }
    else {
      throw [
            Caml_builtin_exceptions.Invalid_argument,
            "Map.bal"
          ];
    }
  }
  else {
    return /* Node */{
            0: l,
            1: x,
            2: d,
            3: r,
            4: hl >= hr ? hl + 1 : hr + 1,
            length: 5,
            tag: 0
          };
  }
}

function add$1(x, data, param) {
  if (param) {
    var r = param[3];
    var d = param[2];
    var v = param[1];
    var l = param[0];
    var c = Caml_string.caml_string_compare(x, v);
    if (c) {
      if (c < 0) {
        return bal$1(add$1(x, data, l), v, d, r);
      }
      else {
        return bal$1(l, v, d, add$1(x, data, r));
      }
    }
    else {
      return /* Node */{
              0: l,
              1: x,
              2: data,
              3: r,
              4: param[4],
              length: 5,
              tag: 0
            };
    }
  }
  else {
    return /* Node */{
            0: /* Empty */0,
            1: x,
            2: data,
            3: /* Empty */0,
            4: 1,
            length: 5,
            tag: 0
          };
  }
}

function find$1(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var c = Caml_string.caml_string_compare(x, param[1]);
      if (c) {
        _param = c < 0 ? param[0] : param[3];
        continue ;
        
      }
      else {
        return param[2];
      }
    }
    else {
      throw Caml_builtin_exceptions.Not_found;
    }
  };
}

var s = List.fold_left(function (acc, param) {
      return add$1(param[0], param[1], acc);
    }, /* Empty */0, /* :: */[
      /* tuple */[
        "10",
        /* "a" */97
      ],
      /* :: */[
        /* tuple */[
          "3",
          /* "b" */98
        ],
        /* :: */[
          /* tuple */[
            "7",
            /* "c" */99
          ],
          /* :: */[
            /* tuple */[
              "20",
              /* "d" */100
            ],
            /* [] */0
          ]
        ]
      ]
    ]);

Mt.from_pair_suites("map_find_test.ml", /* :: */[
      /* tuple */[
        "int",
        function () {
          return /* Eq */{
                  0: find(10, m),
                  1: /* "a" */97,
                  length: 2,
                  tag: 0
                };
        }
      ],
      /* :: */[
        /* tuple */[
          "string",
          function () {
            return /* Eq */{
                    0: find$1("10", s),
                    1: /* "a" */97,
                    length: 2,
                    tag: 0
                  };
          }
        ],
        /* [] */0
      ]
    ]);

/* m Not a pure module */
