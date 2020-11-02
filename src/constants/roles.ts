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

export interface AccountRole {
  name: string;
  identifier: string;
  role: Role;
}

export interface CFAccountRole extends AccountRole {
  description: string;
  contact: string;
  bigQuery: {
    account: string,
    datasets: {
      sda: string,
      bda: string,
    }
  };
  status: "ACTIVE" | "DISABLED" | "ARCHIVED";
  website: string;
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
