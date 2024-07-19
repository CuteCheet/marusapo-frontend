'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { getUserType, type AttributesUserType, getUserName } from '@/lib/aws-amplify'
import { useSignOutContext, useUserContext } from '@/providers/auth'

export const Header = () => {
  const pathName = usePathname()
  const user = useUserContext()!
  const signOut = useSignOutContext()!
  const userName = getUserName(user)!
  const userType = getUserType(user)!

  const displayName = ((userType: AttributesUserType) => {
    switch (userType) {
      case 'retailer':
        return userName
      case 'sc':
        return 'オリジナル商品制作室'
      case 'customer':
        return userName
      case 'myoko':
        return userName
    }
  })(userType)

  const enableTransition = userType !== 'customer' && pathName !== '/'

  return (
    <header className="flex items-center justify-between bg-blue-900 px-4 py-2 text-white">
      <p className="text-xl font-bold">
        {enableTransition ? <Link href="/">名入れ丸ごとサポート</Link> : '名入れ丸ごとサポート'}
      </p>
      <div>
        <span className="text-base">{displayName}</span>
        <span className="text-sm">さん</span>
        <button
          className="ml-3 rounded border border-gray-400 bg-gray-500 px-3 py-1 text-xs text-white hover:bg-gray-400"
          onClick={signOut}
        >
          ログアウト
        </button>
      </div>
    </header>
  )
}
