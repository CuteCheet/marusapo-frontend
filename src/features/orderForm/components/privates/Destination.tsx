import { useMemo } from 'react'
import { useWatch } from 'react-hook-form'

import type { DestinationType } from '@/features/orderForm'
import type { Control, Path, UseFormRegisterReturn } from 'react-hook-form'

export type DestinationProps<T extends DestinationType> = Required<{
  [key in keyof DestinationType]: {
    register: UseFormRegisterReturn
  }
}> & {
  control: Control<T>
}

const WatchDeliveryTypeId = <T extends DestinationType>({
  control,
  children
}: {
  control: Control<T>
  children: (shouldShow: boolean) => React.ReactNode
}) => {
  const typeId = useWatch({ name: 'deliveryTypeId' as Path<T>, control })
  const shouldShow = Number(typeId) === 2

  const childNode = useMemo(() => children(shouldShow), [children, shouldShow])
  // メモ化し、deliveryTypeIdが２の時にだけ、子コンポーネント再描画
  return <>{childNode}</>
}

export const Destination = <T extends DestinationType>({
  deliveryTypeId,
  control,
  deliveryCompanyName,
  deliveryCustomerName,
  deliveryZipCode,
  deliveryAddress,
  deliveryTel
}: DestinationProps<T>) => {
  return (
    <fieldset>
      <legend className="text-lg font-bold">納品先</legend>

      <div className="mt-4 flex w-full flex-row items-center">
        <span className="w-1/5">場所</span>

        <div className="flex w-4/5 flex-row justify-between">
          <div className="flex items-center">
            <input
              id="deliveryTypeId-1"
              type="radio"
              value={'1'}
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
              {...deliveryTypeId.register}
            />
            <label htmlFor="deliveryTypeId-1" className="ml-2 mr-4 text-sm font-medium text-gray-900">
              お客様直送（同上）
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="deliveryTypeId-2"
              type="radio"
              value={'2'}
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
              {...deliveryTypeId.register}
            />
            <label htmlFor="deliveryTypeId-2" className="ml-2 mr-4 text-sm font-medium text-gray-900">
              お客様直送（別の場所を指定）
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="deliveryTypeId-3"
              type="radio"
              value={'3'}
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
              {...deliveryTypeId.register}
            />
            <label htmlFor="deliveryTypeId-3" className="ml-2 mr-4 text-sm font-medium text-gray-900">
              店舗受取
            </label>
          </div>
        </div>
      </div>

      <WatchDeliveryTypeId control={control}>
        {(shouldShow) => {
          if (shouldShow) {
            return (
              <>
                <div className="mt-4 flex w-full flex-row items-center">
                  <label htmlFor="deliveryCompanyName" className="w-1/5">
                    会社名
                  </label>
                  <input id="deliveryCompanyName" className="w-4/5 rounded border-2 p-2" {...deliveryCompanyName.register} />
                </div>

                <div className="mt-4 flex w-full flex-row items-center">
                  <label htmlFor="deliveryCustomerName" className="w-1/5">
                    お客様名
                  </label>
                  <input id="deliveryCustomerName" className="w-4/5 rounded border-2 p-2" {...deliveryCustomerName.register} />
                </div>

                <div className="mt-4 flex w-full flex-row items-center">
                  <label htmlFor="deliveryZipCode" className="w-1/5">
                    郵便番号
                  </label>
                  <input id="deliveryZipCode" className="w-4/5 rounded border-2 p-2" {...deliveryZipCode.register} />
                </div>

                <div className="mt-4 flex w-full flex-row items-center">
                  <label htmlFor="deliveryAddress" className="w-1/5">
                    住所
                  </label>
                  <input id="deliveryAddress" className="w-4/5 rounded border-2 p-2" {...deliveryAddress.register} />
                </div>

                <div className="mt-4 flex w-full flex-row items-center">
                  <label htmlFor="deliveryTel" className="w-1/5">
                    TEL
                  </label>
                  <input id="deliveryTel" className="w-4/5 rounded border-2 p-2" {...deliveryTel.register} />
                </div>
              </>
            )
          }
          return null
        }}
      </WatchDeliveryTypeId>
    </fieldset>
  )
}
