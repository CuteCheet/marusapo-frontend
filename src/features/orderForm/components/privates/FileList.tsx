import { saveAs } from 'file-saver'
import { useState } from 'react'

import { LoadingSpin } from '@/components/loading/Spin'

import { getObject } from '../../api'

export type FileListProps = {
  fileNames: string[]
  orderId: string
}

export const FileList = ({ fileNames, orderId }: FileListProps) => {
  const [loadingFileName, setLoadingFileName] = useState<string | undefined>(undefined)
  const onClickFile = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, fileName: string) => {
    event.preventDefault()
    setLoadingFileName(fileName)

    const confirmResult = confirm(`${fileName}をダウンロードしますか？`)
    if (!confirmResult) {
      setLoadingFileName(undefined)
      return
    }

    const result = await getObject(`${orderId}/${fileName}`, { download: true })
    if (!result.Body) {
      setLoadingFileName(undefined)
      return
    }
    saveAs(result.Body, fileName)

    setLoadingFileName(undefined)
  }

  const FileName = ({ fileName }: { fileName: string }) => {
    if (loadingFileName === undefined) {
      return (
        <a
          href="#"
          title={fileName}
          onClick={(event) => onClickFile(event, fileName)}
          className="hover:text-blue-500 hover:underline"
        >
          {fileName}
        </a>
      )
    } else if (loadingFileName === fileName) {
      return (
        <div className="flex w-full items-center justify-center">
          <div className="h-4 w-4">
            <LoadingSpin />
          </div>
        </div>
      )
    }

    return <span title={fileName}>{fileName}</span>
  }

  return (
    <div className={`flex w-full flex-row ${fileNames.length < 4 ? 'items-center' : 'items-baseline'}`}>
      <p className="w-1/5">
        原稿・素材
        <br />
        アップロード
      </p>
      <div className="flex w-4/5 flex-wrap gap-4">
        {fileNames.map((fileName, index) => {
          return (
            <div key={index} className="w-1/5 truncate rounded border-2 bg-gray-50 p-2 text-center text-xs">
              <FileName fileName={fileName} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
