import type { OrderStatus } from '@/types/order'

export type OrderSheetInfoType = {
  customOrderId?: string
  orderedDate: string
  retailerName: string
  customerService?: string
}

export type ProofreaderType = {
  proofReaderTypeId: '1' | '2' | '3'
  customerEmail?: string
  customerPassword?: string
}

export type CustomerInfoType = {
  customerCompanyName?: string
  customerName?: string
  customerRuby?: string
  customerZipCode?: string
  customerAddress?: string
  customerTel?: string
  customerPhone?: string
  customerFax?: string
}

export type DestinationType = {
  deliveryTypeId: '1' | '2' | '3'
  deliveryCompanyName?: string
  deliveryCustomerName?: string
  deliveryZipCode?: string
  deliveryAddress?: string
  deliveryTel?: string
}

export type OrderInfoType = {
  paperTypeId?: '1' | '2' | '3'
  printTypeId?: '1' | '2' | '3' | '4' | '5'
  logoTypeId?: '1' | '2' | '3'
  logoCount?: string
  draftTypeId?: '1' | '2' | '3' | '4' | '5'
  draftDetail?: string
  numberOfOrders?: string
  numberOfCopies?: string
}

export type FileField = {
  files: { file: File }[]
}

export type PrintedCharactersInfoType = {
  printedCompanyName?: string
  printedAdditionalComment?: string
  printedDepartment?: string
  printedCustomerName?: string
  printedCustomerRuby?: string
  printedQualification?: string
  printedZipCode?: string
  printedAddress?: string
  printedTel?: string
  printedRemark?: string
}

export type ShippingInfoType = {
  shippingDate?: string
  expressCompany?: string
  trackingNumber?: string
}

export type PaymentInfoType = {
  deliveryPrice?: string
}

type CommonInfoType = { status: OrderStatus } & OrderSheetInfoType &
  ProofreaderType &
  CustomerInfoType &
  DestinationType &
  OrderInfoType &
  PrintedCharactersInfoType

export type NewOrderType = FileField & CommonInfoType

export type OrderDetailType = {
  orderId: string
  retailerEmail: string
  files?: string[]
} & CommonInfoType &
  ShippingInfoType &
  PaymentInfoType

export type EditableOrderType = {
  orderId?: string
} & NewOrderType
