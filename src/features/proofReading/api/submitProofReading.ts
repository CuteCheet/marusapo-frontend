import { isBoolean, isEmpty, omitBy } from 'lodash'

import { postProofReading } from './postProofReading'
import { uploadFile } from './uploadFile'

import type { ProofReadingRequestBody, SubmitProofReadingParams } from '../types'

export const submitProofReading = async (data: SubmitProofReadingParams, idToken: string) => {
  const uuid = crypto.randomUUID()

  const postBody = Object.keys(data).reduce((acc, key) => {
    if (key === 'file' && data[key] instanceof File) {
      return {
        ...acc,
        fileName: uuid,
        originalFileName: data[key]?.name,
        fileType: data[key]?.type
      }
    }

    return {
      ...acc,
      [key]: data[key as keyof typeof data]
    }
  }, {})

  const formattedPostBody = omitBy(postBody, (v) => isEmpty(v) && !isBoolean(v)) as ProofReadingRequestBody

  if (data.file && data.file instanceof File) {
    await new Promise<string>((resolve, reject) => {
      uploadFile(`${data.orderId}/${uuid}`, data.file, {
        resumable: true,
        completeCallback: () => {
          return resolve(data.file?.name || '')
        },
        errorCallback: (err) => {
          console.error('Unexpected error while uploading', err)
          return reject(new Error(err))
        }
      })
    })
  }

  const postResponse = await postProofReading(formattedPostBody, idToken)
  if (!postResponse.ok) throw new Error('Failed to post proof reading')
}
