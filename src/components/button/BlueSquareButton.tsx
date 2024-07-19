type Props = {
  children: React.ReactNode
  size?: 'middle' | 'large'
} & Pick<React.ComponentProps<'button'>, 'disabled' | 'type' | 'name'>

export const BlueSquareButton = ({ disabled = false, type = 'button', size = 'large', name, children }: Props) => {
  const sizeClass = size === 'large' ? 'w-[400px] py-4' : `w-[196px] h-[40px]`
  return (
    <button
      disabled={disabled}
      type={type}
      name={name}
      className={`rounded bg-blue-500 font-bold text-white hover:bg-blue-700 disabled:bg-gray-400 ${sizeClass}`}
    >
      {children}
    </button>
  )
}
