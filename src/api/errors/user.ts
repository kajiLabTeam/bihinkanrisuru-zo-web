export type UserApiErrorType =
  | 'UnexpectedError'
  | 'FetchApiError'
  | 'NotFoundError'
  | 'BadRequestError'
  | 'InternalServerError';

const ERROR_MESSAGES: Record<UserApiErrorType, string> = {
  UnexpectedError: '予期せぬエラーが発生しました。',
  FetchApiError: '通信エラーが発生しました。インターネット接続を確認してください。',
  NotFoundError: 'データが見つかりませんでした。',
  BadRequestError: 'リクエストが不正です。',
  InternalServerError: 'サーバーでエラーが発生しました。時間をおいて再度お試しください。',
};

export class UserApiError extends Error {
  public constructor(type: UserApiErrorType) {
    super(ERROR_MESSAGES[type]);
  }
}
