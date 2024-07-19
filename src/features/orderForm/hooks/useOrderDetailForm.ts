import { useForm } from 'react-hook-form'

import type { OrderDetailType } from '..'
import type { CustomerInfoProps } from '../components/privates/CustomerInfo'
import type { DestinationProps } from '../components/privates/Destination'
import type { FileListProps } from '../components/privates/FileList'
import type { OrderInfoProps } from '../components/privates/OrderInfo'
import type { OrderSheetInfoProps } from '../components/privates/OrderSheetInfo'
import type { PrintedCharactersInfoProps } from '../components/privates/PrintedCharactersInfo'
import type { ProofreaderProps } from '../components/privates/Proofreader'

export const useOrderDetailForm = (data: OrderDetailType) => {
  const { register, control } = useForm<OrderDetailType>({
    defaultValues: {
      ...data
    }
  })

  const orderSheetInfoProps: OrderSheetInfoProps = {
    customOrderId: {
      register: register('customOrderId', { disabled: true })
    },
    orderedDate: {
      register: register('orderedDate', { disabled: true })
    },
    retailerName: {
      register: register('retailerName', { disabled: true })
    },
    customerService: {
      register: register('customerService', { disabled: true })
    }
  }

  const customerInfoProps: CustomerInfoProps = {
    customerCompanyName: {
      register: register('customerCompanyName', { disabled: true })
    },
    customerName: {
      register: register('customerName', { disabled: true })
    },
    customerRuby: {
      register: register('customerRuby', { disabled: true })
    },
    customerZipCode: {
      register: register('customerZipCode', { disabled: true })
    },
    customerAddress: {
      register: register('customerAddress', { disabled: true })
    },
    customerTel: {
      register: register('customerTel', { disabled: true })
    },
    customerPhone: {
      register: register('customerPhone', { disabled: true })
    },
    customerFax: {
      register: register('customerFax', { disabled: true })
    }
  }

  const destinationProps: DestinationProps<OrderDetailType> = {
    deliveryTypeId: {
      register: register('deliveryTypeId', { disabled: true })
    },
    deliveryCompanyName: {
      register: register('deliveryCompanyName', { disabled: true })
    },
    deliveryCustomerName: {
      register: register('deliveryCustomerName', { disabled: true })
    },
    deliveryZipCode: {
      register: register('deliveryZipCode', { disabled: true })
    },
    deliveryAddress: {
      register: register('deliveryAddress', { disabled: true })
    },
    deliveryTel: {
      register: register('deliveryTel', { disabled: true })
    },
    control
  }

  const orderInfoProps: OrderInfoProps = {
    paperTypeId: {
      register: register('paperTypeId', { disabled: true })
    },
    printTypeId: {
      register: register('printTypeId', { disabled: true })
    },
    logoTypeId: {
      register: register('logoTypeId', { disabled: true })
    },
    logoCount: {
      register: register('logoCount', { disabled: true })
    },
    draftTypeId: {
      register: register('draftTypeId', { disabled: true })
    },
    draftDetail: {
      register: register('draftDetail', { disabled: true })
    },
    numberOfOrders: {
      register: register('numberOfOrders', { disabled: true })
    },
    numberOfCopies: {
      register: register('numberOfCopies', { disabled: true })
    }
  }

  const fileListProps: FileListProps = {
    fileNames: data.files || [],
    orderId: data.orderId
  }

  const printedCharactersInfoProps: PrintedCharactersInfoProps = {
    printedCompanyName: {
      register: register('printedCompanyName', { disabled: true })
    },
    printedAdditionalComment: {
      register: register('printedAdditionalComment', { disabled: true })
    },
    printedDepartment: {
      register: register('printedDepartment', { disabled: true })
    },
    printedCustomerName: {
      register: register('printedCustomerName', { disabled: true })
    },
    printedCustomerRuby: {
      register: register('printedCustomerRuby', { disabled: true })
    },
    printedQualification: {
      register: register('printedQualification', { disabled: true })
    },
    printedZipCode: {
      register: register('printedZipCode', { disabled: true })
    },
    printedAddress: {
      register: register('printedAddress', { disabled: true })
    },
    printedTel: {
      register: register('printedTel', { disabled: true })
    },
    printedRemark: {
      register: register('printedRemark', { disabled: true })
    }
  }

  const proofreaderProps: ProofreaderProps<OrderDetailType> = {
    proofReaderTypeId: {
      register: register('proofReaderTypeId', { disabled: true })
    },
    customerEmail: {
      register: register('customerEmail', { disabled: true })
    },
    control
  }

  return {
    orderSheetInfoProps,
    customerInfoProps,
    destinationProps,
    orderInfoProps,
    fileListProps,
    printedCharactersInfoProps,
    proofreaderProps
  }
}
