

let ff x =
  let a = 
    match x with
    | "0"
    |"1"
    |"2" -> 3
    | "3" -> 4 
    | "4" -> 6
    | "7" -> 7 
    | _ -> 8
  in a + 3


let gg x =
  let a = 
    match x with
    | 0
    | 1 
    | 2 -> 3
    | 3 -> 4 
    | 4 -> 6
    | 8 -> 7 
    | _ -> 8
  in a + 3

let rev_split_by_char c s = 
  let rec loop i l = 
    try 
      let i' = String.index_from s i c  in 
      let s' = String.sub s i (i' - i)  in 
      loop (i'+1) (if s' = "" then l else s'::l)  
    with Not_found -> (String.sub s i (String.length s - i) ):: l 
  in 
  loop 0 []

let xsplit ~delim s =
  let rec loop l = function
    | 0 -> l
    | i -> (
        match String.rindex_from s (i-1) delim  with
        | i' ->
          let l  = String.sub s (i'+1) (i - i'- 1) :: l in
          let l  = if i' = 0 then  ""::l else l in
          loop l i'
        | exception Not_found -> String.sub s 0 i :: l
      )
  in
  let len = String.length s in
  match len with
  | 0 -> []
  | _ -> loop [] len

open Mt

;; from_pair_suites __FILE__ [
  "mutliple switch", (fun _ -> 
      Eq(9, ff "4"));
  "int switch", (fun _ -> 
      Eq(9, gg 4));
  "escape_normal", (fun _ -> Eq("haha", String.escaped "haha"));
  "escape_bytes", (fun _ -> Eq( Bytes.of_string "haha", Bytes.escaped (Bytes.of_string "haha")));
  (* FIXME it used char pattern match *)
  "escape_quote", (fun _ ->
      Eq ("\\\"\\\"", String.escaped {|""|}));
  "rev_split_by_char", (fun _ -> 
      Eq ([""; "bbbb"; "bbbb"], rev_split_by_char 'a' "bbbbabbbba"));

  "xsplit", (fun _ -> Eq(["a";"b";"c"], xsplit ~delim:'.' "a.b.c") );
  "split_empty", (fun _ -> Eq([], Ext_string.split "" '_') );
  "rfind", (fun _ -> Eq( 7, Ext_string.rfind "__index__js" ~sub:"__"));
  "rfind_2", (fun _ -> Eq( 0, Ext_string.rfind "__index_js" ~sub:"__"));
  "rfind_3", (fun _ -> Eq( -1, Ext_string.rfind "_index_js" ~sub:"__"));
  "find", (fun _ -> Eq( 0, Ext_string.find "__index__js" ~sub:"__"));
  "find_2", (fun _ -> Eq( 6, Ext_string.find "_index__js" ~sub:"__"));
  "find_3", (fun _ -> Eq( -1, Ext_string.find "_index_js" ~sub:"__"));
]
