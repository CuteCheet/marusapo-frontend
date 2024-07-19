import { Amplify, Storage } from 'aws-amplify'

import { AUTH_IDENTITY_POOL_CONFIG, STORAGE_PROOF_READING_FILES_CONFIG } from '@/config'

export const getObject: (typeof Storage)['get'] = (filePath, option) => {
  Amplify.configure({
    ...AUTH_IDENTITY_POOL_CONFIG,
    ...STORAGE_PROOF_READING_FILES_CONFIG
  })
  return Storage.get(filePath, option)
}
