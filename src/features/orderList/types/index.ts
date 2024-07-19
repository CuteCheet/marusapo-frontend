import type { OrderDetailType } from '@/features/orderForm'

export type OrderItem = Omit<
  OrderDetailType,
  'proofReaderTypeId' | 'deliveryTypeId' | 'paperTypeId' | 'printTypeId' | 'logoTypeId' | 'draftTypeId'
> & {
  proofReaderTypeId: number
  deliveryTypeId: number
  paperTypeId: number
  printTypeId: number
  logoTypeId: number
  draftTypeId: number
}

export type OrderListResponse = {
  items: OrderItem[]
  count: number
}
