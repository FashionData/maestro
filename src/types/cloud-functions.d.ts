export interface CreateUserPayload {
  email: string;
  emailVerified: boolean;
  password?: string;
  displayName?: string;
  photoURL?: string;
  disabled: boolean;
  role?: number;
  accountsRole: string[];
}

export interface UpdateUserPayload extends CreateUserPayload {
  uid: string;
}
