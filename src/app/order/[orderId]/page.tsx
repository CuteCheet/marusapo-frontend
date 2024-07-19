'use client'

import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

import { LoadingSpin } from '@/components/loading/Spin'
import { NewOrderForm, OrderDetailForm, PaymentForm, ShippingForm, getOrder } from '@/features/orderForm'
import { ProofReading } from '@/features/proofReading'
import { getUserType } from '@/lib/aws-amplify'
import { useUserContext } from '@/providers/auth'

import type { OrderDetailType } from '@/features/orderForm'

export default function OrderPage({ params: { orderId } }: { params: { orderId: string } }) {
  const user = useUserContext()!
  const userType = getUserType(user)!
  const idToken = user.getSignInUserSession()?.getIdToken().getJwtToken()
  if (!orderId || !idToken) {
    throw new Error('orderId or idToken is not found')
  }

  const { data, isError, isLoading, refetch } = useQuery<OrderDetailType>({
    queryKey: [orderId, idToken],
    queryFn: () => getOrder(orderId, idToken),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    cacheTime: 0
  })

  if (isError) {
    notFound()
  }

  if (isLoading) {
    return (
      <div className="mt-8 flex w-full items-center justify-center">
        <div className="h-8 w-8">
          <LoadingSpin />
        </div>
      </div>
    )
  }

  if (userType === 'customer') {
    return (
      <main className="h-full w-full px-8 pb-10 pt-8">
        <div className="mt-16">
          <ProofReading orderId={orderId} orderStatus={data.status} />
        </div>
      </main>
    )
  }

  if (data.status === 'Draft') {
    return (
      <main className="h-full w-full px-8 pb-10 pt-8">
        <NewOrderForm data={data} refetch={refetch} />
      </main>
    )
  }

  return (
    <main className="h-full w-full px-8 pb-10 pt-8">
      <div className="rounded-md bg-white py-5 pl-6 pr-12 shadow-md">
        <OrderDetailForm data={data} />
      </div>

      <div className="mt-16">
        <ProofReading orderId={orderId} orderStatus={data.status} />
      </div>

      <div className="mt-16">
        <ShippingForm {...data} />
      </div>

      {(userType === 'retailer' || userType === 'myoko') && (
        <div className="mt-16">
          <PaymentForm {...data} />
        </div>
      )}
    </main>
  )
}
