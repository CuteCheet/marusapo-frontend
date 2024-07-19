import type { OrderDetailType } from '..'

export const getOrder = async (orderId: string, idToken: string): Promise<OrderDetailType> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_AWS_ORDER_API_URL}/${orderId}`, {
    headers: {
      Authorization: idToken
    }
  })

  if (!res.ok) throw new Error('Failed to get order')
  const data = await res.json()

  return {
    ...data,
    proofReaderTypeId: data?.proofReaderTypeId && String(data.proofReaderTypeId),
    deliveryTypeId: data?.deliveryTypeId && String(data.deliveryTypeId),
    paperTypeId: data?.paperTypeId && String(data.paperTypeId),
    printTypeId: data?.printTypeId && String(data.printTypeId),
    logoTypeId: data?.logoTypeId && String(data.logoTypeId),
    draftTypeId: data?.draftTypeId && String(data.draftTypeId)
  }
}
