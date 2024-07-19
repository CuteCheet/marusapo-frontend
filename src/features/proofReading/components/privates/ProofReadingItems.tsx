import { saveAs } from 'file-saver'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { memo } from 'react'

import UserIcon from '~/public/user-icon.svg'

import { getObject } from '../../api/getObject'
import { LOCAL_DATE_OPTION } from '../../constants'

import type { ProofReadingItem } from '../../types'

type Props = {
  data: ProofReadingItem[]
}

const DynamicS3Image = memo(
  dynamic(() => import('./S3Image'), { ssr: false, loading: () => <p className="text-gray-500">画像読み込み中...</p> })
)

export const ProofReadingItems = ({ data }: Props) => {
  const onClickFile = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: Pick<ProofReadingItem, 'orderId' | 'fileName' | 'originalFileName'>
  ) => {
    event.preventDefault()

    const confirmResult = confirm(`${data.originalFileName}をダウンロードしますか？`)
    if (!confirmResult) {
      return
    }

    const result = await getObject(`${data.orderId}/${data.fileName}`, { download: true })
    if (!result.Body) {
      return
    }
    saveAs(result.Body, data.originalFileName)
  }

  return (
    <ol>
      {data.map((data, index) => {
        return (
          <li key={`ProofReadingItem-${index}`} className="border-b-2 px-16 py-9">
            <article className="flex flex-col gap-3">
              <div className="flex flex-row gap-2">
                <Image alt="user-icon" src={UserIcon} width={30} height={30} />

                <p className="flex flex-col">
                  <span>{data.displayName}さん</span>
                  <time className="text-xs text-gray-400">
                    {new Date(data.postUnixTime / 1000).toLocaleDateString('ja-JP', LOCAL_DATE_OPTION)}
                  </time>
                </p>
              </div>

              {data.fileName && data.fileType !== 'application/pdf' && (
                <div className="flex justify-center">
                  <DynamicS3Image filePath={`${data.orderId}/${data.fileName}`} />
                </div>
              )}

              <p className="whitespace-pre-line">{data.message}</p>

              {data.isCompleted && (
                <div className="rounded-lg border-2 border-orange-400 bg-orange-200 p-4 text-neutral-800">
                  <span className="font-bold">オリジナル商品制作室より</span>
                  <p className="mt-3">
                    ご確認いただき、ありがとうございます。
                    <br />
                    これより印刷工程に進みます。
                    <br />
                    この後の修正はいたしかねますので、ご了承ください。
                  </p>
                </div>
              )}

              {data.fileName && data.fileType === 'application/pdf' && (
                <div className="w-fit whitespace-pre-line break-all rounded border-2 bg-gray-50 p-2 text-sm">
                  <a
                    href="#"
                    title={data.originalFileName}
                    onClick={(event) => onClickFile(event, data)}
                    className="flex items-center hover:text-blue-500 hover:underline"
                  >
                    <p className="max-w-[calc(100%-1.5rem)]">{data.originalFileName}</p>
                    <span className="i-ion-arrow-down-circle ml-1 text-xl text-blue-600" />
                  </a>
                </div>
              )}
            </article>
          </li>
        )
      })}
    </ol>
  )
}
