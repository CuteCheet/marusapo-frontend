import { useMemo, useState } from 'react'
import { useWatch } from 'react-hook-form'

import type { ProofreaderType } from '../..'
import type { Control, FieldError, Path, UseFormRegisterReturn } from 'react-hook-form'

export type ProofreaderProps<T extends ProofreaderType> = {
  proofReaderTypeId: {
    register: UseFormRegisterReturn
  }
  customerEmail: {
    register: UseFormRegisterReturn
    errors?: FieldError
  }
  customerPassword?: {
    register: UseFormRegisterReturn
    errors?: FieldError
  }
  control: Control<T>
}

const WatchProofreaderTypeId = <T extends ProofreaderType>({
  control,
  children
}: {
  control: Control<T>
  children: (shouldShow: boolean) => React.ReactNode
}) => {
  const typeId = useWatch({ name: 'proofReaderTypeId' as Path<T>, control })
  const shouldShow = Number(typeId || 1) === 1

  const childNode = useMemo(() => children(shouldShow), [children, shouldShow])
  // メモ化し、proofReaderTypeIdが１の時にだけ、子コンポーネント再描画
  return <>{childNode}</>
}

export const Proofreader = <T extends ProofreaderType>({
  proofReaderTypeId,
  customerEmail,
  customerPassword,
  control
}: ProofreaderProps<T>) => {
  // パスワード表示制御用のstate
  const [isRevealPassword, setIsRevealPassword] = useState(true)
  return (
    <fieldset>
      <div className="flex w-full flex-row items-center">
        <legend className="w-1/5 text-lg font-bold">版下校正者</legend>

        <div className="flex w-3/5 flex-row justify-between">
          <div className="flex items-center">
            <input
              id="proofreader-radio-1"
              type="radio"
              value={'1'}
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
              {...proofReaderTypeId.register}
            />
            <label htmlFor="proofreader-radio-1" className="ml-2 mr-4 text-sm font-medium text-gray-900">
              お客様
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="proofreader-radio-2"
              type="radio"
              value={'2'}
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
              {...proofReaderTypeId.register}
            />
            <label htmlFor="proofreader-radio-2" className="ml-2 mr-4 text-sm font-medium text-gray-900">
              店舗担当者経由
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="proofreader-radio-3"
              type="radio"
              value={'3'}
              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
              {...proofReaderTypeId.register}
            />
            <label htmlFor="proofreader-radio-3" className="ml-2 mr-4 text-sm font-medium text-gray-900">
              版下校正なし
            </label>
          </div>
        </div>
      </div>
      <WatchProofreaderTypeId control={control}>
        {(shouldShow) => {
          if (shouldShow && customerPassword) {
            return (
              <>
                <div className="mt-4 flex w-full flex-row items-baseline">
                  <label htmlFor="customerEmail" className="w-1/5">
                    お客様E-mail
                  </label>
                  <div className="flex w-4/5 flex-col">
                    <input
                      id="customerEmail"
                      autoComplete="off"
                      className={`rounded border-2 p-2 ${customerEmail.errors && 'border-red-400'}`}
                      {...customerEmail.register}
                    />
                    <p className="mt-2 text-xs">
                      ※「お客様」を選択するとお客様がこのサービスに直接アクセスし、校正を行いますので
                      <br />
                      <span className="text-red-500">お客様のメールアドレス</span>をご入力ください。
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex w-full flex-row items-baseline">
                  <label htmlFor="customerPassword" className="w-1/5">
                    パスワード
                  </label>
                  <div className="flex w-max flex-col">
                    <div className="flex flex-row items-center gap-1">
                      <input
                        id="customerPassword"
                        autoComplete="off"
                        className={`w-full rounded border-2 p-2 ${customerPassword.errors && 'border-red-400'}`}
                        type={isRevealPassword ? 'text' : 'password'}
                        {...customerPassword.register}
                      />
                      <button type="button" onClick={() => setIsRevealPassword(!isRevealPassword)}>
                        <span
                          className={`${
                            isRevealPassword ? 'i-entypo-eye-with-line' : 'i-entypo-eye'
                          } block text-xl text-gray-400`}
                        />
                      </button>
                    </div>
                    <p className="mt-2 text-xs">※半角英数字6文字以上（英字のみ不可、数字のみ可）</p>
                  </div>
                </div>
              </>
            )
          } else if (shouldShow) {
            return (
              <div className="mt-4 flex w-full flex-row items-center">
                <label htmlFor="customerEmail" className="w-1/5">
                  E-mail
                </label>
                <input id="customerEmail" className="w-4/5 rounded border-2 p-2" {...customerEmail.register} />
              </div>
            )
          }

          return null
        }}
      </WatchProofreaderTypeId>
    </fieldset>
  )
}
