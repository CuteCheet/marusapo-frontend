import { useMutation, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { BlueSquareButton } from '@/components/button/BlueSquareButton'
import { getUserType } from '@/lib/aws-amplify'
import { useUserContext } from '@/providers/auth'

import { submitProofReading } from '../../api/submitProofReading'
import { EXTENSION_ERROR_MESSAGE, FIRST_PROOF_FAILED_MESSAGE, getDisplayName, UPLOADABLE_EXTENSION_LIST } from '../../constants'

import type { SubmitProofReadingParams } from '../../types'
import type { Control } from 'react-hook-form'

type FirstProofFormType = {
  file: File
}

type FirstProofFormProps = {
  orderId: string
  refetch: UseQueryResult['refetch']
}

const WatchFile = ({
  control,
  children
}: {
  control: Control<FirstProofFormType>
  children: (file?: File) => React.ReactNode
}) => {
  const fileField = useWatch({ name: 'file', control })

  const childNode = useMemo(() => children(fileField), [children, fileField])
  return <>{childNode}</>
}

export const FirstProofForm = ({ orderId, refetch }: FirstProofFormProps) => {
  const { register, handleSubmit, setValue, control } = useForm<FirstProofFormType>()
  const user = useUserContext()!

  const idToken = user?.getSignInUserSession()?.getIdToken().getJwtToken()
  const userType = getUserType(user!)

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: SubmitProofReadingParams) => submitProofReading(data, idToken!),
    onSuccess: () => refetch(),
    onError: () => alert(FIRST_PROOF_FAILED_MESSAGE)
  })

  const onSubmit = ({ file }: FirstProofFormType) => {
    if (!file || !idToken || !userType) return

    if (file instanceof File && !(UPLOADABLE_EXTENSION_LIST as unknown as string[]).includes(file.type)) {
      alert(EXTENSION_ERROR_MESSAGE)
      return
    }

    return mutate({
      orderId,
      displayName: getDisplayName(userType, user),
      file,
      isCompleted: false
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center gap-9">
      <div className="flex w-2/3 flex-col items-center gap-4 bg-gray-200 py-16 outline -outline-offset-8 outline-white">
        <span className="font-bold">初校をアップロードしてください</span>
        <label htmlFor="file" className="bg-[#B9B9B9] p-2 hover:cursor-pointer">
          ファイルを選択
          <input
            type="file"
            className="hidden"
            id="file"
            {...register('file', {
              onChange: (e) => {
                setValue('file', e.target.files[0])
              }
            })}
          />
        </label>

        <WatchFile control={control}>
          {(file) => {
            return <span>{file?.name}</span>
          }}
        </WatchFile>
      </div>

      <WatchFile control={control}>
        {(file) => {
          return (
            <BlueSquareButton type="submit" disabled={!file || isLoading}>
              {isLoading ? '登録中...' : '登録'}
            </BlueSquareButton>
          )
        }}
      </WatchFile>
    </form>
  )
}
