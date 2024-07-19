import { Header } from './privates/Header'

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="w-[800px]">{children}</div>
      </div>
    </>
  )
}
