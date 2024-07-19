import type { OrderDetailType } from '../types'

export const putOrder = (orderId: string, idToken: string, data: Partial<OrderDetailType>) => {
  return fetch(`${process.env.NEXT_PUBLIC_AWS_ORDER_API_URL}/${orderId}`, {
    body: JSON.stringify(data),
    method: 'PUT',
    headers: {
      Authorization: idToken,
      'Content-Type': 'application/json'
    }
  })
}
