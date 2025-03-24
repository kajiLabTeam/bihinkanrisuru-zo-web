import type { UserStatus as UserStatusValue } from '@/constants';

export interface User {
  id: string;
  name: string;
  status: UserStatus;
}

export interface GetUsersResponse {
  users: User[];
}

export type GetUserResponse = User;
export type UserStatus = (typeof UserStatusValue)[keyof typeof UserStatusValue];
