export interface CreateUserPayload {
  email: string;
  emailVerified: boolean;
  password?: string;
  displayName?: string;
  photoURL?: string;
  disabled: string;
  role?: number;
}
