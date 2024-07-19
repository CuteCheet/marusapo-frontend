import type { CustomerInfoType } from '@/features/orderForm'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

export type CustomerInfoProps = Required<{
  [key in keyof CustomerInfoType]: {
    register: UseFormRegisterReturn
    errors?: FieldError
  }
}>

export const CustomerInfo = ({
  customerCompanyName,
  customerName,
  customerRuby,
  customerZipCode,
  customerAddress,
  customerTel,
  customerPhone,
  customerFax
}: CustomerInfoProps) => {
  return (
    <fieldset>
      <legend className="text-lg font-bold">お客様情報</legend>

      <div className="mt-4 flex w-full flex-row items-center">
        <label className="w-1/5" htmlFor="customerCompanyName">
          会社名
        </label>
        <input id="customerCompanyName" className="w-4/5 rounded border-2 p-2" {...customerCompanyName.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="customerName" className="w-1/5">
          お客様名
        </label>
        <input
          id="customerName"
          className={`w-4/5 rounded border-2 p-2 ${customerName.errors && 'border-red-400'}`}
          {...customerName.register}
        />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="customerRuby" className="w-1/5">
          フリガナ
        </label>
        <input id="customerRuby" className="w-4/5 rounded border-2 p-2" {...customerRuby.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="customerZipCode" className="w-1/5">
          郵便番号
        </label>
        <input id="customerZipCode" className="w-4/5 rounded border-2 p-2" {...customerZipCode.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="customerAddress" className="w-1/5">
          住所
        </label>
        <input id="customerAddress" className="w-4/5 rounded border-2 p-2" {...customerAddress.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="customerTel" className="w-1/5">
          TEL
        </label>
        <input id="customerTel" className="w-4/5 rounded border-2 p-2" {...customerTel.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="customerPhone" className="w-1/5">
          携帯
        </label>
        <input id="customerPhone" className="w-4/5 rounded border-2 p-2" {...customerPhone.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="customerFax" className="w-1/5">
          FAX
        </label>
        <input id="customerFax" className="w-4/5 rounded border-2 p-2" {...customerFax.register} />
      </div>
    </fieldset>
  )
}
