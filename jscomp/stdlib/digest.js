// Generated CODE, PLEASE EDIT WITH CARE
'use strict';

var Caml_builtin_exceptions = require("../runtime/caml_builtin_exceptions");
var Pervasives              = require("./pervasives");
var Char                    = require("./char");
var Caml_primitive          = require("../runtime/caml_primitive");
var $$String                = require("./string");
var Caml_string             = require("../runtime/caml_string");

function string(str) {
  return Caml_primitive.caml_md5_string(str, 0, str.length);
}

function bytes(b) {
  return string(Caml_string.bytes_to_string(b));
}

function substring(str, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > str.length - len) {
    throw [
          Caml_builtin_exceptions.Invalid_argument,
          "Digest.substring"
        ];
  }
  else {
    return Caml_primitive.caml_md5_string(str, ofs, len);
  }
}

function subbytes(b, ofs, len) {
  return substring(Caml_string.bytes_to_string(b), ofs, len);
}

function file(filename) {
  var ic = Pervasives.open_in_bin(filename);
  var exit = 0;
  var d;
  try {
    d = Caml_primitive.caml_md5_chan(ic, -1);
    exit = 1;
  }
  catch (e){
    Caml_primitive.caml_ml_close_channel(ic);
    throw e;
  }
  if (exit === 1) {
    Caml_primitive.caml_ml_close_channel(ic);
    return d;
  }
  
}

function output(chan, digest) {
  return Pervasives.output_string(chan, digest);
}

function input(chan) {
  return Pervasives.really_input_string(chan, 16);
}

function char_hex(n) {
  return n + (
          n < 10 ? /* "0" */48 : 87
        );
}

function to_hex(d) {
  var result = new Array(32);
  for(var i = 0; i<= 15; ++i){
    var x = d.charCodeAt(i);
    result[i * 2] = char_hex((x >>> 4));
    result[i * 2 + 1] = char_hex(x & 15);
  }
  return Caml_string.bytes_to_string(result);
}

function from_hex(s) {
  if (s.length !== 32) {
    throw [
          Caml_builtin_exceptions.Invalid_argument,
          "Digest.from_hex"
        ];
  }
  var digit = function (c) {
    if (c >= 65) {
      if (c >= 97) {
        if (c >= 103) {
          throw [
                Caml_builtin_exceptions.Invalid_argument,
                "Digest.from_hex"
              ];
        }
        else {
          return c - /* "a" */97 + 10;
        }
      }
      else if (c >= 71) {
        throw [
              Caml_builtin_exceptions.Invalid_argument,
              "Digest.from_hex"
            ];
      }
      else {
        return c - /* "A" */65 + 10;
      }
    }
    else if (c > 57 || c < 48) {
      throw [
            Caml_builtin_exceptions.Invalid_argument,
            "Digest.from_hex"
          ];
    }
    else {
      return c - /* "0" */48;
    }
  };
  var $$byte = function (i) {
    return (digit(s.charCodeAt(i)) << 4) + digit(s.charCodeAt(i + 1));
  };
  var result = new Array(16);
  for(var i = 0; i<= 15; ++i){
    result[i] = Char.chr($$byte(2 * i));
  }
  return Caml_string.bytes_to_string(result);
}

var compare = $$String.compare;

exports.compare   = compare;
exports.string    = string;
exports.bytes     = bytes;
exports.substring = substring;
exports.subbytes  = subbytes;
exports.file      = file;
exports.output    = output;
exports.input     = input;
exports.to_hex    = to_hex;
exports.from_hex  = from_hex;
/* No side effect */
