export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'USER';
  active: boolean;
  createdAt?: string;
}
