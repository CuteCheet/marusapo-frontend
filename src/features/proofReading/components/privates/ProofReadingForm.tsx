import { useMutation } from '@tanstack/react-query'
import { isEmpty, pick } from 'lodash'
import { notFound } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { BlueSquareButton } from '@/components/button/BlueSquareButton'
import { WhiteSquareButton } from '@/components/button/WhiteSquareButton'
import { Modal } from '@/components/modal'
import { getUserType } from '@/lib/aws-amplify'
import { useUserContext } from '@/providers/auth'

import { submitProofReading } from '../../api/submitProofReading'
import {
  EMPTY_PROOF_READING_POST_MESSAGE,
  EMPTY_PROOF_READING_TYPE_MESSAGE,
  EXTENSION_ERROR_MESSAGE,
  HANDLE_ERROR_MESSAGE,
  PROOF_READING_COMPLETED_MESSAGE,
  PROOF_READING_SUBMIT_COMPLETED_MESSAGE,
  SUBMIT_FAILED_MESSAGE,
  UPLOADABLE_EXTENSION_LIST,
  getDisplayName
} from '../../constants'

import type { SubmitProofReadingParams } from '../../types'
import type { OrderStatus } from '@/types/order'
import type { UseQueryResult } from '@tanstack/react-query'
import type { Control } from 'react-hook-form'

type ProofReadingFormType = {
  proofReadingType?: 'ok' | 'ng'
  message?: string
  file?: File
}

type ProofReadingFormProps = {
  orderId: string
  orderStatus?: OrderStatus
  refetch: UseQueryResult['refetch']
}

const WatchFile = ({
  control,
  children
}: {
  control: Control<ProofReadingFormType>
  children: (file?: File) => React.ReactNode
}) => {
  const fileField = useWatch({ name: 'file', control })

  const childNode = useMemo(() => children(fileField), [children, fileField])
  return <>{childNode}</>
}

export const ProofReadingForm = ({ orderId, orderStatus: _orderStatusProps, refetch }: ProofReadingFormProps) => {
  // NOTE: Draft時に校正フォームが呼び出されることは想定されない
  if (_orderStatusProps === 'Draft') notFound()

  const defaultProofReadingType = useCallback((): ProofReadingFormType['proofReadingType'] => {
    if (_orderStatusProps === 'Proofreading') {
      // NOTE: 校正中のみ修正の有無をユーザーに選択してもらうが、初期値は未選択にしたいためundefinedとする
      return
    }

    // NOTE: 校正中以外はメッセージ機能として使用するため'ng'のみ選択される
    return 'ng'
  }, [_orderStatusProps])

  const { register, handleSubmit, setValue, control } = useForm<ProofReadingFormType>({
    defaultValues: {
      proofReadingType: defaultProofReadingType()
    }
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  // NOTE: 初校登録後に注文情報のステータスを更新するが、更新後の注文情報自体の再取得リクエストを回避するため、ローカルで状態管理
  const [orderStatus, setOrderStatus] = useState(_orderStatusProps)

  const user = useUserContext()!
  const idToken = useUserContext()?.getSignInUserSession()?.getIdToken().getJwtToken()
  const userType = getUserType(user!)

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SubmitProofReadingParams) => {
      isModalOpen && setIsModalOpen(false)
      await submitProofReading(data, idToken!)
      return data
    },
    onSuccess: (data) => {
      setValue('message', undefined)
      setValue('file', undefined)
      if (data.isCompleted) {
        alert(PROOF_READING_SUBMIT_COMPLETED_MESSAGE)
      }

      if (data.isFirstPr) {
        setOrderStatus('Proofreading')
      }
      return refetch()
    },
    onError: () => alert(SUBMIT_FAILED_MESSAGE)
  })

  const onSubmit = (data: ProofReadingFormType) => {
    if (!idToken || !userType) {
      alert(HANDLE_ERROR_MESSAGE)
      return
    }

    if (!data.proofReadingType) {
      alert(EMPTY_PROOF_READING_TYPE_MESSAGE)
      return
    }

    if (data.proofReadingType === 'ok') {
      return mutate({
        orderId,
        displayName: getDisplayName(userType, user),
        message: PROOF_READING_COMPLETED_MESSAGE,
        isCompleted: true
      })
    }

    if (data.file instanceof File && !(UPLOADABLE_EXTENSION_LIST as unknown as string[]).includes(data.file.type)) {
      alert(EXTENSION_ERROR_MESSAGE)
      return
    }

    if (!(data.file instanceof File) && isEmpty(data.message)) {
      alert(EMPTY_PROOF_READING_POST_MESSAGE)
      return
    }

    if (userType === 'sc' && orderStatus === 'Ordered' && data.file instanceof File) {
      !isModalOpen && setIsModalOpen(true)
      return
    }

    return mutate({
      orderId,
      displayName: getDisplayName(userType, user),
      ...pick(data, ['file', 'message']),
      isCompleted: false
    })
  }

  const handleSubmitFirstPr = (e: React.FormEvent<HTMLFormElement>) => {
    // nativeEventにsubmitterを含めるように型を拡張すると、Reactへの影響が大きいためts-ignoreで対応
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isFirstPr = e.nativeEvent.submitter?.name === 'first-pr-button'

    return handleSubmit((submitData) => {
      mutate({
        orderId,
        displayName: getDisplayName(userType!, user),
        ...pick(submitData, ['file', 'message']),
        isCompleted: false,
        isFirstPr
      })
    })(e)
  }

  return (
    <form
      className="flex flex-col items-center px-16 py-9"
      onSubmit={isModalOpen ? handleSubmitFirstPr : handleSubmit(onSubmit)}
    >
      {orderStatus === 'Proofreading' && (
        <fieldset className="w-full rounded-xl border-2 py-2 pl-4 [&:has(input:checked)]:bg-[#DFF4FF]">
          <label className="flex items-center">
            <input
              type="radio"
              value="ok"
              className="h-5 w-5 border-gray-300 bg-gray-100 text-blue-600"
              {...register('proofReadingType')}
            />
            <p className="ml-2 flex flex-col">
              <span className="text-2xl font-medium">修正なし</span>
              <span className="text-xs">※これで確定され印刷工程に進みます。</span>
            </p>
          </label>
        </fieldset>
      )}

      <fieldset className="mt-2 w-full rounded-xl border-2 px-4 py-2 [&:has(input:checked)]:bg-[#DFF4FF]">
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="radio"
              value="ng"
              className={`h-5 w-5 border-gray-300 bg-gray-100 text-blue-600 ${orderStatus !== 'Proofreading' && 'hidden'}`}
              {...register('proofReadingType')}
            />
            <p className="ml-2 flex flex-col">
              <span className="text-2xl font-medium">メッセージを送る</span>
              <span className="text-xs">※修正連絡などもこちらからどうぞ。</span>
            </p>
          </label>

          <div className="h-8 w-36 rounded-md border-2 bg-gray-50 text-xs">
            <WatchFile control={control}>
              {(file) => {
                return file === undefined ? (
                  <label htmlFor="pr-file" className="grid h-full w-full place-items-center text-center hover:cursor-pointer">
                    ファイルを選択
                  </label>
                ) : (
                  <div title={file.name} className="relative h-full w-full">
                    <button
                      type="button"
                      name="remove-file-button"
                      className="i-ion-md-close-circle absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 bg-gray-400 text-xl hover:bg-gray-600"
                      onClick={(e) => {
                        e.preventDefault()
                        setValue('file', undefined)
                      }}
                    />

                    <label htmlFor="pr-file" className="hover:cursor-pointer">
                      <p className="w-36 truncate p-2 text-center">{file.name}</p>
                    </label>
                  </div>
                )
              }}
            </WatchFile>

            <input
              id="pr-file"
              type="file"
              className="hidden"
              {...register('file', {
                onChange: (e) => {
                  setValue('file', e.target.files[0])
                }
              })}
            />
          </div>
        </div>

        <textarea
          rows={4}
          className="mt-2 w-full rounded-md border-2 p-3"
          placeholder="デザイン修正や連絡がある場合に入力してください"
          {...register('message')}
        />
      </fieldset>

      <div className="mt-8">
        <BlueSquareButton type="submit" disabled={isLoading}>
          {isLoading ? '登録中...' : '登録'}
        </BlueSquareButton>
      </div>

      {isModalOpen && (
        <Modal handleClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col">
            <p className="text-xl">
              画像がアップロードされました。
              <br />
              初校として登録いたしますか？
            </p>

            <p className="mt-4 flex flex-row">
              <span>※</span>
              <span>
                初校として登録すると、初校確認依頼のメールが送信され
                <br />
                ステータスが『<span className="font-bold">版下校正中</span>』になります
              </span>
            </p>

            <div className="mt-7 flex w-full flex-row justify-center gap-8">
              <BlueSquareButton type="submit" size="middle" name="first-pr-button" disabled={isLoading}>
                初校として登録する
              </BlueSquareButton>

              <WhiteSquareButton type="submit" size="middle" name="not-first-pr-button" disabled={isLoading}>
                <span className="font-bold">初校ではない</span>
              </WhiteSquareButton>
            </div>
          </div>
        </Modal>
      )}
    </form>
  )
}
