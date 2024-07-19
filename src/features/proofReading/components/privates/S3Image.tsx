import { getObject } from '../../api/getObject'

import type { Storage } from 'aws-amplify'

type Props = {
  filePath: Parameters<(typeof Storage)['get']>[0]
  option?: Parameters<(typeof Storage)['get']>[1]
}

export const S3Image = async ({ filePath, option }: Props) => {
  const file = await getObject(filePath, option).catch(() => '')
  return <img alt="upload-file" src={file} className="max-h-96 max-w-sm" />
}

export default S3Image
