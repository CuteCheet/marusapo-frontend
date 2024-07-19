'use client'

import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { useUserContext } from '@/providers/auth'

import { removeFile, putOrder } from '../api'

import type { CustomerInfoProps } from '../components/privates/CustomerInfo'
import type { DestinationProps } from '../components/privates/Destination'
import type { FileUploadFieldProps } from '../components/privates/FileUploadField'
import type { OrderInfoProps } from '../components/privates/OrderInfo'
import type { OrderSheetInfoProps } from '../components/privates/OrderSheetInfo'
import type { PrintedCharactersInfoProps } from '../components/privates/PrintedCharactersInfo'
import type { ProofreaderProps } from '../components/privates/Proofreader'
import type { EditableOrderType, NewOrderType } from '../types'

export const useNewOrderForm = (defaultValues: EditableOrderType, uploadedFileNames: string[]) => {
  const idToken = useUserContext()!.getSignInUserSession()!.getIdToken().getJwtToken()

  const { register, formState, setValue, handleSubmit, control, getValues, setFocus } = useForm<NewOrderType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
    defaultValues
  })
  const { fields, remove } = useFieldArray({ control, name: 'files' })
  const [uploadedFileNamesState, setUploadedFileNames] = useState<string[]>(uploadedFileNames)

  const orderSheetInfoProps: OrderSheetInfoProps = {
    customOrderId: {
      register: register('customOrderId')
    },
    orderedDate: {
      register: register('orderedDate')
    },
    retailerName: {
      register: register('retailerName')
    },
    customerService: {
      register: register('customerService')
    }
  }

  const customerInfoProps: CustomerInfoProps = {
    customerCompanyName: {
      register: register('customerCompanyName')
    },
    customerName: {
      register: register('customerName', {
        validate: (value) => {
          return !(getValues('proofReaderTypeId') === '1' && !value)
        }
      }),
      errors: formState.errors.customerName
    },
    customerRuby: {
      register: register('customerRuby')
    },
    customerZipCode: {
      register: register('customerZipCode')
    },
    customerAddress: {
      register: register('customerAddress')
    },
    customerTel: {
      register: register('customerTel')
    },
    customerPhone: {
      register: register('customerPhone')
    },
    customerFax: {
      register: register('customerFax')
    }
  }

  const destinationProps: DestinationProps<NewOrderType> = {
    deliveryTypeId: {
      register: register('deliveryTypeId')
    },
    deliveryCompanyName: {
      register: register('deliveryCompanyName')
    },
    deliveryCustomerName: {
      register: register('deliveryCustomerName')
    },
    deliveryZipCode: {
      register: register('deliveryZipCode')
    },
    deliveryAddress: {
      register: register('deliveryAddress')
    },
    deliveryTel: {
      register: register('deliveryTel')
    },
    control
  }

  const orderInfoProps: OrderInfoProps = {
    paperTypeId: {
      register: register('paperTypeId')
    },
    printTypeId: {
      register: register('printTypeId')
    },
    logoTypeId: {
      register: register('logoTypeId')
    },
    logoCount: {
      register: register('logoCount')
    },
    draftTypeId: {
      register: register('draftTypeId', {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          switch (e.target.value) {
            case '1':
              setValue('draftDetail', 'デザインNo.：\n書体：見本通り\n印刷色：見本通り')
              break
            case '2':
              setValue('draftDetail', '')
              break
            case '3':
              setValue('draftDetail', '書体：見本通り\n印刷色：見本通り')
              break
            case '4':
              setValue('draftDetail', '')
              break
            case '5':
              setValue('draftDetail', '修正点数：点\n修正箇所：')
              break
            default:
              setValue('draftDetail', undefined)
          }
        }
      })
    },
    draftDetail: {
      register: register('draftDetail')
    },
    numberOfOrders: {
      register: register('numberOfOrders')
    },
    numberOfCopies: {
      register: register('numberOfCopies')
    }
  }

  const fileUploadFieldProps: FileUploadFieldProps = {
    register: register('files', {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        const currentFileName = files?.[0]?.name
        if (!currentFileName) {
          setValue('files', fields)
          return
        }
        const hasSameFile = [...fields.map((field) => field.file.name), ...uploadedFileNamesState].includes(currentFileName)
        if (hasSameFile) {
          setValue('files', fields)
          return
        }
        setValue('files', [...fields, { file: files[0] }])
      }
    }),
    currentInputFields: fields,
    uploadedFileNames: uploadedFileNamesState,
    removeInputFile: remove,
    removeS3File: async (fileName) => {
      // NOTE: 下書き編集時に既にアップロードされているファイルを削除する
      if (defaultValues.orderId) {
        await putOrder(defaultValues.orderId, idToken, { files: uploadedFileNamesState.filter((name) => name !== fileName) })
        await removeFile(`${defaultValues.orderId}/${fileName}`)
        setUploadedFileNames((prev) => prev.filter((name) => name !== fileName))
      }
    }
  }

  const printedCharactersInfoProps: PrintedCharactersInfoProps = {
    printedCompanyName: {
      register: register('printedCompanyName')
    },
    printedAdditionalComment: {
      register: register('printedAdditionalComment')
    },
    printedDepartment: {
      register: register('printedDepartment')
    },
    printedCustomerName: {
      register: register('printedCustomerName')
    },
    printedCustomerRuby: {
      register: register('printedCustomerRuby')
    },
    printedQualification: {
      register: register('printedQualification')
    },
    printedZipCode: {
      register: register('printedZipCode')
    },
    printedAddress: {
      register: register('printedAddress')
    },
    printedTel: {
      register: register('printedTel')
    },
    printedRemark: {
      register: register('printedRemark')
    }
  }

  const proofreaderProps: ProofreaderProps<NewOrderType> = {
    proofReaderTypeId: {
      register: register('proofReaderTypeId')
    },
    customerEmail: {
      register: register('customerEmail', {
        validate: (value) => {
          return !(getValues('proofReaderTypeId') === '1' && !value)
        }
      }),
      errors: formState.errors.customerEmail
    },
    customerPassword: {
      register: register('customerPassword', {
        validate: (value) => {
          return !(getValues('proofReaderTypeId') === '1' && !value)
        }
      }),
      errors: formState.errors.customerPassword
    },
    control
  }

  return {
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
  }
}
