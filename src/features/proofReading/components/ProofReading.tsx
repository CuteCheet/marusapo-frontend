import { useQuery } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'

import { useUserContext } from '@/providers/auth'

import { ProofReadingForm } from './privates/ProofReadingForm'
import { ProofReadingItems } from './privates/ProofReadingItems'
import { ProofReadingTitle } from './privates/ProofReadingTitle'
import { getProofReading } from '../api/getProofReading'

import type { OrderStatus } from '@/types/order'

type Props = {
  orderId: string
  orderStatus?: OrderStatus
}
export const ProofReading = ({ orderId, orderStatus }: Props) => {
  const idToken = useUserContext()?.getSignInUserSession()?.getIdToken().getJwtToken()

  if (!idToken) {
    throw new Error('idToken is not found')
  }

  const { data, refetch, dataUpdatedAt } = useQuery({
    queryKey: ['proofReading', orderId, idToken],
    queryFn: async () => {
      await Auth.currentSession()
      return getProofReading(orderId, idToken)
    },
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    refetchOnReconnect: false
  })

  if (!data) {
    return null
  }

  return (
    <section className="rounded-md bg-white py-5 pl-6 pr-3 shadow-md">
      <ProofReadingTitle refetch={refetch} dataUpdatedAt={dataUpdatedAt} />
      <ProofReadingItems data={data} orderStatus={orderStatus} />
      <ProofReadingForm orderId={orderId} orderStatus={orderStatus} refetch={refetch} />
    </section>
  )
}
