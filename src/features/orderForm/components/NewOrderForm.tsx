'use client'

import { useMutation } from '@tanstack/react-query'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/navigation'

import { BlueSquareButton } from '@/components/button/BlueSquareButton'
import { WhiteSquareButton } from '@/components/button/WhiteSquareButton'
import { LoadingSpin } from '@/components/loading/Spin'
import { getUserName } from '@/lib/aws-amplify'
import { useUserContext } from '@/providers/auth'

import { CustomerInfo } from './privates/CustomerInfo'
import { Destination } from './privates/Destination'
import { FileUploadField } from './privates/FileUploadField'
import { OrderInfo } from './privates/OrderInfo'
import { OrderSheetInfo } from './privates/OrderSheetInfo'
import { PrintedCharactersInfo } from './privates/PrintedCharactersInfo'
import { Proofreader } from './privates/Proofreader'
import { submitOrder } from '../api'
import {
  DRAFT_ORDER_SUCCESS_MESSAGE,
  INVALID_PROOFREADER_MESSAGE,
  ORDER_FAILED_MESSAGE,
  ORDER_SUCCESS_MESSAGE
} from '../constants'
import { useNewOrderForm } from '../hooks'

import type { NewOrderType, OrderDetailType } from '../types'

const DRAFT_SAVE_BUTTON_NAME = 'draft-save-button'
const SUBMIT_ORDER_BUTTON_NAME = 'submit-order-button'

type Props = {
  data?: OrderDetailType
  refetch?: () => Promise<unknown>
}

export const NewOrderForm = ({ data = undefined, refetch }: Props) => {
  const user = useUserContext()!
  const userName = getUserName(user)!

  const router = useRouter()

  const idToken = useUserContext()!.getSignInUserSession()!.getIdToken().getJwtToken()

  const defaultValues = data ?? {
    status: 'Draft',
    retailerName: userName,
    proofReaderTypeId: '1',
    deliveryTypeId: '1',
    paperTypeId: '1',
    printTypeId: '1',
    logoTypeId: undefined,
    draftTypeId: undefined,
    orderedDate: new Date()
      .toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .replaceAll('/', '-'),
    files: [],
    numberOfOrders: '1',
    numberOfCopies: '100'
  }

  const {
    orderSheetInfoProps,
    customerInfoProps,
    destinationProps,
    orderInfoProps,
    printedCharactersInfoProps,
    proofreaderProps,
    fileUploadFieldProps,
    handleSubmit,
    getValues,
    setFocus
  } = useNewOrderForm({ ...defaultValues, files: [] }, defaultValues?.files || [])

  const { mutate, isLoading } = useMutation({
    mutationFn: async (submitPayload: NewOrderType & { orderId: string }) => {
      await Auth.currentSession()
      const uploadFiles = submitPayload.files.map(({ file }) => file)
      // これからアップロードするファイル名と既にアップロードされてるファイル名をconcat
      const fileNames = (fileUploadFieldProps.uploadedFileNames || []).concat(submitPayload.files.map(({ file }) => file.name))
      return submitOrder({ ...submitPayload, files: fileNames }, uploadFiles, idToken)
    },
    onSuccess: async ({ orderId, status }) => {
      if (data === undefined) {
        // NOTE: 下書き編集ではない新規注文作成の場合
        router.push(`/order/${orderId}`)
      } else {
        refetch ? await refetch() : router.refresh()
        // NOTE: 下書き編集状態で注文ボタンを押下した場合、 URLが変わらないためスクロール位置をトップに戻す
        window.scroll({ top: 0 })
      }
      alert(status === 'Draft' ? DRAFT_ORDER_SUCCESS_MESSAGE : ORDER_SUCCESS_MESSAGE)
    },
    onError: () => {
      alert(ORDER_FAILED_MESSAGE)
    }
  })

  const onValidate = () => {
    alert(INVALID_PROOFREADER_MESSAGE)
    setFocus('proofReaderTypeId')
  }

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement
    if (e.key === 'Enter' && !['TEXTAREA'].includes(target.tagName)) e.preventDefault()
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const orderId = data?.orderId || crypto.randomUUID()
    // nativeEventにsubmitterを含めるように型を拡張すると、Reactへの影響が大きいためts-ignoreで対応
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (e.nativeEvent.submitter?.name === DRAFT_SAVE_BUTTON_NAME) {
      e.preventDefault && e.preventDefault()
      return mutate({ ...getValues(), orderId, status: 'Draft' })
    }

    return handleSubmit((submitData) => mutate({ ...submitData, orderId, status: 'Ordered' }), onValidate)(e)
  }

  return (
    <form onSubmit={onSubmit} onKeyDown={checkKeyDown}>
      <div className="w-full text-end text-sm">
        <WhiteSquareButton type="submit" name={DRAFT_SAVE_BUTTON_NAME} disabled={isLoading} size="small">
          {isLoading ? (
            <div className="m-auto h-4 w-4">
              <LoadingSpin />
            </div>
          ) : (
            <span className="font-bold">下書き保存</span>
          )}
        </WhiteSquareButton>
      </div>

      <div className="mt-2 rounded-md bg-white py-5 pl-6 pr-12 shadow-md">
        <div className="border-b-2 pb-12">
          <OrderSheetInfo {...orderSheetInfoProps} />
        </div>

        <div className="mt-4 border-b-2 pb-12">
          <Proofreader {...proofreaderProps} />
        </div>

        <div className="mt-4 border-b-2 pb-12">
          <CustomerInfo {...customerInfoProps} />
        </div>

        <div className="mt-4 border-b-2 pb-12">
          <Destination {...destinationProps} />
        </div>

        <div className="mt-4 border-b-2 pb-12">
          <OrderInfo {...orderInfoProps} />
          <div className="mt-4">
            <FileUploadField {...fileUploadFieldProps} />
          </div>
        </div>

        <div className="mt-4">
          <PrintedCharactersInfo {...printedCharactersInfoProps} />
        </div>

        <div className="mt-5 flex w-full justify-center">
          <BlueSquareButton type="submit" disabled={isLoading} name={SUBMIT_ORDER_BUTTON_NAME}>
            {isLoading ? '注文中...' : '注文'}
          </BlueSquareButton>
        </div>
      </div>
    </form>
  )
}
