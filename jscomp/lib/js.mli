(* BuckleScript compiler
 * Copyright (C) 2015-2016 Bloomberg Finance L.P.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, with linking exception;
 * either version 2.1 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 *)

(* Author: Hongbo Zhang  *)

(** Common utils for js interoperation *)

(** [typeof x] is equivalent to [typeof x] in js *)
external typeof : 'a -> string = "js_typeof"

(** [to_json_string x] is equivalent to [JSON.stringify x] 
    This function is provided for convenice, more complete features 
    should be consulted to third party JSON bindings
*)
external to_json_string : 'a -> string = "js_json_stringify"

(**
   [log x] is equivalent to [console.log(x)] except that
   the return value is [unit] instead of [undefined]
*)
external log : 'a -> unit = "js_dump"


external anything_to_string : 'a -> string = "js_anything_to_string"

type + 'a opt

external from_opt : 'a opt -> 'a option = "js_from_nullable"

external to_opt : 'a  -> 'a opt = "%identity"

external nil : 'a opt = "js_null" [@@js.global]


type + 'a def
external from_def : 'a def -> 'a option = "js_from_def"
external to_def : 'a -> 'a def = "%identity"
external is_undef : 'a def -> bool =  "js_is_undef"
external undef : 'a def = "js_undefined" [@@js.global]


external unsafe_js_expr : string -> 'a = "js_pure_expr"

external is_nil : 'a opt -> bool = "js_is_nil"



type boolean 

external true_ : boolean = "js_true" [@@js.global]
external false_ : boolean = "js_false" [@@js.global]
external to_bool : boolean -> bool = "js_boolean_to_bool" 
