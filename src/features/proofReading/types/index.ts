import type { UPLOADABLE_EXTENSION_LIST } from '../constants'

export type ProofReadingItem = {
  orderId: string
  displayName: string
  message?: string
  fileName?: string
  originalFileName?: string
  fileType?: (typeof UPLOADABLE_EXTENSION_LIST)[number]
  isCompleted: boolean
  isFirstPr?: boolean
  postUnixTime: number
}

export type ProofReadingRequestBody = {
  orderId: string
  displayName: string
  message?: string
  fileName?: string
  originalFileName?: string
  fileType?: (typeof UPLOADABLE_EXTENSION_LIST)[number]
  isCompleted: boolean
  isFirstPr?: boolean
}

export type SubmitProofReadingParams = {
  orderId: string
  displayName: string
  message?: string
  file?: File
  isCompleted: boolean
  isFirstPr?: boolean
}
