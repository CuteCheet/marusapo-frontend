'use client'

import { useQuery } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { LoadingSpin } from '@/components/loading/Spin'
import { useUserContext } from '@/providers/auth'

import { OrderItem } from './OrderItem'
import { getOrderList } from '../api'

export const OrderList = () => {
  const idToken = useUserContext()?.getSignInUserSession()?.getIdToken().getJwtToken()

  if (!idToken) {
    throw new Error('idToken is not found')
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ['orderList', idToken],
    queryFn: async () => {
      await Auth.currentSession()
      return getOrderList(idToken)
    },
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    cacheTime: 0
  })

  if (isLoading) {
    return (
      <div className="mt-8 flex w-full items-center justify-center">
        <div className="h-8 w-8">
          <LoadingSpin />
        </div>
      </div>
    )
  }

  if (isError) {
    throw new Error('注文情報一覧取得に失敗しました')
  }

  if (data.items.length === 0) {
    return <div>ご注文情報がありません</div>
  }

  return (
    <div className="flex flex-col gap-5">
      {data.items.map((item) => {
        return <OrderItem key={item.orderId} data={item} />
      })}
      <p className="mt-8 text-xs">
        ※下請法該当取引の場合は、支払期日、支払方法、検査完了期日等について、別途送付した「注文書・支払方法等について」に記載しております。
      </p>
    </div>
  )
}
