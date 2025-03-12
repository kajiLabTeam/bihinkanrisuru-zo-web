type GetUsersErrorType =
  | 'UnexpectedError'
  | 'FetchApiError'
  | 'InternalServerError';

const ERROR_MESSAGES: Record<GetUsersErrorType, string> = {
  UnexpectedError: '予期せぬエラーが発生しました。',
  FetchApiError: '通信エラーが発生しました。インターネット接続を確認してください。',
  InternalServerError: 'サーバーでエラーが発生しました。時間をおいて再度お試しください。',
};

export class GetUsersError extends Error {
  public constructor(type: GetUsersErrorType) {
    super(ERROR_MESSAGES[type]);
  }
}
