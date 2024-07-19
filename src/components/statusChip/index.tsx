import type { OrderStatus } from '@/types/order'

type Props = {
  statusName: OrderStatus
}

const getStatus = (status: OrderStatus) => {
  switch (status) {
    case 'Draft':
      return { name: '下書き', color: 'bg-rose-400' }
    default:
      throw new Error('ステータスが不正です。')
  }
}

export const StatusChip = ({ statusName }: Props) => {
  const { name, color } = getStatus(statusName)

  return <p className={`w-20 rounded-3xl border py-1 text-center text-xs text-white ${color}`}>{name}</p>
}
