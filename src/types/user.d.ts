enum UserStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface User {
  id: string;
  name: string;
  status: UserStatus;
}

export interface GetUsersResponse {
  users: User[];
}
