export const LoadingSpin = () => {
  return (
    <div className="flex h-full w-full justify-center" aria-label="読み込み中">
      <span className="h-full w-full animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
    </div>
  )
}
