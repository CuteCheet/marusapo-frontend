import { Amplify, Storage } from 'aws-amplify'

import { AUTH_IDENTITY_POOL_CONFIG, STORAGE_ORDER_FILES_CONFIG } from '@/config'

export const removeFile = (...[filePath, option]: Parameters<(typeof Storage)['remove']>) => {
  Amplify.configure({
    ...AUTH_IDENTITY_POOL_CONFIG,
    ...STORAGE_ORDER_FILES_CONFIG
  })
  return Storage.remove(filePath, {
    level: 'public',
    ...option
  })
}
