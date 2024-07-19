import type { PrintedCharactersInfoType } from '@/features/orderForm'
import type { UseFormRegisterReturn } from 'react-hook-form'

export type PrintedCharactersInfoProps = Required<{
  [key in keyof PrintedCharactersInfoType]: {
    register: UseFormRegisterReturn
  }
}>

export const PrintedCharactersInfo = ({
  printedCompanyName,
  printedAdditionalComment,
  printedDepartment,
  printedCustomerName,
  printedCustomerRuby,
  printedQualification,
  printedZipCode,
  printedAddress,
  printedTel,
  printedRemark
}: PrintedCharactersInfoProps) => {
  return (
    <fieldset>
      <legend className="text-lg font-bold">印刷文字情報</legend>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="printedCompanyName" className="w-1/5">
          社名・団体名
        </label>
        <input id="printedCompanyName" className="w-4/5 rounded border-2 p-2" {...printedCompanyName.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="printedAdditionalComment" className="w-1/5">
          業務内容・
          <br />
          英字など
        </label>
        <input id="printedAdditionalComment" className="w-4/5 rounded border-2 p-2" {...printedAdditionalComment.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="printedDepartment" className="w-1/5">
          所属・肩書
        </label>
        <input id="printedDepartment" className="w-4/5 rounded border-2 p-2" {...printedDepartment.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="printedCustomerName" className="w-1/5">
          氏名
        </label>
        <input id="printedCustomerName" className="w-4/5 rounded border-2 p-2" {...printedCustomerName.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="printedCustomerRuby" className="w-1/5">
          英字・
          <br />
          フリガナなど
        </label>
        <input id="printedCustomerRuby" className="w-4/5 rounded border-2 p-2" {...printedCustomerRuby.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="printedQualification" className="w-1/5">
          資格など
        </label>
        <input id="printedQualification" className="w-4/5 rounded border-2 p-2" {...printedQualification.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="printedZipCode" className="w-1/5">
          郵便番号
        </label>
        <input id="printedZipCode" className="w-4/5 rounded border-2 p-2" {...printedZipCode.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="printedAddress" className="w-1/5">
          住所
        </label>
        <input id="printedAddress" className="w-4/5 rounded border-2 p-2" {...printedAddress.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-baseline">
        <label htmlFor="printedTel" className="w-1/5">
          TEL・FAX等
        </label>
        <textarea id="printedTel" rows={4} className="w-4/5 rounded border-2 p-2" {...printedTel.register} />
      </div>

      <div className="mt-4 flex w-full flex-row items-baseline">
        <label htmlFor="printedRemark" className="w-1/5">
          その他 備考欄
        </label>
        <textarea id="printedRemark" rows={4} className="w-4/5 rounded border-2 p-2" {...printedRemark.register} />
      </div>
    </fieldset>
  )
}
