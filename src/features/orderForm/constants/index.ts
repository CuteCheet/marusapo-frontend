export const ORDER_SUCCESS_MESSAGE = '注文が完了しました。\n注文詳細画面に遷移します。'
export const DRAFT_ORDER_SUCCESS_MESSAGE = '下書きを保存しました。'
export const ORDER_FAILED_MESSAGE = '注文に失敗しました。\n画面を再読み込みして、再度お試しください。'

export const INVALID_PROOFREADER_MESSAGE =
  '版下校正者がお客様の場合、以下の情報を入力してください。\n・E-mail\n・パスワード\n・お客様名'

export const PAPER_TYPES = [
  { id: 1, name: 'マシュマロホワイト 200kg' },
  { id: 2, name: 'マシュマロクリーム 200kg' },
  { id: 3, name: 'マットホワイト 220kg' }
] as const

export const PRINT_TYPES = [
  { id: 1, name: '両面モノクロ' },
  { id: 2, name: '片面モノクロ' },
  { id: 3, name: '両面フルカラー' },
  { id: 4, name: '片面フルカラー' },
  { id: 5, name: '両面カラー/モノクロ' }
] as const
