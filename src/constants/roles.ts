export enum Roles {
  Suspended = 0,
  Viewer = 1,
  User = 3,
  Writer = 5,
  Admin = 7,
  SuperAdmin = 9
}

export interface Role {
  name: string;
  code: number;
}

export const ROLES: { [role in Roles]: Role } = {
  [Roles.Suspended]: {
    code: Roles.Suspended,
    name: "role.suspended"
  },
  [Roles.Viewer]: {
    code: Roles.Viewer,
    name: "role.viewer"
  },
  [Roles.User]: {
    code: Roles.User,
    name: "role.user"
  },
  [Roles.Writer]: {
    code: Roles.Writer,
    name: "role.writer"
  },
  [Roles.Admin]: {
    code: Roles.Admin,
    name: "role.admin"
  },
  [Roles.SuperAdmin]: {
    code: Roles.SuperAdmin,
    name: "role.superAdmin"
  }
};
