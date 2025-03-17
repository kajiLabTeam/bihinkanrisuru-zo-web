export type EquipmentApiErrorType =
  | 'UnexpectedError'
  | 'BadRequestError'
  | 'NotFoundError'
  | 'FetchApiError'
  | 'InternalServerError';

const ERROR_MESSAGES: Record<EquipmentApiErrorType, string> = {
  UnexpectedError: '予期せぬエラーが発生しました。',
  BadRequestError: 'リクエストが不正です。',
  NotFoundError: 'データが見つかりませんでした。',
  FetchApiError: '通信エラーが発生しました。インターネット接続を確認してください。',
  InternalServerError: 'サーバーでエラーが発生しました。時間をおいて再度お試しください。',
};

export class EquipmentApiError extends Error {
  public constructor(type: EquipmentApiErrorType) {
    super(ERROR_MESSAGES[type]);
  }
}
