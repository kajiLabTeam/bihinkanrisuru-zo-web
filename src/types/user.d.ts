import type { UserStatus as UserStatusValue } from '@/constants';

export interface User {
  id: string;
  name: string;
  status: UserStatus;
}

export interface GetUsersResponse {
  users: User[];
}

export interface PostUserRequest {
  id: string;
  name: string;
}

export type PostUserResponse = User;

export interface PutUserRequest {
  name: string;
  status: UserStatus;
}

export type GetUserResponse = User;
export type UserStatus = (typeof UserStatusValue)[keyof typeof UserStatusValue];
