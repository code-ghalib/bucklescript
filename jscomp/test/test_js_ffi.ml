external log  : 'a -> unit = "caml_ignore"  [@@js.call "console.log"]
(** we should also allow js function call from an external js module 
    
*)

let v u = 
  log u;
  u

external test_f : (module Set.OrderedType) -> unit = "caml_update_dummy" [@@js.call "t"]

let v u =  test_f (module String)

module type X = module type of String


let u (v : (module X)) = v


let s =  u (module String)
