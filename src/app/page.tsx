'use client'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BlueSquareButton } from '@/components/button/BlueSquareButton'
import { OrderList } from '@/features/orderList'
import { getUserType } from '@/lib/aws-amplify'
import { useUserContext } from '@/providers/auth'

export default function HomePage() {
  const user = useUserContext()!
  const userType = getUserType(user)!
  if (userType === 'customer') {
    notFound()
  }

  return (
    <main className="h-full w-full px-8 pb-10 pt-8">
      <div className="flex w-full flex-row items-center justify-between">
        <h1 className="text-2xl">ご注文状況</h1>
        {userType === 'retailer' && (
          <BlueSquareButton size="middle">
            <Link href="/order/new" className="flex h-full w-full items-center justify-center">
              ＋新規作成
            </Link>
          </BlueSquareButton>
        )}
      </div>
      <div className="mt-6">
        <OrderList />
      </div>
    </main>
  )
}
