'use client'
import { Auth } from 'aws-amplify'
import { useForm } from 'react-hook-form'

import { getUserType } from '@/lib/aws-amplify'
import { useUserContext } from '@/providers/auth'

import { putOrder } from '../api/putOrder'

import type { ShippingInfoType } from '../types'

type Props = {
  orderId: string
  shippingDate?: string
  expressCompany?: string
  trackingNumber?: string
}

export const ShippingForm = ({ orderId, shippingDate, expressCompany, trackingNumber }: Props) => {
  const user = useUserContext()!
  const userType = getUserType(user)!
  const idToken = user.getSignInUserSession()!.getIdToken().getJwtToken()

  const { register, handleSubmit } = useForm<ShippingInfoType>({
    defaultValues: {
      shippingDate,
      expressCompany,
      trackingNumber
    }
  })
  const submitShippingForm = async (data: ShippingInfoType) => {
    await Auth.currentSession()

    const response = await putOrder(orderId, idToken, data)
    if (response.ok) {
      alert('出荷情報の変更を保存しました。')
    } else {
      alert('出荷情報の変更に失敗しました。\n画面を更新して再度お試しください。')
    }
  }

  const isReadOnlyUser = userType !== 'sc'

  return (
    <form className="rounded-md bg-white py-5 pl-6 pr-3 shadow-md" onSubmit={handleSubmit(submitShippingForm)}>
      <div className="flex flex-row items-start justify-between">
        <h2 className="text-lg font-bold">出荷情報</h2>

        {!isReadOnlyUser && (
          <button type="submit" className="rounded-md border border-blue-500 px-6 py-2 text-sm text-blue-500 hover:bg-blue-100">
            保存
          </button>
        )}
      </div>

      <div className="mt-4 flex w-full flex-row items-center pr-12">
        <label className="w-1/5" htmlFor="shippingDate">
          出荷日
        </label>
        <input
          id="shippingDate"
          type="date"
          className="w-4/5 rounded border-2 p-2"
          {...register('shippingDate', { disabled: isReadOnlyUser })}
        />
      </div>

      <div className="mt-4 flex w-full flex-row items-center pr-12">
        <label className="w-1/5" htmlFor="expressCompany">
          配送会社
        </label>
        <input
          id="expressCompany"
          type="text"
          className="w-4/5 rounded border-2 p-2"
          {...register('expressCompany', { disabled: isReadOnlyUser })}
        />
      </div>

      <div className="mt-4 flex w-full flex-row items-center pr-12">
        <label className="w-1/5" htmlFor="trackingNumber">
          送り状番号
        </label>
        <input
          id="trackingNumber"
          type="text"
          className="w-4/5 rounded border-2 p-2"
          {...register('trackingNumber', { disabled: isReadOnlyUser })}
        />
      </div>
    </form>
  )
}
