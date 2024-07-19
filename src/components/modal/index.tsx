import React from 'react'

export type ModalProps = {
  children: React.ReactNode
  handleClose: () => void
}

export const Modal = ({ children, handleClose }: ModalProps) => {
  return (
    <div onClick={handleClose} className="fixed inset-0 grid place-items-center bg-gray-300 bg-opacity-60">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-[570px] bg-white p-9 shadow-lg shadow-gray-500"
        role="dialog"
      >
        <button className="absolute right-0 top-0" onClick={handleClose}>
          <span className="i-ion-close-outline bg-gray-500 text-4xl hover:bg-gray-700" />
        </button>
        {children}
      </div>
    </div>
  )
}
