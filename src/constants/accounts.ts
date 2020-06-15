export enum AccountStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  Archived = 'ARCHIVED',
}

export interface AccountStatusObject {
  name: string;
  value: string;
}

export const STATUSES: { [status in AccountStatus]: AccountStatusObject } = {
  [AccountStatus.Active]: {
    name: 'accountStatus.active',
    value: AccountStatus.Active,
  },
  [AccountStatus.Disabled]: {
    name: 'accountStatus.disabled',
    value: AccountStatus.Disabled,
  },
  [AccountStatus.Archived]: {
    name: 'accountStatus.archived',
    value: AccountStatus.Archived,
  },
};
