import type { OrderSheetInfoType } from '../..'
import type { UseFormRegisterReturn } from 'react-hook-form'

export type OrderSheetInfoProps = Required<{
  [key in keyof OrderSheetInfoType]: {
    register: UseFormRegisterReturn
  }
}>

export const OrderSheetInfo = ({ customOrderId, orderedDate, retailerName, customerService }: OrderSheetInfoProps) => {
  return (
    <fieldset>
      <legend className="text-lg font-bold">注文書情報</legend>

      <div className="mt-4 flex w-full flex-row items-center">
        <label className="w-1/5" htmlFor="customOrderId">
          注文書No.
        </label>
        <input id="customOrderId" className="w-4/5 rounded border-2 p-2" {...customOrderId.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label className="w-1/5" htmlFor="orderedDate">
          注文日付
        </label>
        <input id="orderedDate" type="date" className="w-4/5 rounded border-2 p-2" {...orderedDate.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label className="w-1/5" htmlFor="retailerName">
          発注者
        </label>
        <input id="retailerName" className="w-4/5 rounded border-2 p-2" {...retailerName.register} disabled />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label className="w-1/5" htmlFor="customerService">
          受付担当者
        </label>
        <input id="customerService" className="w-4/5 rounded border-2 p-2" {...customerService.register} />
      </div>
    </fieldset>
  )
}
