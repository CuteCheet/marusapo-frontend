'use client'
import { Auth } from 'aws-amplify'
import { useForm, Controller } from 'react-hook-form'

import { getUserType } from '@/lib/aws-amplify'
import { useUserContext } from '@/providers/auth'

import { putOrder } from '../api/putOrder'

import type { PaymentInfoType } from '../types'

type Props = {
  orderId: string
} & PaymentInfoType

type PaymentInfoForm = {
  deliveryPrice: string
}

export const PaymentForm = ({ orderId, deliveryPrice = '' }: Props) => {
  const user = useUserContext()!
  const userType = getUserType(user)!
  const idToken = user.getSignInUserSession()!.getIdToken().getJwtToken()

  const { handleSubmit, control } = useForm<PaymentInfoForm>({
    defaultValues: {
      deliveryPrice: deliveryPrice === '' ? '' : Number(deliveryPrice).toLocaleString()
    }
  })

  const submitShippingForm = async (data: PaymentInfoForm) => {
    await Auth.currentSession()
    const { deliveryPrice } = data

    const requestBody: PaymentInfoType = {
      deliveryPrice: deliveryPrice.replaceAll(',', '')
    }
    const response = await putOrder(orderId, idToken, requestBody)
    if (response.ok) {
      alert('納価情報の変更を保存しました。')
    } else {
      alert('納価情報の変更に失敗しました。\n画面を更新して再度お試しください。')
    }
  }

  const isReadOnlyUser = userType === 'retailer'

  return (
    <form className="rounded-md bg-white py-5 pl-6 pr-3 shadow-md" onSubmit={handleSubmit(submitShippingForm)}>
      <div className="flex flex-row items-start justify-between">
        <h2 className="text-lg font-bold">納価情報</h2>

        {!isReadOnlyUser && (
          <button type="submit" className="rounded-md border border-blue-500 px-6 py-2 text-sm text-blue-500 hover:bg-blue-100">
            保存
          </button>
        )}
      </div>

      <div className="mt-4 flex w-full flex-row items-baseline pr-12">
        <label className="w-1/5" htmlFor="deliveryPrice">
          金額（税込）
        </label>

        <div className="flex w-4/5 flex-col gap-2">
          <Controller
            control={control}
            name="deliveryPrice"
            render={({ field }) => (
              <div className="flex flex-row items-center gap-1">
                <input
                  id="deliveryPrice"
                  type="text"
                  className="w-full rounded border-2 p-2"
                  {...field}
                  onChange={(e) => {
                    const { value } = e.target
                    const reg = new RegExp(/^[0-9|,]+$/)
                    // 数値orカンマor空文字のみ許可
                    if (reg.test(value) || value === '') {
                      field.onChange(value)
                    }
                  }}
                  onBlur={() => {
                    // 空文字の場合に0が入らないよう早期リターン
                    if (field.value === '') return
                    field.onChange(Number(field.value.replaceAll(',', '')).toLocaleString())
                  }}
                  disabled={isReadOnlyUser}
                />
                <span>円</span>
              </div>
            )}
          />

          {!isReadOnlyUser && <p className="text-xs">※半角英数字 + カンマ(,) のみ入力可</p>}
        </div>
      </div>
    </form>
  )
}
