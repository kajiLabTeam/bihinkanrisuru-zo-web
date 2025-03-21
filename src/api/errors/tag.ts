export type TagApiErrorType =
  | 'UnexpectedError'
  | 'FetchApiError'
  | 'NotFoundError'
  | 'BadRequestError'
  | 'InternalServerError';

const ERROR_MESSAGES: Record<TagApiErrorType, string> = {
  UnexpectedError: '予期せぬエラーが発生しました。',
  FetchApiError: '通信エラーが発生しました。インターネット接続を確認してください。',
  NotFoundError: 'データが見つかりませんでした。',
  BadRequestError: 'リクエストが不正です。',
  InternalServerError: 'サーバーでエラーが発生しました。時間をおいて再度お試しください。',
};

export class TagApiError extends Error {
  public constructor(type: TagApiErrorType) {
    super(ERROR_MESSAGES[type]);
  }
}
