type Props = {
  children: React.ReactNode
  size?: 'small' | 'middle'
} & Pick<React.ComponentProps<'button'>, 'disabled' | 'type' | 'name' | 'onClick'>

export const WhiteSquareButton = ({ disabled = false, type = 'button', size = 'middle', name, onClick, children }: Props) => {
  const sizeClass = size === 'middle' ? 'w-[196px]' : 'w-[112px]'

  return (
    <button
      disabled={disabled}
      type={type}
      name={name}
      onClick={onClick}
      className={`h-[40px] rounded border border-blue-500 bg-white text-blue-500 hover:bg-blue-100 disabled:hover:bg-white ${sizeClass}`}
    >
      {children}
    </button>
  )
}
