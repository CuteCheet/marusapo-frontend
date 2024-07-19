import Image from 'next/image'
import Link from 'next/link'

export const Aside = () => {
  return (
    <aside className="w-1/6 bg-blue-100 font-bold text-blue-900">
      <button className="flex w-full justify-end pr-2">
        <Image src="/hamburger.svg" width={24} height={24} alt="ハンバーガーメニューアイコン" />
      </button>
      <nav className="flex flex-col">
        <Link className="border-b py-2 pl-4" href="">
          ホーム
        </Link>
        <Link className="border-b py-2 pl-4" href="">
          新規
        </Link>
        <Link className="border-b py-2 pl-4" href="">
          設定
        </Link>
      </nav>
    </aside>
  )
}
