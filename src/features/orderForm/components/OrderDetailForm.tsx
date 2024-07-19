'use client'

import { CustomerInfo } from './privates/CustomerInfo'
import { Destination } from './privates/Destination'
import { FileList } from './privates/FileList'
import { OrderInfo } from './privates/OrderInfo'
import { OrderSheetInfo } from './privates/OrderSheetInfo'
import { PrintedCharactersInfo } from './privates/PrintedCharactersInfo'
import { Proofreader } from './privates/Proofreader'
import { useOrderDetailForm } from '../hooks/useOrderDetailForm'

import type { OrderDetailType } from '..'

type Props = {
  data: OrderDetailType
}

export const OrderDetailForm = ({ data }: Props) => {
  const {
    orderSheetInfoProps,
    customerInfoProps,
    destinationProps,
    orderInfoProps,
    printedCharactersInfoProps,
    proofreaderProps,
    fileListProps
  } = useOrderDetailForm(data)
  return (
    <>
      <div className="border-b-2 pb-12">
        <OrderSheetInfo {...orderSheetInfoProps} />
      </div>

      <div className="mt-4 border-b-2 pb-12">
        <Proofreader {...proofreaderProps} />
      </div>

      <div className="mt-4 border-b-2 pb-12">
        <CustomerInfo {...customerInfoProps} />
      </div>

      <div className="mt-4 border-b-2 pb-12">
        <Destination {...destinationProps} />
      </div>

      <div className="mt-4 border-b-2 pb-12">
        <OrderInfo {...orderInfoProps} />
        <div className="mt-4">
          <FileList {...fileListProps} />
        </div>
      </div>

      <div className="mt-4">
        <PrintedCharactersInfo {...printedCharactersInfoProps} />
      </div>
    </>
  )
}
