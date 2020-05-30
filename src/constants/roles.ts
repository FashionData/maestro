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
    name: "Suspended"
  },
  [Roles.Viewer]: {
    code: Roles.Viewer,
    name: "Viewer"
  },
  [Roles.User]: {
    code: Roles.User,
    name: "User"
  },
  [Roles.Writer]: {
    code: Roles.Writer,
    name: "Writer"
  },
  [Roles.Admin]: {
    code: Roles.Admin,
    name: "Admin"
  },
  [Roles.SuperAdmin]: {
    code: Roles.SuperAdmin,
    name: "Super Admin"
  }
};
