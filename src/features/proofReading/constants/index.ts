import { getUserName, type AttributesUserType } from '@/lib/aws-amplify'

import type { AmplifyUser } from '@aws-amplify/ui'

export const UPLOADABLE_EXTENSION_LIST = [
  'image/apng',
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'application/pdf'
] as const

export const LOCAL_DATE_OPTION = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
} as const satisfies Intl.DateTimeFormatOptions

export const getDisplayName = (userType: AttributesUserType, user: AmplifyUser) => {
  switch (userType) {
    case 'retailer':
      return '店舗担当者'
    case 'sc':
      return 'オリジナル商品制作室'
    case 'customer':
      return getUserName(user)!
    case 'myoko':
      return getUserName(user)!
    default:
      throw new Error('Unexpected user type')
  }
}

export const FIRST_PROOF_FAILED_MESSAGE = '初稿のアップロードに失敗しました。画面を更新して再度お試しください。'
export const EXTENSION_ERROR_MESSAGE = 'ファイルの形式が不正です。'
export const SUBMIT_FAILED_MESSAGE = '登録に失敗しました。画面を更新して再度お試しください。'
export const HANDLE_ERROR_MESSAGE = 'エラーが発生しました。画面を更新して再度お試しください。'
export const PROOF_READING_COMPLETED_MESSAGE = '確認作業が完了しました。'
export const PROOF_READING_SUBMIT_COMPLETED_MESSAGE = '確認作業が完了しました。\nこれで確定され印刷工程に進みます。'
export const EMPTY_PROOF_READING_POST_MESSAGE = 'ファイルまたはメッセージを入力してください。'
export const EMPTY_PROOF_READING_TYPE_MESSAGE = '修正の有無を選択してください。'
