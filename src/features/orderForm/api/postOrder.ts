import type { OrderDetailType } from '../types'

export const postOrder = (body: OrderDetailType, idToken: string) => {
  return fetch(process.env.NEXT_PUBLIC_AWS_ORDER_API_URL || '', {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      Authorization: idToken,
      'Content-Type': 'application/json'
    }
  })
}
