import { omitBy, isEmpty, isNumber } from 'lodash'

import { postOrder } from './postOrder'
import { putOrder } from './putOrder'
import { uploadFile } from './uploadFile'

import type { NewOrderType, OrderDetailType } from '../types'

export type SubmitOrderPayload = {
  orderId: string
  files?: string[]
} & Omit<NewOrderType, 'files'>

export const submitOrder = async (data: SubmitOrderPayload, uploadFiles: File[], idToken: string) => {
  await Promise.all(
    uploadFiles.map((file) => {
      return new Promise<string>((resolve, reject) => {
        return uploadFile(`${data.orderId}/${file.name}`, file, {
          resumable: true,
          completeCallback: () => {
            return resolve(file.name)
          },
          errorCallback: (err) => {
            console.error('Unexpected error while uploading', err)
            reject(new Error(err))
          }
        })
      })
    })
  )

  const requestBody = omitBy(
    {
      ...data,
      proofReaderTypeId: Number(data.proofReaderTypeId),
      customerEmail: data.proofReaderTypeId === '1' ? data.customerEmail : undefined,
      customerPassword: data.proofReaderTypeId === '1' ? data.customerPassword : undefined,
      deliveryTypeId: Number(data.deliveryTypeId),
      paperTypeId: Number(data.paperTypeId) === 0 ? undefined : Number(data.paperTypeId),
      printTypeId: Number(data.printTypeId) === 0 ? undefined : Number(data.printTypeId),
      logoTypeId: Number(data.logoTypeId) === 0 ? undefined : Number(data.logoTypeId),
      draftTypeId: Number(data.draftTypeId) === 0 ? undefined : Number(data.draftTypeId)
    },
    (value) => isEmpty(value) && !isNumber(value)
  ) as OrderDetailType

  const response =
    data.status === 'Draft' ? await putOrder(data.orderId, idToken, requestBody) : await postOrder(requestBody, idToken)
  if (!response.ok) throw new Error('Failed to submit order')
  return requestBody
}
