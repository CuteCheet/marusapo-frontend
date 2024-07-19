'use client'
import { NewOrderForm } from '@/features/orderForm'
import { getUserType } from '@/lib/aws-amplify'
import { useUserContext } from '@/providers/auth'

export default function NewOrderPage() {
  const user = useUserContext()!
  const userType = getUserType(user)!
  if (userType !== 'retailer') {
    throw new Error()
  }

  return (
    <main className="h-full w-full px-8 pb-10 pt-8">
      <NewOrderForm />
    </main>
  )
}
