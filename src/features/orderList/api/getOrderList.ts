import type { OrderListResponse } from '../types'

export const getOrderList = async (idToken: string): Promise<OrderListResponse> => {
  const res = await fetch(process.env.NEXT_PUBLIC_AWS_ORDER_API_URL, {
    headers: {
      Authorization: idToken
    }
  })

  if (!res.ok) throw new Error('Failed to get order')
  const data: OrderListResponse = await res.json()

  return data
}
