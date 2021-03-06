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



module E = Js_exp_make

open Parsetree_util

type external_module_name = 
  | Single of string 
  | Bind of string * string 

type 'a external_module = {
  txt : 'a ;
  external_module_name : external_module_name option;
}

let handle_external module_name = 
  begin 
    match module_name with 
    | Some module_name -> 
      (* 
         [@@js.module "react"]
         [@@js.module "react"]
         ---
         [@@js.module "@" "react"]
         [@@js.module "@" "react"]
         They should have the same module name 

         TODO: we should emit an warning if we bind 
         two external files to the same module name
       *)
      let id  = 
        match module_name with 
        | Single module_name -> 
          (Lam_compile_env.add_js_module module_name , module_name)
        | Bind (module_name, name) -> 
          (Lam_compile_env.add_js_module 
             ~id:(Ext_ident.create_js_module name) module_name,
           module_name)
      in Some id 
    | None -> None 
  end

type js_call = { 
  splice : bool ;
  qualifiers : string list;
  name : string;
}

type js_send = { 
  splice : bool ; 
  name : string 
} (* we know it is a js send, but what will happen if you pass an ocaml objct *)

type js_global = { 
  name : string ;
  external_module_name : external_module_name option;
  (* TODO: handle this logic *)
} 

type js_new = {  name : string }

type ffi = 
  | Obj_create 
  | Js_global of js_global 
  | Js_call of js_call external_module
  | Js_send of js_send
  | Js_new of js_new external_module
  | Normal 

let handle_attributes (prim_attributes : Parsetree.attributes) : ffi  = 
  let qualifiers = ref [] in
  let call_name = ref None in
  let external_module_name  = ref None in
  let is_obj =  ref false in
  let js_global = ref `None in
  let js_send = ref `None in
  let js_splice = ref false in
  let start_loc : Location.t option ref = ref None in
  let finish_loc = ref None in
  let js_new = ref None in
  let () = 
    prim_attributes |> List.iter
      (fun ((( x : string Asttypes.loc ), pay_load) : Parsetree.attribute) -> 
         (if !start_loc = None  then 
            start_loc := Some x.loc 
         ); 
         (finish_loc := Some x.loc);
         match x.txt with  (* TODO: Check duplicate attributes *)
         | "js.global"
           -> 
           begin  match is_single_string pay_load with
             | Some name -> 
               js_global := `Value name 
             | None -> () (* we can report error here ... *)
           end
         |"js.splice"
           -> 
           js_splice := true

         |"js.send" 
           ->
           begin match is_single_string pay_load with 
             | Some name -> js_send := `Value name
             | None -> ()
           end
         | "js.call"
           ->
           begin match is_single_string pay_load with 
             | Some name -> call_name :=  Some (x.loc, name)
             | None -> ()
           end
         | "js.module" -> 
           begin match is_string_or_strings pay_load with 
             | `Single name -> external_module_name:= Some (Single name)
             | `Some [a;b] -> external_module_name := Some (Bind (a,b))
             | `Some _ -> ()
             | `None -> () 
           end
         (* -- no scope -- could have 
            [@@js.module "./react.js"]
            [@@js.module "react-dom" "React"]
         *)
         | "js.scope"
           -> 
           begin match is_string_or_strings pay_load with 
             | `None -> ()
             | `Single name -> qualifiers := [name]
             | `Some vs -> qualifiers := List.rev vs 
           end
         | "js.new" -> 
           begin match is_single_string pay_load with 
             | None -> ()
             | Some x -> js_new := Some x 
           end
         |"js.obj"
           -> 
           is_obj := true
         | _ ->  () (* ignore *)
      ) in
  let loc : Location.t option  = 
    match !start_loc, !finish_loc  with
    | None, None -> None 
    | Some {loc_start;_}, Some{loc_end; _} -> Some {loc_start; loc_end; loc_ghost = false}
    | _ -> assert false in
    if !is_obj then Obj_create 
    else 
      begin match !call_name, !js_global, !js_send, !js_new  with 
      | Some (_,fn),
        `None, `None, _ -> 
          Js_call { txt = { splice = !js_splice; qualifiers = !qualifiers; name = fn};
                  external_module_name = !external_module_name}
      | None, `Value name, `None,_  ->  
          Js_global {name = name; external_module_name = !external_module_name}
      | None, `None, `Value name, _  -> 
          Js_send {splice = !js_splice; name }
      |   None, `None, `None, Some name -> 
          Js_new { txt = { name  };
                   external_module_name = ! external_module_name}
      |  None, `None, `None, None -> Normal 
      | _ -> 
          Location.raise_errorf ?loc "Ill defined attribute"
      end

    (* Given label, type and the argument --> encode it into 
       javascript meaningful value 
       -- check whether splice or not for the last element
     *)
    (*
      special treatment to None for [js.call] as well
      None --> null or undefined 
      Some -> original value
      unit -->
     *)

let ocaml_to_js last (js_splice : bool) ((label : string), (ty : Types.type_expr)) (arg : J.expression) 
  : E.t list = 
  if last && js_splice 
  then 
    match ty with 
    | { desc = Tconstr(p,_,_) } when Path.same p Predef.path_array -> 
      begin 
        match arg with 
        | {expression_desc = Array (ls,_mutable_flag) } -> 
          ls (* Invariant : Array encoding *)
        | _ -> 
          assert false  (* TODO: fix splice *)
      end
    | _ -> assert false
  else
    match ty, Type_util.label_name label with 
    | { desc = Tconstr(p,_, _)}, _ when Path.same p Predef.path_unit -> []
    | { desc = Tconstr(p,_,_) }, _ when Path.same p Predef.path_bool -> 
      begin 
        match arg.expression_desc with 
        | Number (Int {i = 0l; _} 
        (* | Float {f = "0."} This should not happen *)
       ) ->  [E.caml_false]
        | Number _ -> [E.caml_true]
        | _ -> [E.econd arg E.caml_true E.caml_false]
      end

    | _, `Optional label -> 
      begin 
        match (arg.expression_desc) with 
        | Array ([x;y],_mutable_flag)  ->
          [ y] (*Invrariant: optional encoding*)
        | Number _ -> (*Invariant: None encoding*)
          [ E.nil ] 
        (* when no argumet is supplied, [undefined] 
           if we detect that all rest arguments are [null], 
           we can remove them
        *)
        | _ ->  (* FIXME: avoid duplicate evlauation of [arg] when it
                   is not a variable
                *)
          (* | Var _  ->  *)
          (* can only bd detected at runtime thing *)
          (* (E.bin EqEqEq (E.typeof arg) *)
          (*   (E.str "number")) *)

          [E.econd arg
             (Js_of_lam_option.get arg )
             E.undefined
             ]

      end
    | _ ->  [arg]  
          

let translate 
    (cxt  : Lam_compile_defs.cxt)
    ({prim_attributes; prim_ty } as prim : Types.type_expr option Primitive.description) 
    (args : J.expression list) = 
  begin 
    match handle_attributes prim_attributes with 
    | Obj_create -> 
      begin 
        match prim_ty with 
        | Some ty -> 
          let _return_type, arg_types = Type_util.list_of_arrow ty in
          let kvs : J.property_map = 
            Ext_list.filter_map2 (fun (label, (ty : Types.type_expr)) (arg : J.expression) -> 
                match ty.desc, Type_util.label_name label with 
                | Tconstr(p,_, _), _ when Path.same p Predef.path_unit -> None
                | Tconstr(p,_,_), `Label label  when Path.same p Predef.path_bool -> 
                  begin 
                    match arg.expression_desc with 
                    | Number ((* Float { f = "0."}| *) Int { i = 0l;_}) ->  Some (Js_op.Key label ,E.caml_false)
                    | Number _ -> Some (Js_op.Key label,E.caml_true)
                    | _ -> Some (Js_op.Key label, (E.econd arg E.caml_true E.caml_false))
                  end

                | _, `Label label -> 
                  Some (Js_op.Key label, arg)
                | _, `Optional label -> 
                  begin 
                    match (arg.expression_desc) with 
                    | Array ([x;y], _mutable_flag)  ->
                      Some (Js_op.Key label, y) (*Invrariant: optional encoding*)
                    | Number _ -> (*Invariant: None encoding*)
                      None
                    | _ ->  (* FIXME: avoid duplicate evlauation of [arg] when it
                               is not a variable [Var ]
                               can only bd detected at runtime thing *)
                      Some ( Key label, 
                             E.econd arg
                               (* (E.bin EqEqEq (E.typeof arg) *)
                               (*   (E.str "number")) *)

                               (Js_of_lam_option.get arg)
                               E.undefined
                           )

                  end)                   
              arg_types args 
              (* (Ext_list.exclude_tail arg_types) (Ext_list.exclude_tail args) *)
          in 
          E.obj kvs 
        | None -> assert false 

      end
    | Js_call{ external_module_name = module_name; 
               txt = { name = fn; splice = js_splice ; 
                       qualifiers;
                     }} -> 
      begin 
        match prim_ty with 
        | Some ty -> 
          let _return_type, arg_types = Type_util.list_of_arrow ty in
          let args = 
            Ext_list.flat_map2_last (ocaml_to_js js_splice) arg_types args  in 
          let qualifiers =  List.rev qualifiers in
          let fn =  
            match handle_external module_name with 
            | Some (id,_) -> 
              (* FIXME: need add dependency here
                  it's an external call 
              *)
              List.fold_left E.dot (E.var id) (qualifiers @ [ fn])
            | None -> 
              begin 
                match  qualifiers @ [fn] with 
                | y::ys  -> 
                  List.fold_left E.dot (E.js_var y) ys
                | _ -> assert false
              end
          in
          E.call ~info:{arity=Full} fn args
        | None -> assert false 
      end
    | Js_new { external_module_name = module_name; 
               txt = { name = fn};
             } -> 
      begin 
        match prim_ty with 
        | Some ty -> 
          let _return_type, arg_types = Type_util.list_of_arrow ty in
          let args = 
            Ext_list.flat_map2_last (ocaml_to_js false) arg_types args  in 
          let fn =  
            match handle_external module_name with 
            | Some (id,name) ->  
              E.external_var_dot id name fn

            | None -> 
              (** TODO: check, no [@@js.module], 
                  assume it's global *)
              E.js_var fn

          in
          (* This has some side effect, it will 
             mark its identifier (If it has) as an object,
             ATTENTION: 
             order also matters here, since we mark its jsobject property, 
             it  will affect the code gen later
             TODO: we should propagate this property 
             as much as we can(in alias table)
          *)
          (
            match cxt.st with 
            | Declare (_, id) | Assign id  ->
              (* Format.fprintf Format.err_formatter "%a@."Ident.print  id; *)
              Ext_ident.make_js_object id 
            | EffectCall | NeedValue -> ()
          );
          E.new_ fn args
        | None -> assert false 
      end
    | Js_global {name} -> 
      (* TODO #11
         1. check args -- error checking 
         2. support [@@js.scope "window"]
         we need know whether we should call [add_js_module] or not 
      *)
      E.var (Ext_ident.create_js name)
    | Js_send {splice  = js_splice ; name } -> 
      begin 
        match args , prim_ty with
        | self :: args, Some ty -> 
          let [@warning"-8"] (_return_type, self_type::arg_types )
            = Type_util.list_of_arrow ty in
          let args = Ext_list.flat_map2_last (ocaml_to_js js_splice) arg_types args in
          E.call ~info:{arity=Full}  (E.dot self name) args
        | _ -> assert false 
      end

    | Normal -> Lam_dispatch_primitive.query prim args 


  end

(* TODO:
  Also need to mark that CamlPrimtivie is used and
  add such dependency in
  module loader 
*)
