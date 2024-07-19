'use client'

import { Authenticator } from '@aws-amplify/ui-react'
import { Amplify, I18n } from 'aws-amplify'
import { createContext, useContext } from 'react'

import { components, formFields, vocabularies } from './amplifyOptions'

import type { AmplifyUser } from '@aws-amplify/ui'
import type { UseAuthenticator } from '@aws-amplify/ui-react-core'

Amplify.configure({
  aws_project_region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID
})

I18n.setLanguage('ja')
I18n.putVocabularies(vocabularies)

const userContext = createContext<AmplifyUser | null>(null)
const signOutContext = createContext<UseAuthenticator['signOut'] | null>(null)

export const useUserContext = () => useContext(userContext)
export const useSignOutContext = () => useContext(signOutContext)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <Authenticator hideSignUp={true} components={components} formFields={formFields}>
      {({ signOut, user }) => {
        return (
          <userContext.Provider value={user || null}>
            <signOutContext.Provider value={signOut || null}>{children}</signOutContext.Provider>
          </userContext.Provider>
        )
      }}
    </Authenticator>
  )
}
