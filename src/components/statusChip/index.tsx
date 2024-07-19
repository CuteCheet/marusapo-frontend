import type { OrderStatus } from '@/types/order'

type Props = {
  statusName: OrderStatus
}

export const getStatus = (status?: OrderStatus) => {
  switch (status) {
    case 'Draft':
      return { name: '下書き', color: 'bg-rose-400' }
    case 'Ordered':
      return { name: '注文済み', color: 'bg-[#F2933D]' }
    case 'Proofcreating':
      return { name: '版下作成中', color: 'bg-[#7CC8FF]' }
    case 'Proofreading':
      return { name: '版下校正中', color: 'bg-[#0C92DD]' }
    case 'PrCompleted':
      return { name: '校了', color: 'bg-[#00C7BB]' }
    case 'Prshipped':
      return { name: '出荷済み', color: 'bg-[#6A6FEE]' }
    case 'Withdrawn':
      return { name: '差戻し／取下げ', color: 'bg-[#E55151]' }

    default:
      throw new Error('ステータスが不正です。')
  }
}

export const StatusChip = ({ statusName }: Props) => {
  const { name, color } = getStatus(statusName)

  return <p className={`w-20 rounded-3xl border py-1 text-center text-xs text-white ${color}`}>{name}</p>
}
