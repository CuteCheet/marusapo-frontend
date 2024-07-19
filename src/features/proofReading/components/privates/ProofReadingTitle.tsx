import Image from 'next/image'

import { WhiteSquareButton } from '@/components/button/WhiteSquareButton'
import Reload from '~/public/reload.svg'

import { LOCAL_DATE_OPTION } from '../../constants'

import type { UseQueryResult } from '@tanstack/react-query'

type Props = {
  refetch: UseQueryResult['refetch']
  dataUpdatedAt: UseQueryResult['dataUpdatedAt']
}

export const ProofReadingTitle = ({ refetch, dataUpdatedAt }: Props) => {
  const handleClick = () => {
    return refetch()
  }

  return (
    <div className="flex flex-row items-start justify-between">
      <h2 className="text-lg font-bold">進捗管理</h2>

      <div className="flex flex-col items-end gap-1 text-sm">
        <WhiteSquareButton type="button" onClick={handleClick} size="middle">
          <span className="mr-2">最新のメッセージを取得</span>
          <Image alt="更新ボタン" src={Reload} className="inline-block" />
        </WhiteSquareButton>

        <time className="flex flex-row text-xs text-gray-400">
          {new Date(dataUpdatedAt).toLocaleDateString('ja-JP', LOCAL_DATE_OPTION)}
          &nbsp;に更新
        </time>
      </div>
    </div>
  )
}
