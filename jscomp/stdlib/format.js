// Generated CODE, PLEASE EDIT WITH CARE
'use strict';

var Caml_builtin_exceptions = require("../runtime/caml_builtin_exceptions");
var Caml_obj                = require("../runtime/caml_obj");
var Caml_io                 = require("../runtime/caml_io");
var Pervasives              = require("./pervasives");
var Buffer                  = require("./buffer");
var Caml_curry              = require("../runtime/caml_curry");
var $$String                = require("./string");
var CamlinternalFormat      = require("./camlinternalFormat");

function add_queue(x, q) {
  var c = /* Cons */{
    0: /* record */[
      x,
      /* Nil */0
    ],
    length: 1,
    tag: 0
  };
  var match = q[0];
  if (match) {
    q[0] = c;
    match[0][1] = c;
    return /* () */0;
  }
  else {
    q[0] = c;
    q[1] = c;
    return /* () */0;
  }
}

var Empty_queue = {
  0: "Format.Empty_queue",
  1: ++ Caml_builtin_exceptions.caml_oo_last_id,
  length: 2,
  tag: 248
};

function peek_queue(param) {
  var match = param[1];
  if (match) {
    return match[0][0];
  }
  else {
    throw Empty_queue;
  }
}

function take_queue(q) {
  var match = q[1];
  if (match) {
    var match$1 = match[0];
    var x = match$1[0];
    var tl = match$1[1];
    q[1] = tl;
    if (!tl) {
      q[0] = /* Nil */0;
    }
    return x;
  }
  else {
    throw Empty_queue;
  }
}

function pp_enqueue(state, token) {
  state[12] += token[2];
  return add_queue(token, state[26]);
}

function pp_clear_queue(state) {
  state[11] = 1;
  state[12] = 1;
  var q = state[26];
  q[0] = /* Nil */0;
  q[1] = /* Nil */0;
  return /* () */0;
}

var pp_infinity = 1000000010;

function pp_output_string(state, s) {
  return Caml_curry.app3(state[16], s, 0, s.length);
}

function break_new_line(state, offset, width) {
  Caml_curry.app1(state[18], /* () */0);
  state[10] = /* true */1;
  var indent = state[5] - width + offset;
  var real_indent = Pervasives.min(state[7], indent);
  state[9] = real_indent;
  state[8] = state[5] - state[9];
  return Caml_curry.app1(state[19], state[9]);
}

function break_same_line(state, width) {
  state[8] -= width;
  return Caml_curry.app1(state[19], width);
}

function pp_force_break_line(state) {
  var match = state[1];
  if (match) {
    var match$1 = match[0];
    var width = match$1[1];
    var bl_ty = match$1[0];
    if (width > state[8] && bl_ty !== 0 && bl_ty < 5) {
      return break_new_line(state, 0, width);
    }
    else {
      return 0;
    }
  }
  else {
    return Caml_curry.app1(state[18], /* () */0);
  }
}

function format_pp_token(state, size, param) {
  if (typeof param === "number") {
    switch (param) {
      case 0 : 
          var match = state[2];
          if (match) {
            var tabs = match[0][0];
            var add_tab = function (n, ls) {
              if (ls) {
                var x = ls[0];
                if (Caml_obj.caml_lessthan(n, x)) {
                  return /* :: */[
                          n,
                          ls
                        ];
                }
                else {
                  return /* :: */[
                          x,
                          add_tab(n, ls[1])
                        ];
                }
              }
              else {
                return /* :: */[
                        n,
                        /* [] */0
                      ];
              }
            };
            tabs[0] = add_tab(state[5] - state[8], tabs[0]);
            return /* () */0;
          }
          else {
            return /* () */0;
          }
          break;
      case 1 : 
          var match$1 = state[1];
          if (match$1) {
            state[1] = match$1[1];
            return /* () */0;
          }
          else {
            return /* () */0;
          }
      case 2 : 
          var match$2 = state[2];
          if (match$2) {
            state[2] = match$2[1];
            return /* () */0;
          }
          else {
            return /* () */0;
          }
      case 3 : 
          var match$3 = state[1];
          if (match$3) {
            return break_new_line(state, 0, match$3[0][1]);
          }
          else {
            return Caml_curry.app1(state[18], /* () */0);
          }
      case 4 : 
          if (state[9] !== state[5] - state[8]) {
            var state$1 = state;
            var match$4 = take_queue(state$1[26]);
            var size$1 = match$4[0];
            state$1[11] -= match$4[2];
            state$1[8] += size$1;
            return /* () */0;
          }
          else {
            return 0;
          }
      case 5 : 
          var match$5 = state[4];
          if (match$5) {
            var marker = Caml_curry.app1(state[23], match$5[0]);
            pp_output_string(state, marker);
            state[4] = match$5[1];
            return /* () */0;
          }
          else {
            return /* () */0;
          }
          break;
      
    }
  }
  else {
    switch (param.tag | 0) {
      case 0 : 
          state[8] -= size;
          pp_output_string(state, param[0]);
          state[10] = /* false */0;
          return /* () */0;
      case 1 : 
          var off = param[1];
          var n = param[0];
          var match$6 = state[1];
          if (match$6) {
            var match$7 = match$6[0];
            var width = match$7[1];
            switch (match$7[0]) {
              case 1 : 
              case 2 : 
                  return break_new_line(state, off, width);
              case 3 : 
                  if (size > state[8]) {
                    return break_new_line(state, off, width);
                  }
                  else {
                    return break_same_line(state, n);
                  }
              case 4 : 
                  if (state[10] || !(size > state[8] || state[9] > state[5] - width + off)) {
                    return break_same_line(state, n);
                  }
                  else {
                    return break_new_line(state, off, width);
                  }
              case 0 : 
              case 5 : 
                  return break_same_line(state, n);
              
            }
          }
          else {
            return /* () */0;
          }
          break;
      case 2 : 
          var insertion_point = state[5] - state[8];
          var match$8 = state[2];
          if (match$8) {
            var tabs$1 = match$8[0][0];
            var find = function (n, _param) {
              while(true) {
                var param = _param;
                if (param) {
                  var x = param[0];
                  if (Caml_obj.caml_greaterequal(x, n)) {
                    return x;
                  }
                  else {
                    _param = param[1];
                    continue ;
                    
                  }
                }
                else {
                  throw Caml_builtin_exceptions.Not_found;
                }
              };
            };
            var match$9 = tabs$1[0];
            var tab;
            if (match$9) {
              try {
                tab = find(insertion_point, tabs$1[0]);
              }
              catch (exn){
                if (exn === Caml_builtin_exceptions.Not_found) {
                  tab = match$9[0];
                }
                else {
                  throw exn;
                }
              }
            }
            else {
              tab = insertion_point;
            }
            var offset = tab - insertion_point;
            if (offset >= 0) {
              return break_same_line(state, offset + param[0]);
            }
            else {
              return break_new_line(state, tab + param[1], state[5]);
            }
          }
          else {
            return /* () */0;
          }
          break;
      case 3 : 
          var ty = param[1];
          var insertion_point$1 = state[5] - state[8];
          if (insertion_point$1 > state[7]) {
            pp_force_break_line(state);
          }
          var offset$1 = state[8] - param[0];
          var bl_type = ty !== 1 ? (
              size > state[8] ? ty : /* Pp_fits */5
            ) : /* Pp_vbox */1;
          state[1] = /* :: */[
            /* Format_elem */{
              0: bl_type,
              1: offset$1,
              length: 2,
              tag: 0
            },
            state[1]
          ];
          return /* () */0;
      case 4 : 
          state[2] = /* :: */[
            param[0],
            state[2]
          ];
          return /* () */0;
      case 5 : 
          var tag_name = param[0];
          var marker$1 = Caml_curry.app1(state[22], tag_name);
          pp_output_string(state, marker$1);
          state[4] = /* :: */[
            tag_name,
            state[4]
          ];
          return /* () */0;
      
    }
  }
}

function advance_left(state) {
  try {
    var state$1 = state;
    while(true) {
      var match = peek_queue(state$1[26]);
      var size = match[0];
      if (size < 0 && state$1[12] - state$1[11] < state$1[8]) {
        return 0;
      }
      else {
        take_queue(state$1[26]);
        format_pp_token(state$1, size < 0 ? pp_infinity : size, match[1]);
        state$1[11] = match[2] + state$1[11];
        continue ;
        
      }
    };
  }
  catch (exn){
    if (exn === Empty_queue) {
      return /* () */0;
    }
    else {
      throw exn;
    }
  }
}

function enqueue_advance(state, tok) {
  pp_enqueue(state, tok);
  return advance_left(state);
}

function enqueue_string_as(state, size, s) {
  return enqueue_advance(state, /* record */[
              size,
              /* Pp_text */{
                0: s,
                length: 1,
                tag: 0
              },
              size
            ]);
}

var q_elem = /* record */[
  -1,
  /* Pp_text */{
    0: "",
    length: 1,
    tag: 0
  },
  0
];

var scan_stack_bottom_000 = /* Scan_elem */{
  0: -1,
  1: q_elem,
  length: 2,
  tag: 0
};

var scan_stack_bottom = /* :: */[
  scan_stack_bottom_000,
  /* [] */0
];

function set_size(state, ty) {
  var match = state[0];
  if (match) {
    var match$1 = match[0];
    var queue_elem = match$1[1];
    var size = queue_elem[0];
    var t = match[1];
    if (match$1[0] < state[11]) {
      state[0] = scan_stack_bottom;
      return /* () */0;
    }
    else {
      var exit = 0;
      var $js = queue_elem[1];
      if (typeof $js === "number") {
        return /* () */0;
      }
      else {
        switch ($js.tag | 0) {
          case 1 : 
          case 2 : 
              exit = 1;
              break;
          case 3 : 
              if (ty) {
                return 0;
              }
              else {
                queue_elem[0] = state[12] + size;
                state[0] = t;
                return /* () */0;
              }
          default:
            return /* () */0;
        }
      }
      if (exit === 1) {
        if (ty) {
          queue_elem[0] = state[12] + size;
          state[0] = t;
          return /* () */0;
        }
        else {
          return 0;
        }
      }
      
    }
  }
  else {
    return /* () */0;
  }
}

function scan_push(state, b, tok) {
  pp_enqueue(state, tok);
  if (b) {
    set_size(state, /* true */1);
  }
  state[0] = /* :: */[
    /* Scan_elem */{
      0: state[12],
      1: tok,
      length: 2,
      tag: 0
    },
    state[0]
  ];
  return /* () */0;
}

function pp_open_box_gen(state, indent, br_ty) {
  ++ state[13];
  if (state[13] < state[14]) {
    var elem = /* record */[
      -state[12],
      /* Pp_begin */{
        0: indent,
        1: br_ty,
        length: 2,
        tag: 3
      },
      0
    ];
    return scan_push(state, /* false */0, elem);
  }
  else if (state[13] === state[14]) {
    var state$1 = state;
    var s = state[15];
    var len = s.length;
    return enqueue_string_as(state$1, len, s);
  }
  else {
    return 0;
  }
}

function pp_close_box(state, _) {
  if (state[13] > 1) {
    if (state[13] < state[14]) {
      pp_enqueue(state, /* record */[
            0,
            /* Pp_end */1,
            0
          ]);
      set_size(state, /* true */1);
      set_size(state, /* false */0);
    }
    -- state[13];
    return /* () */0;
  }
  else {
    return 0;
  }
}

function pp_open_tag(state, tag_name) {
  if (state[20]) {
    state[3] = /* :: */[
      tag_name,
      state[3]
    ];
    Caml_curry.app1(state[24], tag_name);
  }
  if (state[21]) {
    return pp_enqueue(state, /* record */[
                0,
                /* Pp_open_tag */{
                  0: tag_name,
                  length: 1,
                  tag: 5
                },
                0
              ]);
  }
  else {
    return 0;
  }
}

function pp_close_tag(state, _) {
  if (state[21]) {
    pp_enqueue(state, /* record */[
          0,
          /* Pp_close_tag */5,
          0
        ]);
  }
  if (state[20]) {
    var match = state[3];
    if (match) {
      Caml_curry.app1(state[25], match[0]);
      state[3] = match[1];
      return /* () */0;
    }
    else {
      return /* () */0;
    }
  }
  else {
    return 0;
  }
}

function pp_set_print_tags(state, b) {
  state[20] = b;
  return /* () */0;
}

function pp_set_mark_tags(state, b) {
  state[21] = b;
  return /* () */0;
}

function pp_get_print_tags(state, _) {
  return state[20];
}

function pp_get_mark_tags(state, _) {
  return state[21];
}

function pp_set_tags(state, b) {
  state[20] = b;
  state[21] = b;
  return /* () */0;
}

function pp_get_formatter_tag_functions(state, _) {
  return /* record */[
          state[22],
          state[23],
          state[24],
          state[25]
        ];
}

function pp_set_formatter_tag_functions(state, param) {
  state[22] = param[0];
  state[23] = param[1];
  state[24] = param[2];
  state[25] = param[3];
  return /* () */0;
}

function pp_rinit(state) {
  pp_clear_queue(state);
  state[0] = scan_stack_bottom;
  state[1] = /* [] */0;
  state[2] = /* [] */0;
  state[3] = /* [] */0;
  state[4] = /* [] */0;
  state[9] = 0;
  state[13] = 0;
  state[8] = state[5];
  return pp_open_box_gen(state, 0, /* Pp_hovbox */3);
}

function pp_flush_queue(state, b) {
  while(state[13] > 1) {
    pp_close_box(state, /* () */0);
  };
  state[12] = pp_infinity;
  advance_left(state);
  if (b) {
    Caml_curry.app1(state[18], /* () */0);
  }
  return pp_rinit(state);
}

function pp_print_as_size(state, size, s) {
  if (state[13] < state[14]) {
    return enqueue_string_as(state, size, s);
  }
  else {
    return 0;
  }
}

function pp_print_as(state, isize, s) {
  return pp_print_as_size(state, isize, s);
}

function pp_print_string(state, s) {
  return pp_print_as(state, s.length, s);
}

function pp_print_int(state, i) {
  return pp_print_string(state, "" + i);
}

function pp_print_float(state, f) {
  return pp_print_string(state, Pervasives.string_of_float(f));
}

function pp_print_bool(state, b) {
  return pp_print_string(state, b ? "true" : "false");
}

function pp_print_char(state, c) {
  return pp_print_as(state, 1, $$String.make(1, c));
}

function pp_open_hbox(state, _) {
  return pp_open_box_gen(state, 0, /* Pp_hbox */0);
}

function pp_open_vbox(state, indent) {
  return pp_open_box_gen(state, indent, /* Pp_vbox */1);
}

function pp_open_hvbox(state, indent) {
  return pp_open_box_gen(state, indent, /* Pp_hvbox */2);
}

function pp_open_hovbox(state, indent) {
  return pp_open_box_gen(state, indent, /* Pp_hovbox */3);
}

function pp_open_box(state, indent) {
  return pp_open_box_gen(state, indent, /* Pp_box */4);
}

function pp_print_newline(state, _) {
  pp_flush_queue(state, /* true */1);
  return Caml_curry.app1(state[17], /* () */0);
}

function pp_print_flush(state, _) {
  pp_flush_queue(state, /* false */0);
  return Caml_curry.app1(state[17], /* () */0);
}

function pp_force_newline(state, _) {
  if (state[13] < state[14]) {
    return enqueue_advance(state, /* record */[
                0,
                /* Pp_newline */3,
                0
              ]);
  }
  else {
    return 0;
  }
}

function pp_print_if_newline(state, _) {
  if (state[13] < state[14]) {
    return enqueue_advance(state, /* record */[
                0,
                /* Pp_if_newline */4,
                0
              ]);
  }
  else {
    return 0;
  }
}

function pp_print_break(state, width, offset) {
  if (state[13] < state[14]) {
    var elem = /* record */[
      -state[12],
      /* Pp_break */{
        0: width,
        1: offset,
        length: 2,
        tag: 1
      },
      width
    ];
    return scan_push(state, /* true */1, elem);
  }
  else {
    return 0;
  }
}

function pp_print_space(state, _) {
  return pp_print_break(state, 1, 0);
}

function pp_print_cut(state, _) {
  return pp_print_break(state, 0, 0);
}

function pp_open_tbox(state, _) {
  ++ state[13];
  if (state[13] < state[14]) {
    var elem = /* record */[
      0,
      /* Pp_tbegin */{
        0: /* Pp_tbox */{
          0: [/* [] */0],
          length: 1,
          tag: 0
        },
        length: 1,
        tag: 4
      },
      0
    ];
    return enqueue_advance(state, elem);
  }
  else {
    return 0;
  }
}

function pp_close_tbox(state, _) {
  if (state[13] > 1) {
    if (state[13] < state[14]) {
      var elem = /* record */[
        0,
        /* Pp_tend */2,
        0
      ];
      enqueue_advance(state, elem);
      -- state[13];
      return /* () */0;
    }
    else {
      return 0;
    }
  }
  else {
    return 0;
  }
}

function pp_print_tbreak(state, width, offset) {
  if (state[13] < state[14]) {
    var elem = /* record */[
      -state[12],
      /* Pp_tbreak */{
        0: width,
        1: offset,
        length: 2,
        tag: 2
      },
      width
    ];
    return scan_push(state, /* true */1, elem);
  }
  else {
    return 0;
  }
}

function pp_print_tab(state, _) {
  return pp_print_tbreak(state, 0, 0);
}

function pp_set_tab(state, _) {
  if (state[13] < state[14]) {
    var elem = /* record */[
      0,
      /* Pp_stab */0,
      0
    ];
    return enqueue_advance(state, elem);
  }
  else {
    return 0;
  }
}

function pp_print_list(_$staropt$star, pp_v, ppf, _param) {
  while(true) {
    var param = _param;
    var $staropt$star = _$staropt$star;
    var pp_sep = $staropt$star ? $staropt$star[0] : pp_print_cut;
    if (param) {
      var vs = param[1];
      var v = param[0];
      if (vs) {
        Caml_curry.app2(pp_v, ppf, v);
        Caml_curry.app2(pp_sep, ppf, /* () */0);
        _param = vs;
        _$staropt$star = /* Some */[pp_sep];
        continue ;
        
      }
      else {
        return Caml_curry.app2(pp_v, ppf, v);
      }
    }
    else {
      return /* () */0;
    }
  };
}

function pp_print_text(ppf, s) {
  var len = s.length;
  var left = [0];
  var right = [0];
  var flush = function () {
    pp_print_string(ppf, $$String.sub(s, left[0], right[0] - left[0]));
    ++ right[0];
    left[0] = right[0];
    return /* () */0;
  };
  while(right[0] !== len) {
    var match = s.charCodeAt(right[0]);
    if (match !== 10) {
      if (match !== 32) {
        ++ right[0];
      }
      else {
        flush(/* () */0);
        pp_print_break(ppf, 1, 0);
      }
    }
    else {
      flush(/* () */0);
      pp_force_newline(ppf, /* () */0);
    }
  };
  if (left[0] !== len) {
    return flush(/* () */0);
  }
  else {
    return 0;
  }
}

function pp_set_max_boxes(state, n) {
  if (n > 1) {
    state[14] = n;
    return /* () */0;
  }
  else {
    return 0;
  }
}

function pp_get_max_boxes(state, _) {
  return state[14];
}

function pp_over_max_boxes(state, _) {
  return +(state[13] === state[14]);
}

function pp_set_ellipsis_text(state, s) {
  state[15] = s;
  return /* () */0;
}

function pp_get_ellipsis_text(state, _) {
  return state[15];
}

function pp_limit(n) {
  if (n < pp_infinity) {
    return n;
  }
  else {
    return pp_infinity - 1;
  }
}

function pp_set_max_indent(state, n) {
  var state$1 = state;
  var n$1 = state[5] - n;
  if (n$1 >= 1) {
    var n$2 = pp_limit(n$1);
    state$1[6] = n$2;
    state$1[7] = state$1[5] - state$1[6];
    return pp_rinit(state$1);
  }
  else {
    return 0;
  }
}

function pp_get_max_indent(state, _) {
  return state[7];
}

function pp_set_margin(state, n) {
  if (n >= 1) {
    var n$1 = pp_limit(n);
    state[5] = n$1;
    var new_max_indent = state[7] <= state[5] ? state[7] : Pervasives.max(Pervasives.max(state[5] - state[6], state[5] / 2 | 0), 1);
    return pp_set_max_indent(state, new_max_indent);
  }
  else {
    return 0;
  }
}

function pp_get_margin(state, _) {
  return state[5];
}

function pp_set_formatter_out_functions(state, param) {
  state[16] = param[0];
  state[17] = param[1];
  state[18] = param[2];
  state[19] = param[3];
  return /* () */0;
}

function pp_get_formatter_out_functions(state, _) {
  return /* record */[
          state[16],
          state[17],
          state[18],
          state[19]
        ];
}

function pp_set_formatter_output_functions(state, f, g) {
  state[16] = f;
  state[17] = g;
  return /* () */0;
}

function pp_get_formatter_output_functions(state, _) {
  return /* tuple */[
          state[16],
          state[17]
        ];
}

function pp_set_all_formatter_output_functions(state, f, g, h, i) {
  pp_set_formatter_output_functions(state, f, g);
  state[18] = h;
  state[19] = i;
  return /* () */0;
}

function pp_get_all_formatter_output_functions(state, _) {
  return /* tuple */[
          state[16],
          state[17],
          state[18],
          state[19]
        ];
}

function display_newline(state, _) {
  return Caml_curry.app3(state[16], "\n", 0, 1);
}

var blank_line = $$String.make(80, /* " " */32);

function display_blanks(state, _n) {
  while(true) {
    var n = _n;
    if (n > 0) {
      if (n <= 80) {
        return Caml_curry.app3(state[16], blank_line, 0, n);
      }
      else {
        Caml_curry.app3(state[16], blank_line, 0, 80);
        _n = n - 80;
        continue ;
        
      }
    }
    else {
      return 0;
    }
  };
}

function pp_set_formatter_out_channel(state, os) {
  state[16] = function (param, param$1, param$2) {
    return Pervasives.output_substring(os, param, param$1, param$2);
  };
  state[17] = function () {
    return Caml_io.caml_ml_flush(os);
  };
  state[18] = function (param) {
    return display_newline(state, param);
  };
  state[19] = function (param) {
    return display_blanks(state, param);
  };
  return /* () */0;
}

function default_pp_mark_open_tag(s) {
  return "<" + (s + ">");
}

function default_pp_mark_close_tag(s) {
  return "</" + (s + ">");
}

function default_pp_print_open_tag(prim) {
  return prim;
}

function default_pp_print_close_tag(prim) {
  return prim;
}

function pp_make_formatter(f, g, h, i) {
  var pp_q = /* record */[
    /* Nil */0,
    /* Nil */0
  ];
  var sys_tok = /* record */[
    -1,
    /* Pp_begin */{
      0: 0,
      1: /* Pp_hovbox */3,
      length: 2,
      tag: 3
    },
    0
  ];
  add_queue(sys_tok, pp_q);
  var sys_scan_stack_000 = /* Scan_elem */{
    0: 1,
    1: sys_tok,
    length: 2,
    tag: 0
  };
  var sys_scan_stack = /* :: */[
    sys_scan_stack_000,
    scan_stack_bottom
  ];
  return /* record */[
          sys_scan_stack,
          /* [] */0,
          /* [] */0,
          /* [] */0,
          /* [] */0,
          78,
          10,
          68,
          78,
          0,
          /* true */1,
          1,
          1,
          1,
          Pervasives.max_int,
          ".",
          f,
          g,
          h,
          i,
          /* false */0,
          /* false */0,
          default_pp_mark_open_tag,
          default_pp_mark_close_tag,
          default_pp_print_open_tag,
          default_pp_print_close_tag,
          pp_q
        ];
}

function make_formatter(output, flush) {
  var ppf = pp_make_formatter(output, flush, function (prim) {
        return prim;
      }, function (prim) {
        return prim;
      });
  ppf[18] = function (param) {
    return display_newline(ppf, param);
  };
  ppf[19] = function (param) {
    return display_blanks(ppf, param);
  };
  return ppf;
}

function formatter_of_out_channel(oc) {
  return make_formatter(function (param, param$1, param$2) {
              return Pervasives.output_substring(oc, param, param$1, param$2);
            }, function () {
              return Caml_io.caml_ml_flush(oc);
            });
}

function formatter_of_buffer(b) {
  return make_formatter(function (param, param$1, param$2) {
              return Buffer.add_substring(b, param, param$1, param$2);
            }, function (prim) {
              return prim;
            });
}

var stdbuf = Buffer.create(512);

var std_formatter = formatter_of_out_channel(Pervasives.stdout);

var err_formatter = formatter_of_out_channel(Pervasives.stderr);

var str_formatter = formatter_of_buffer(stdbuf);

function flush_str_formatter() {
  pp_flush_queue(str_formatter, /* false */0);
  var s = Buffer.contents(stdbuf);
  Buffer.reset(stdbuf);
  return s;
}

function flush_buf_formatter(buf, ppf) {
  pp_flush_queue(ppf, /* false */0);
  var s = Buffer.contents(buf);
  Buffer.reset(buf);
  return s;
}

function open_hbox(param) {
  return pp_open_hbox(std_formatter, param);
}

function open_vbox(param) {
  return pp_open_vbox(std_formatter, param);
}

function open_hvbox(param) {
  return pp_open_hvbox(std_formatter, param);
}

function open_hovbox(param) {
  return pp_open_hovbox(std_formatter, param);
}

function open_box(param) {
  return pp_open_box(std_formatter, param);
}

function close_box(param) {
  return pp_close_box(std_formatter, param);
}

function open_tag(param) {
  return pp_open_tag(std_formatter, param);
}

function close_tag(param) {
  return pp_close_tag(std_formatter, param);
}

function print_as(param, param$1) {
  return pp_print_as(std_formatter, param, param$1);
}

function print_string(param) {
  return pp_print_string(std_formatter, param);
}

function print_int(param) {
  return pp_print_string(std_formatter, "" + param);
}

function print_float(param) {
  return pp_print_string(std_formatter, Pervasives.string_of_float(param));
}

function print_char(param) {
  return pp_print_char(std_formatter, param);
}

function print_bool(param) {
  return pp_print_string(std_formatter, param ? "true" : "false");
}

function print_break(param, param$1) {
  return pp_print_break(std_formatter, param, param$1);
}

function print_cut() {
  return pp_print_break(std_formatter, 0, 0);
}

function print_space() {
  return pp_print_break(std_formatter, 1, 0);
}

function force_newline(param) {
  return pp_force_newline(std_formatter, param);
}

function print_flush(param) {
  return pp_print_flush(std_formatter, param);
}

function print_newline(param) {
  return pp_print_newline(std_formatter, param);
}

function print_if_newline(param) {
  return pp_print_if_newline(std_formatter, param);
}

function open_tbox(param) {
  return pp_open_tbox(std_formatter, param);
}

function close_tbox(param) {
  return pp_close_tbox(std_formatter, param);
}

function print_tbreak(param, param$1) {
  return pp_print_tbreak(std_formatter, param, param$1);
}

function set_tab(param) {
  return pp_set_tab(std_formatter, param);
}

function print_tab() {
  return pp_print_tbreak(std_formatter, 0, 0);
}

function set_margin(param) {
  return pp_set_margin(std_formatter, param);
}

function get_margin() {
  return std_formatter[5];
}

function set_max_indent(param) {
  return pp_set_max_indent(std_formatter, param);
}

function get_max_indent() {
  return std_formatter[7];
}

function set_max_boxes(param) {
  return pp_set_max_boxes(std_formatter, param);
}

function get_max_boxes() {
  return std_formatter[14];
}

function over_max_boxes(param) {
  return pp_over_max_boxes(std_formatter, param);
}

function set_ellipsis_text(param) {
  std_formatter[15] = param;
  return /* () */0;
}

function get_ellipsis_text() {
  return std_formatter[15];
}

function set_formatter_out_channel(param) {
  return pp_set_formatter_out_channel(std_formatter, param);
}

function set_formatter_out_functions(param) {
  return pp_set_formatter_out_functions(std_formatter, param);
}

function get_formatter_out_functions(param) {
  return pp_get_formatter_out_functions(std_formatter, param);
}

function set_formatter_output_functions(param, param$1) {
  return pp_set_formatter_output_functions(std_formatter, param, param$1);
}

function get_formatter_output_functions(param) {
  return pp_get_formatter_output_functions(std_formatter, param);
}

function set_all_formatter_output_functions(param, param$1, param$2, param$3) {
  return pp_set_all_formatter_output_functions(std_formatter, param, param$1, param$2, param$3);
}

function get_all_formatter_output_functions(param) {
  return pp_get_all_formatter_output_functions(std_formatter, param);
}

function set_formatter_tag_functions(param) {
  return pp_set_formatter_tag_functions(std_formatter, param);
}

function get_formatter_tag_functions(param) {
  return pp_get_formatter_tag_functions(std_formatter, param);
}

function set_print_tags(param) {
  std_formatter[20] = param;
  return /* () */0;
}

function get_print_tags() {
  return std_formatter[20];
}

function set_mark_tags(param) {
  std_formatter[21] = param;
  return /* () */0;
}

function get_mark_tags() {
  return std_formatter[21];
}

function set_tags(param) {
  return pp_set_tags(std_formatter, param);
}

function compute_tag(output, tag_acc) {
  var buf = Buffer.create(16);
  var ppf = formatter_of_buffer(buf);
  Caml_curry.app2(output, ppf, tag_acc);
  pp_print_flush(ppf, /* () */0);
  var len = buf[1];
  if (len < 2) {
    return Buffer.contents(buf);
  }
  else {
    return Buffer.sub(buf, 1, len - 2);
  }
}

function output_formatting_lit(ppf, fmting_lit) {
  if (typeof fmting_lit === "number") {
    switch (fmting_lit) {
      case 0 : 
          return pp_close_box(ppf, /* () */0);
      case 1 : 
          return pp_close_tag(ppf, /* () */0);
      case 2 : 
          return pp_print_flush(ppf, /* () */0);
      case 3 : 
          return pp_force_newline(ppf, /* () */0);
      case 4 : 
          return pp_print_newline(ppf, /* () */0);
      case 5 : 
          return pp_print_char(ppf, /* "@" */64);
      case 6 : 
          return pp_print_char(ppf, /* "%" */37);
      
    }
  }
  else {
    switch (fmting_lit.tag | 0) {
      case 0 : 
          return pp_print_break(ppf, fmting_lit[1], fmting_lit[2]);
      case 1 : 
          return /* () */0;
      case 2 : 
          pp_print_char(ppf, /* "@" */64);
          return pp_print_char(ppf, fmting_lit[0]);
      
    }
  }
}

function output_acc(ppf, acc) {
  var exit = 0;
  var p;
  var size;
  var s;
  var p$1;
  var size$1;
  var c;
  if (typeof acc === "number") {
    return /* () */0;
  }
  else {
    switch (acc.tag | 0) {
      case 0 : 
          output_acc(ppf, acc[0]);
          return output_formatting_lit(ppf, acc[1]);
      case 1 : 
          var match = acc[1];
          var p$2 = acc[0];
          output_acc(ppf, p$2);
          if (match.tag) {
            var match$1 = CamlinternalFormat.open_box_of_string(compute_tag(output_acc, match[0]));
            return pp_open_box_gen(ppf, match$1[0], match$1[1]);
          }
          else {
            return pp_open_tag(ppf, compute_tag(output_acc, match[0]));
          }
          break;
      case 2 : 
          var p$3 = acc[0];
          var exit$1 = 0;
          if (typeof p$3 === "number") {
            exit$1 = 3;
          }
          else if (p$3.tag) {
            exit$1 = 3;
          }
          else {
            var match$2 = p$3[1];
            if (typeof match$2 === "number") {
              exit$1 = 3;
            }
            else if (match$2.tag === 1) {
              p = p$3[0];
              size = match$2[1];
              s = acc[1];
              exit = 1;
            }
            else {
              exit$1 = 3;
            }
          }
          if (exit$1 === 3) {
            output_acc(ppf, p$3);
            return pp_print_string(ppf, acc[1]);
          }
          break;
      case 3 : 
          var p$4 = acc[0];
          var exit$2 = 0;
          if (typeof p$4 === "number") {
            exit$2 = 3;
          }
          else if (p$4.tag) {
            exit$2 = 3;
          }
          else {
            var match$3 = p$4[1];
            if (typeof match$3 === "number") {
              exit$2 = 3;
            }
            else if (match$3.tag === 1) {
              p$1 = p$4[0];
              size$1 = match$3[1];
              c = acc[1];
              exit = 2;
            }
            else {
              exit$2 = 3;
            }
          }
          if (exit$2 === 3) {
            output_acc(ppf, p$4);
            return pp_print_char(ppf, acc[1]);
          }
          break;
      case 4 : 
          var p$5 = acc[0];
          var exit$3 = 0;
          if (typeof p$5 === "number") {
            exit$3 = 3;
          }
          else if (p$5.tag) {
            exit$3 = 3;
          }
          else {
            var match$4 = p$5[1];
            if (typeof match$4 === "number") {
              exit$3 = 3;
            }
            else if (match$4.tag === 1) {
              p = p$5[0];
              size = match$4[1];
              s = acc[1];
              exit = 1;
            }
            else {
              exit$3 = 3;
            }
          }
          if (exit$3 === 3) {
            output_acc(ppf, p$5);
            return pp_print_string(ppf, acc[1]);
          }
          break;
      case 5 : 
          var p$6 = acc[0];
          var exit$4 = 0;
          if (typeof p$6 === "number") {
            exit$4 = 3;
          }
          else if (p$6.tag) {
            exit$4 = 3;
          }
          else {
            var match$5 = p$6[1];
            if (typeof match$5 === "number") {
              exit$4 = 3;
            }
            else if (match$5.tag === 1) {
              p$1 = p$6[0];
              size$1 = match$5[1];
              c = acc[1];
              exit = 2;
            }
            else {
              exit$4 = 3;
            }
          }
          if (exit$4 === 3) {
            output_acc(ppf, p$6);
            return pp_print_char(ppf, acc[1]);
          }
          break;
      case 6 : 
          output_acc(ppf, acc[0]);
          return Caml_curry.app1(acc[1], ppf);
      case 7 : 
          output_acc(ppf, acc[0]);
          return pp_print_flush(ppf, /* () */0);
      case 8 : 
          output_acc(ppf, acc[0]);
          throw [
                Caml_builtin_exceptions.Invalid_argument,
                acc[1]
              ];
      
    }
  }
  switch (exit) {
    case 1 : 
        output_acc(ppf, p);
        return pp_print_as_size(ppf, size, s);
    case 2 : 
        output_acc(ppf, p$1);
        return pp_print_as_size(ppf, size$1, $$String.make(1, c));
    
  }
}

function strput_acc(ppf, acc) {
  var exit = 0;
  var p;
  var size;
  var s;
  var p$1;
  var size$1;
  var c;
  if (typeof acc === "number") {
    return /* () */0;
  }
  else {
    switch (acc.tag | 0) {
      case 0 : 
          strput_acc(ppf, acc[0]);
          return output_formatting_lit(ppf, acc[1]);
      case 1 : 
          var match = acc[1];
          var p$2 = acc[0];
          strput_acc(ppf, p$2);
          if (match.tag) {
            var match$1 = CamlinternalFormat.open_box_of_string(compute_tag(strput_acc, match[0]));
            return pp_open_box_gen(ppf, match$1[0], match$1[1]);
          }
          else {
            return pp_open_tag(ppf, compute_tag(strput_acc, match[0]));
          }
          break;
      case 2 : 
          var p$3 = acc[0];
          var exit$1 = 0;
          if (typeof p$3 === "number") {
            exit$1 = 3;
          }
          else if (p$3.tag) {
            exit$1 = 3;
          }
          else {
            var match$2 = p$3[1];
            if (typeof match$2 === "number") {
              exit$1 = 3;
            }
            else if (match$2.tag === 1) {
              p = p$3[0];
              size = match$2[1];
              s = acc[1];
              exit = 1;
            }
            else {
              exit$1 = 3;
            }
          }
          if (exit$1 === 3) {
            strput_acc(ppf, p$3);
            return pp_print_string(ppf, acc[1]);
          }
          break;
      case 3 : 
          var p$4 = acc[0];
          var exit$2 = 0;
          if (typeof p$4 === "number") {
            exit$2 = 3;
          }
          else if (p$4.tag) {
            exit$2 = 3;
          }
          else {
            var match$3 = p$4[1];
            if (typeof match$3 === "number") {
              exit$2 = 3;
            }
            else if (match$3.tag === 1) {
              p$1 = p$4[0];
              size$1 = match$3[1];
              c = acc[1];
              exit = 2;
            }
            else {
              exit$2 = 3;
            }
          }
          if (exit$2 === 3) {
            strput_acc(ppf, p$4);
            return pp_print_char(ppf, acc[1]);
          }
          break;
      case 4 : 
          var p$5 = acc[0];
          var exit$3 = 0;
          if (typeof p$5 === "number") {
            exit$3 = 3;
          }
          else if (p$5.tag) {
            exit$3 = 3;
          }
          else {
            var match$4 = p$5[1];
            if (typeof match$4 === "number") {
              exit$3 = 3;
            }
            else if (match$4.tag === 1) {
              p = p$5[0];
              size = match$4[1];
              s = acc[1];
              exit = 1;
            }
            else {
              exit$3 = 3;
            }
          }
          if (exit$3 === 3) {
            strput_acc(ppf, p$5);
            return pp_print_string(ppf, acc[1]);
          }
          break;
      case 5 : 
          var p$6 = acc[0];
          var exit$4 = 0;
          if (typeof p$6 === "number") {
            exit$4 = 3;
          }
          else if (p$6.tag) {
            exit$4 = 3;
          }
          else {
            var match$5 = p$6[1];
            if (typeof match$5 === "number") {
              exit$4 = 3;
            }
            else if (match$5.tag === 1) {
              p$1 = p$6[0];
              size$1 = match$5[1];
              c = acc[1];
              exit = 2;
            }
            else {
              exit$4 = 3;
            }
          }
          if (exit$4 === 3) {
            strput_acc(ppf, p$6);
            return pp_print_char(ppf, acc[1]);
          }
          break;
      case 6 : 
          var p$7 = acc[0];
          var exit$5 = 0;
          if (typeof p$7 === "number") {
            exit$5 = 3;
          }
          else if (p$7.tag) {
            exit$5 = 3;
          }
          else {
            var match$6 = p$7[1];
            if (typeof match$6 === "number") {
              exit$5 = 3;
            }
            else if (match$6.tag === 1) {
              strput_acc(ppf, p$7[0]);
              return pp_print_as_size(ppf, match$6[1], Caml_curry.app1(acc[1], /* () */0));
            }
            else {
              exit$5 = 3;
            }
          }
          if (exit$5 === 3) {
            strput_acc(ppf, p$7);
            return pp_print_string(ppf, Caml_curry.app1(acc[1], /* () */0));
          }
          break;
      case 7 : 
          strput_acc(ppf, acc[0]);
          return pp_print_flush(ppf, /* () */0);
      case 8 : 
          strput_acc(ppf, acc[0]);
          throw [
                Caml_builtin_exceptions.Invalid_argument,
                acc[1]
              ];
      
    }
  }
  switch (exit) {
    case 1 : 
        strput_acc(ppf, p);
        return pp_print_as_size(ppf, size, s);
    case 2 : 
        strput_acc(ppf, p$1);
        return pp_print_as_size(ppf, size$1, $$String.make(1, c));
    
  }
}

function kfprintf(k, o, param) {
  return CamlinternalFormat.make_printf(function (o, acc) {
              output_acc(o, acc);
              return Caml_curry.app1(k, o);
            }, o, /* End_of_acc */0, param[0]);
}

function ikfprintf(k, x, param) {
  return CamlinternalFormat.make_printf(function (_, _$1) {
              return Caml_curry.app1(k, x);
            }, x, /* End_of_acc */0, param[0]);
}

function fprintf(ppf, fmt) {
  return kfprintf(function (prim) {
              return prim;
            }, ppf, fmt);
}

function ifprintf(ppf, fmt) {
  return ikfprintf(function (prim) {
              return prim;
            }, ppf, fmt);
}

function printf(fmt) {
  return fprintf(std_formatter, fmt);
}

function eprintf(fmt) {
  return fprintf(err_formatter, fmt);
}

function ksprintf(k, param) {
  var b = Buffer.create(512);
  var ppf = formatter_of_buffer(b);
  var k$prime = function (_, acc) {
    strput_acc(ppf, acc);
    return Caml_curry.app1(k, flush_buf_formatter(b, ppf));
  };
  return CamlinternalFormat.make_printf(k$prime, /* () */0, /* End_of_acc */0, param[0]);
}

function sprintf(fmt) {
  return ksprintf(function (s) {
              return s;
            }, fmt);
}

function asprintf(param) {
  var b = Buffer.create(512);
  var ppf = formatter_of_buffer(b);
  var k$prime = function (ppf, acc) {
    output_acc(ppf, acc);
    pp_flush_queue(ppf, /* false */0);
    return flush_buf_formatter(b, ppf);
  };
  return CamlinternalFormat.make_printf(k$prime, ppf, /* End_of_acc */0, param[0]);
}

function bprintf(b, param) {
  var k = function (ppf, acc) {
    output_acc(ppf, acc);
    return pp_flush_queue(ppf, /* false */0);
  };
  return CamlinternalFormat.make_printf(k, formatter_of_buffer(b), /* End_of_acc */0, param[0]);
}

Pervasives.at_exit(print_flush);

var kprintf = ksprintf;

exports.open_box                              = open_box;
exports.close_box                             = close_box;
exports.print_string                          = print_string;
exports.print_as                              = print_as;
exports.print_int                             = print_int;
exports.print_float                           = print_float;
exports.print_char                            = print_char;
exports.print_bool                            = print_bool;
exports.print_space                           = print_space;
exports.print_cut                             = print_cut;
exports.print_break                           = print_break;
exports.print_flush                           = print_flush;
exports.print_newline                         = print_newline;
exports.force_newline                         = force_newline;
exports.print_if_newline                      = print_if_newline;
exports.set_margin                            = set_margin;
exports.get_margin                            = get_margin;
exports.set_max_indent                        = set_max_indent;
exports.get_max_indent                        = get_max_indent;
exports.set_max_boxes                         = set_max_boxes;
exports.get_max_boxes                         = get_max_boxes;
exports.over_max_boxes                        = over_max_boxes;
exports.open_hbox                             = open_hbox;
exports.open_vbox                             = open_vbox;
exports.open_hvbox                            = open_hvbox;
exports.open_hovbox                           = open_hovbox;
exports.open_tbox                             = open_tbox;
exports.close_tbox                            = close_tbox;
exports.print_tbreak                          = print_tbreak;
exports.set_tab                               = set_tab;
exports.print_tab                             = print_tab;
exports.set_ellipsis_text                     = set_ellipsis_text;
exports.get_ellipsis_text                     = get_ellipsis_text;
exports.open_tag                              = open_tag;
exports.close_tag                             = close_tag;
exports.set_tags                              = set_tags;
exports.set_print_tags                        = set_print_tags;
exports.set_mark_tags                         = set_mark_tags;
exports.get_print_tags                        = get_print_tags;
exports.get_mark_tags                         = get_mark_tags;
exports.set_formatter_out_channel             = set_formatter_out_channel;
exports.set_formatter_output_functions        = set_formatter_output_functions;
exports.get_formatter_output_functions        = get_formatter_output_functions;
exports.set_formatter_out_functions           = set_formatter_out_functions;
exports.get_formatter_out_functions           = get_formatter_out_functions;
exports.set_formatter_tag_functions           = set_formatter_tag_functions;
exports.get_formatter_tag_functions           = get_formatter_tag_functions;
exports.formatter_of_out_channel              = formatter_of_out_channel;
exports.std_formatter                         = std_formatter;
exports.err_formatter                         = err_formatter;
exports.formatter_of_buffer                   = formatter_of_buffer;
exports.stdbuf                                = stdbuf;
exports.str_formatter                         = str_formatter;
exports.flush_str_formatter                   = flush_str_formatter;
exports.make_formatter                        = make_formatter;
exports.pp_open_hbox                          = pp_open_hbox;
exports.pp_open_vbox                          = pp_open_vbox;
exports.pp_open_hvbox                         = pp_open_hvbox;
exports.pp_open_hovbox                        = pp_open_hovbox;
exports.pp_open_box                           = pp_open_box;
exports.pp_close_box                          = pp_close_box;
exports.pp_open_tag                           = pp_open_tag;
exports.pp_close_tag                          = pp_close_tag;
exports.pp_print_string                       = pp_print_string;
exports.pp_print_as                           = pp_print_as;
exports.pp_print_int                          = pp_print_int;
exports.pp_print_float                        = pp_print_float;
exports.pp_print_char                         = pp_print_char;
exports.pp_print_bool                         = pp_print_bool;
exports.pp_print_break                        = pp_print_break;
exports.pp_print_cut                          = pp_print_cut;
exports.pp_print_space                        = pp_print_space;
exports.pp_force_newline                      = pp_force_newline;
exports.pp_print_flush                        = pp_print_flush;
exports.pp_print_newline                      = pp_print_newline;
exports.pp_print_if_newline                   = pp_print_if_newline;
exports.pp_open_tbox                          = pp_open_tbox;
exports.pp_close_tbox                         = pp_close_tbox;
exports.pp_print_tbreak                       = pp_print_tbreak;
exports.pp_set_tab                            = pp_set_tab;
exports.pp_print_tab                          = pp_print_tab;
exports.pp_set_tags                           = pp_set_tags;
exports.pp_set_print_tags                     = pp_set_print_tags;
exports.pp_set_mark_tags                      = pp_set_mark_tags;
exports.pp_get_print_tags                     = pp_get_print_tags;
exports.pp_get_mark_tags                      = pp_get_mark_tags;
exports.pp_set_margin                         = pp_set_margin;
exports.pp_get_margin                         = pp_get_margin;
exports.pp_set_max_indent                     = pp_set_max_indent;
exports.pp_get_max_indent                     = pp_get_max_indent;
exports.pp_set_max_boxes                      = pp_set_max_boxes;
exports.pp_get_max_boxes                      = pp_get_max_boxes;
exports.pp_over_max_boxes                     = pp_over_max_boxes;
exports.pp_set_ellipsis_text                  = pp_set_ellipsis_text;
exports.pp_get_ellipsis_text                  = pp_get_ellipsis_text;
exports.pp_set_formatter_out_channel          = pp_set_formatter_out_channel;
exports.pp_set_formatter_output_functions     = pp_set_formatter_output_functions;
exports.pp_get_formatter_output_functions     = pp_get_formatter_output_functions;
exports.pp_set_formatter_tag_functions        = pp_set_formatter_tag_functions;
exports.pp_get_formatter_tag_functions        = pp_get_formatter_tag_functions;
exports.pp_set_formatter_out_functions        = pp_set_formatter_out_functions;
exports.pp_get_formatter_out_functions        = pp_get_formatter_out_functions;
exports.pp_print_list                         = pp_print_list;
exports.pp_print_text                         = pp_print_text;
exports.fprintf                               = fprintf;
exports.printf                                = printf;
exports.eprintf                               = eprintf;
exports.sprintf                               = sprintf;
exports.asprintf                              = asprintf;
exports.ifprintf                              = ifprintf;
exports.kfprintf                              = kfprintf;
exports.ikfprintf                             = ikfprintf;
exports.ksprintf                              = ksprintf;
exports.bprintf                               = bprintf;
exports.kprintf                               = kprintf;
exports.set_all_formatter_output_functions    = set_all_formatter_output_functions;
exports.get_all_formatter_output_functions    = get_all_formatter_output_functions;
exports.pp_set_all_formatter_output_functions = pp_set_all_formatter_output_functions;
exports.pp_get_all_formatter_output_functions = pp_get_all_formatter_output_functions;
/* blank_line Not a pure module */
