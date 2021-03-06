


external describe : string -> ((unit -> unit)[@js.nullary]) -> unit = "" 
    [@@js.call "describe"]

external it : string -> (unit -> unit) -> unit = "" [@@js.call "it"]

external eq : 'a -> 'a -> unit = "" 
    [@@js.call "deepEqual"]
    [@@js.module "assert"]

external neq : 'a -> 'a -> unit = "" 
    [@@js.call "notDeepEqual"]
    [@@js.module "assert"]

(* external dump : 'a array -> unit = "js_dump" [@@js.splice] *)

external dump : 'a array -> unit = "" [@@js.call "console.log"] [@@js.splice]
(** There is a problem --
    it does not return [unit ]
 *)

let assert_equal = eq 
let assert_notequal = neq
(* assert -- raises an AssertionError which mocha handls better
*)
let from_suites name (suite :  (string * ('a -> unit)) list) = 
  describe name (fun _ -> 
    List.iter (fun (name, code) -> it name code) suite)

type _ eq = 
  | Eq :  'a *'a  -> _ eq
  | Neq : 'a * 'a -> _ eq
  | Approx : float * float -> _ eq  
  (* TODO: | Exception : exn -> (unit -> unit) -> _ eq  *)

type 'a pair_suites = (string * (unit -> 'a eq)) list

let close_enough x y = 
  abs_float (x -. y) < (* epsilon_float *) 0.0000001

let from_pair_suites name (suites : 'a pair_suites) = 
  describe name (fun _ -> 
    List.iter (fun (name, code) -> 
      it name (fun _ -> 
              match code () with 
              | Eq(a,b) -> assert_equal a b 
              | Neq(a,b) -> assert_notequal a b 
              | Approx(a,b) 
                -> 
                assert (close_enough a b)
            )
              ) suites
                ) 
