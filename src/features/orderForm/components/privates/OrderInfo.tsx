import Image from 'next/image'

import FullColorIcon from '~/public/full-color-icon.svg'
import MonochromeIcon from '~/public/monochrome-icon.svg'

import { PAPER_TYPES, PRINT_TYPES } from '../../constants'

import type { OrderInfoType } from '@/features/orderForm'
import type { UseFormRegisterReturn } from 'react-hook-form'

export type OrderInfoProps = Required<{
  [key in keyof OrderInfoType]: {
    register: UseFormRegisterReturn
  }
}>

export const OrderInfo = ({
  paperTypeId,
  printTypeId,
  logoTypeId,
  logoCount,
  draftTypeId,
  draftDetail,
  numberOfOrders,
  numberOfCopies
}: OrderInfoProps) => {
  const displayPrintTypeOptions = PRINT_TYPES.map((v) => {
    switch (v.name) {
      case '両面モノクロ':
        return { ...v, icons: [MonochromeIcon, MonochromeIcon] }
      case '片面モノクロ':
        return { ...v, icons: [MonochromeIcon] }
      case '両面フルカラー':
        return { ...v, icons: [FullColorIcon, FullColorIcon] }
      case '片面フルカラー':
        return { ...v, icons: [FullColorIcon] }
      case '両面カラー/モノクロ':
        return { ...v, icons: [FullColorIcon, MonochromeIcon] }
      default:
        throw new Error('印刷仕様の値が不正です。')
    }
  })

  const hoveredClassName =
    'hover:cursor-pointer hover:border-blue-600 peer-disabled:hover:cursor-default peer-disabled:hover:border-inherit'
  const bgClassName =
    'peer-checked:bg-blue-200 peer-checked:border-blue-600 peer-disabled:bg-gray-100 peer-disabled:peer-checked:bg-blue-200 peer-disabled:peer-checked:border-blue-600'

  return (
    <fieldset>
      <legend className="text-lg font-bold">ご注文情報</legend>

      <div className="mt-4 flex w-full flex-row items-baseline">
        <label htmlFor="paperType" className="w-1/5">
          用紙の種類
        </label>

        <div className="grid w-4/5 grid-cols-2 gap-2">
          {PAPER_TYPES.map(({ id, name }) => {
            const displayName = name.replaceAll(' ', '\n')
            return (
              <label htmlFor={`paper-type-${id}`} key={`paper-type-${id}`}>
                <input
                  id={`paper-type-${id}`}
                  type="radio"
                  value={String(id)}
                  className="peer hidden"
                  {...paperTypeId.register}
                />
                <p className={`whitespace-pre rounded border-2 px-3 py-2 text-start  ${hoveredClassName} ${bgClassName}`}>
                  {displayName}
                </p>
              </label>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex w-full flex-row items-baseline">
        <label htmlFor="printType" className="w-1/5">
          印刷仕様
        </label>

        <div className="grid w-4/5 grid-cols-2 gap-2">
          {displayPrintTypeOptions.map(({ id, name, icons }) => {
            return (
              <label htmlFor={`print-type-${id}`} key={`print-type-${id}`}>
                <input
                  id={`print-type-${id}`}
                  type="radio"
                  value={String(id)}
                  className="peer hidden"
                  {...printTypeId.register}
                />
                <div
                  className={`flex flex-row justify-between whitespace-pre rounded border-2 px-3 py-2 text-start  ${hoveredClassName} ${bgClassName}`}
                >
                  {name}
                  <div className="flex flex-row gap-1">
                    {icons.map((icon, index) => (
                      <Image alt="icon image" key={index} src={icon} />
                    ))}
                  </div>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex w-full flex-row items-baseline">
        <label htmlFor="logoTypeId" className="w-1/5">
          ロゴ
        </label>

        <div className="w-4/5">
          <select
            id="logoTypeId"
            className="block w-full rounded border-2 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            {...logoTypeId.register}
          >
            <option value={undefined} />
            <option value={'1'}>ロゴ無し</option>
            <option value={'2'}>ロゴあり トレース</option>
            <option value={'3'}>ロゴあり スキャン画像扱い</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-row items-baseline">
        <label htmlFor="logoCount" className="w-1/5">
          ロゴ点数
        </label>

        <div className="flex w-4/5 flex-row items-center gap-1">
          <input id="logoCount" className="w-full rounded border-2 p-2" {...logoCount.register} />
          <span>点</span>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-row items-baseline">
        <label htmlFor="draftTypeId" className="w-1/5">
          入稿方式
        </label>

        <div className="flex w-4/5 flex-col">
          <select
            id="draftTypeId"
            className="block rounded border-2 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            {...draftTypeId.register}
          >
            <option value={undefined} />
            <option value={'1'}>定型フォーマット</option>
            <option value={'2'}>そっくり</option>
            <option value={'3'}>オリジナル</option>
            <option value={'4'}>在版リピート</option>
            <option value={'5'}>在版修正</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-row items-baseline">
        <label htmlFor="draftDetail" className="w-1/5">
          備考
        </label>

        <div className="flex w-4/5 flex-col">
          <textarea id="draftDetail" className="rounded border-2 p-2" rows={4} {...draftDetail.register} />
        </div>
      </div>

      <div className="mt-4 flex w-full flex-row items-center">
        <label htmlFor="numberOfOrders" className="w-1/5">
          注文点数
        </label>

        <div className="flex w-4/5 flex-row items-center justify-between gap-1">
          <div className="grid w-full grid-cols-10 gap-2">
            {[...Array(10)]
              .map((_, i) => String(i + 1))
              .map((value, i) => (
                <label htmlFor={`numberOfOrders-${i}`} key={i}>
                  <input
                    id={`numberOfOrders-${i}`}
                    type="radio"
                    value={value}
                    className="peer hidden"
                    {...numberOfOrders.register}
                  />
                  <div className={`rounded border-2 py-2 text-center ${hoveredClassName} ${bgClassName}`}>{value}</div>
                </label>
              ))}
          </div>
          <span>点</span>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-row items-baseline">
        <label htmlFor="numberOfCopies" className="w-1/5">
          印刷枚数
        </label>

        <div className="flex w-4/5 flex-col gap-2">
          <div className="flex w-full flex-row gap-1">
            <div className="grid w-full grid-cols-10 gap-2">
              {Array.from({ length: 20 }, (_, i) => String((i + 1) * 100)).map((value, i) => (
                <label htmlFor={`numberOfCopies-${i}`} key={i}>
                  <input
                    id={`numberOfCopies-${i}`}
                    type="radio"
                    value={value}
                    className="peer hidden"
                    {...numberOfCopies.register}
                  />
                  <div className={`rounded border-2 py-2 text-center text-sm ${hoveredClassName} ${bgClassName}`}>{value}</div>
                </label>
              ))}
            </div>
            <span className="flex items-end pb-2">枚</span>
          </div>
          <p className="text-xs">※複数注文の場合は、合計枚数</p>
        </div>
      </div>
    </fieldset>
  )
}
