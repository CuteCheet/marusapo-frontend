import type { AmplifyUser } from '@aws-amplify/ui'

export type AttributesUserType = 'retailer' | 'sc' | 'customer' | 'myoko'

export const getUserType = (user: AmplifyUser) => {
  return user?.attributes?.['custom:user_type'] as AttributesUserType | undefined
}

export const getUserName = (user: AmplifyUser) => {
  return user?.attributes?.['custom:user_name']
}
