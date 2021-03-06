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



(** Beta reduction of lambda IR *)


val beta_reduce : Ident.t list -> Lambda.lambda -> Lambda.lambda list -> Lambda.lambda
(* Compile-time beta-reduction of functions immediately applied:
      Lapply(Lfunction(Curried, params, body), args, loc) ->
        let paramN = argN in ... let param1 = arg1 in body
      Lapply(Lfunction(Tupled, params, body), [Lprim(Pmakeblock(args))], loc) ->
        let paramN = argN in ... let param1 = arg1 in body
   Assumes |args| = |params|.
*)

(*
   Refresh all the identifiers, 
   otherwise the identifier property can not be preserved, 
   the obvious example is parameter
 *)

val propogate_beta_reduce : 
  Lam_stats.meta -> 
  Ident.t list -> 
  Lambda.lambda -> 
  Lambda.lambda list -> 
  Lambda.lambda


val refresh : 
  Lambda.lambda -> 
  Lambda.lambda 

(** 
   {[ Lam_beta_reduce.propogate_beta_reduce_with_map meta param_map params body args]}
   [param_map] collect the usage of parameters, 
   it can be  produced by 
   {[!Lam_analysis.free_variables meta.export_idents 
       (Lam_analysis.param_map_of_list params) body]}
*)
val propogate_beta_reduce_with_map : 
  Lam_stats.meta ->
  Lam_analysis.stats Ident_map.t ->
  Ident.t list ->
  Lambda.lambda -> Lambda.lambda list -> Lambda.lambda
