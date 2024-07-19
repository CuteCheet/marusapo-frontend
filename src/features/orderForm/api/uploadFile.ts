import { Amplify, Storage } from 'aws-amplify'

import { AUTH_IDENTITY_POOL_CONFIG, STORAGE_ORDER_FILES_CONFIG } from '@/config'

export const uploadFile = (...[filePath, file, option]: Parameters<(typeof Storage)['put']>) => {
  Amplify.configure({
    ...AUTH_IDENTITY_POOL_CONFIG,
    ...STORAGE_ORDER_FILES_CONFIG
  })

  Storage.put(filePath, file, {
    level: 'public',
    contentType: file.type,
    ...option
  })
}
