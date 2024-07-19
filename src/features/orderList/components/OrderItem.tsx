'use client'

import Link from 'next/link'

import { StatusChip } from '@/components/statusChip'
import { PAPER_TYPES, PRINT_TYPES } from '@/features/orderForm'

import type { OrderItem as OrderItemType } from '../types'

type Props = {
  data: OrderItemType
}

export const OrderItem = ({ data }: Props) => {
  // 注文日付と出荷日はDBには「-」区切りで保存されているため、「/」区切りに変換
  const formattedOrderedDate = new Date(data.orderedDate).toLocaleDateString()
  const formattedShippingDate = data.shippingDate ? new Date(data.shippingDate).toLocaleDateString() : ''
  const validStatuses = ['Draft', 'Ordered', 'Proofcreating', 'Proofreading', 'PrCompleted', 'Prshipped', 'Withdrawn']

  return (
    <article className="rounded-lg shadow-md shadow-gray-400">
      <div className="flex flex-col gap-2 rounded-t-lg bg-blue-100 px-4 pb-2 pt-4">
        <h2 className="flex w-full gap-1 text-base">
          {validStatuses.includes(data.status) && <StatusChip statusName={data.status} />}
          <Link href={`/order/${data.orderId}`} className="text-blue-900 underline visited:text-purple-700 hover:text-blue-500">
            注文書No.：{data.customOrderId}
          </Link>
        </h2>

        <div className="grid grid-cols-5 gap-1 text-sm">
          <span className="col-span-2 truncate">
            <span className="mr-1">会社名:</span>
            {data.customerCompanyName ? `${data.customerCompanyName}` : ''}
          </span>
          <span className="col-span-2 truncate">
            <span className="mr-1">お客様名:</span>
            {data.customerName ? `${data.customerName}様` : ''}
          </span>
          <span className="col-span-1 text-right">
            <span className="mr-1">注文日:</span>
            {formattedOrderedDate}
          </span>
        </div>
      </div>

      <div className="rounded-b-lg bg-white px-4 py-3 text-xs">
        <div className="flex flex-row border-b-2 pb-4">
          <p className="flex w-1/3 flex-col">
            <span>品名：名刺</span>
            <span>商品詳細１：{PAPER_TYPES.find((v) => v.id === data.paperTypeId)?.name}</span>
            <span>商品詳細２：{PRINT_TYPES.find((v) => v.id === data.printTypeId)?.name}</span>
          </p>

          <p className="flex w-1/3 flex-col">
            <span>注文点数：{data.numberOfOrders}</span>
            <span>数量：{data.numberOfCopies}枚</span>
            <span>配送先：{data.deliveryTypeId === 3 ? '店舗受取' : 'お客様直送'}</span>
          </p>

          <p className="flex w-1/3 flex-col">
            <span>出荷日：{formattedShippingDate}</span>
            <span>配送会社：{data.expressCompany}</span>
            <span>送り状ナンバー：{data.trackingNumber}</span>
          </p>
        </div>

        <div className="mt-2 flex flex-row justify-between">
          <p className="flex flex-col">
            <span>発注者：{data.retailerName}</span>
            <span>受注者：妙高コーポレーション(株)</span>
          </p>
          {data.deliveryPrice && (
            <p>
              <span className="font-bold">納品価格（税込）：¥{Number(data.deliveryPrice).toLocaleString()}</span>
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
