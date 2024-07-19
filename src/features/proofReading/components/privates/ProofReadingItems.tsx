import { saveAs } from 'file-saver'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React, { memo } from 'react'
import { jsPDF } from 'jspdf'

import UserIcon from '~/public/user-icon.svg'
import PrintIcon from '~/public/print-icon.svg'

import { getObject } from '../../api/getObject'
import { LOCAL_DATE_OPTION } from '../../constants'

import type { ProofReadingItem } from '../../types'
import type { OrderStatus } from '@/types/order'
import { getStatus } from '@/components/statusChip'

type Props = {
  data: ProofReadingItem[]
  orderStatus?: OrderStatus
}

const DynamicS3Image = memo(
  dynamic(() => import('./S3Image'), { ssr: false, loading: () => <p className="text-gray-500">画像読み込み中...</p> })
)

const convertImageToPDFAndPrint = async (filePath: string) => {
  const result = await getObject(filePath, { download: true })
  if (!result.Body) return

  const blob = new Blob([result.Body], { type: 'image/png' })
  const url = URL.createObjectURL(blob)

  const img = new window.Image()
  img.onload = () => {
    const pdf = new jsPDF({
      orientation: img.width > img.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [img.width, img.height]
    })

    pdf.addImage(img, 'PNG', 0, 0, img.width, img.height)

    const pdfBlob = pdf.output('blob')

    const pdfUrl = URL.createObjectURL(pdfBlob)
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = pdfUrl
    document.body.appendChild(iframe)

    iframe.onload = () => {
      iframe.contentWindow?.print()
    }
  }
  img.src = url
}

const printPDF = async (filePath: string) => {
  const result = await getObject(filePath, { download: true })
  if (!result.Body) return

  const blob = new Blob([result.Body], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  document.body.appendChild(iframe)
  iframe.onload = () => {
    iframe.contentWindow?.print()
  }
}

export const ProofReadingItems = ({ data, orderStatus: _orderStatusProps }: Props) => {
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
      {data.map((item, index) => {
        return (
          <li key={`ProofReadingItem-${index}`} className="border-b-2 px-16 py-9">
            <article className="flex flex-col gap-3">
              <div className="flex flex-row gap-2">
                <Image alt="user-icon" src={UserIcon} width={30} height={30} />

                <p className="flex flex-col">
                  <span>{item.displayName}さん</span>
                  <time className="text-xs text-gray-400">
                    {new Date(item.postUnixTime / 1000).toLocaleDateString('ja-JP', LOCAL_DATE_OPTION)}
                  </time>
                </p>
              </div>

              {item.fileName && item.fileType !== 'application/pdf' && (
                <div className="relative flex justify-center items-end h-full">
                  <DynamicS3Image filePath={`${item.orderId}/${item.fileName}`} />
                  {item.displayName === '丸サポ運営事務局' && (
                    <Image
                      alt="Print icon"
                      src={PrintIcon}
                      width={30}
                      height={30}
                      className="absolute right-[0px] bottom-0 cursor-pointer"
                      onClick={() => convertImageToPDFAndPrint(`${item.orderId}/${item.fileName}`)}
                    />
                  )}
                </div>
              )}

              <div className="flex items-baseline">
                <span>ステータスが&nbsp;&nbsp;&nbsp;</span>
                <span className="mx-2 min-w-32 w-[102px] rounded-3xl border py-1 text-center text-white bg-[#00C7BB] whitespace-nowrap overflow-hidden">
                  {getStatus(_orderStatusProps).name}
                </span>
                <span>&nbsp;&nbsp;&nbsp;になりました</span>
              </div>

              <p className="whitespace-pre-line">{item.message}</p>

              {item.isCompleted && (
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

              {item.fileName && item.fileType === 'application/pdf' && (
                <div className="relative flex items-end h-full">
                  <div className="w-fit whitespace-pre-line break-all rounded border-2 bg-gray-50 p-2 text-sm">
                    <a
                      href="#"
                      title={item.originalFileName}
                      onClick={(event) => onClickFile(event, item)}
                      className="flex items-center hover:text-blue-500 hover:underline"
                    >
                      <p className="max-w-[calc(100%-1.5rem)]">{item.originalFileName}</p>
                      <span className="i-ion-arrow-down-circle ml-1 text-xl text-blue-600" />
                    </a>
                  </div>
                  {item.displayName === '丸サポ運営事務局' && (
                    <Image
                      alt="Print icon"
                      src={PrintIcon}
                      width={30}
                      height={30}
                      className="absolute right-[0px] bottom-0 cursor-pointer"
                      onClick={() => printPDF(`${item.orderId}/${item.fileName}`)}
                    />
                  )}
                </div>
              )}
            </article>
          </li>
        )
      })}
    </ol>
  )
}
