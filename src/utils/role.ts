import * as fb from "firebase";
import { Role, Roles, ROLES } from "../constants";

export const getRole = (token: fb.auth.IdTokenResult): Role =>
  ROLES[(token.claims.role as Roles) ?? 0];
