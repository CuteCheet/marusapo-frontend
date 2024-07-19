import type { NewOrderType } from '@/features/orderForm'
import type { FieldArrayWithId, UseFieldArrayRemove, UseFormRegisterReturn } from 'react-hook-form'

export type FileUploadFieldProps = {
  register: UseFormRegisterReturn
  currentInputFields: FieldArrayWithId<NewOrderType, 'files', 'id'>[]
  uploadedFileNames?: string[]
  removeInputFile: UseFieldArrayRemove
  removeS3File: (fileName: string) => void
}

export const FileUploadField = ({
  register,
  currentInputFields,
  removeInputFile,
  uploadedFileNames,
  removeS3File
}: FileUploadFieldProps) => {
  return (
    <div className={`flex w-full flex-row ${currentInputFields.length < 4 ? 'items-center' : 'items-baseline'}`}>
      <p className="w-1/5">
        原稿・素材
        <br />
        アップロード
      </p>
      <div className="flex w-4/5 flex-wrap gap-4">
        {uploadedFileNames?.map((fileName, index) => {
          return (
            <div key={index} title={fileName} className="relative w-1/5 rounded border-2 bg-gray-50 p-2 text-center text-xs">
              <button
                type="button"
                className="i-ion-md-close-circle absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 bg-gray-400 text-xl hover:bg-gray-600"
                onClick={() => removeS3File(fileName)}
              />
              <p className="truncate">{fileName}</p>
            </div>
          )
        })}

        {currentInputFields.map((field, index) => {
          return (
            <div
              key={index}
              title={field.file.name}
              className="relative w-1/5 rounded border-2 bg-gray-50 p-2 text-center text-xs"
            >
              <button
                type="button"
                className="i-ion-md-close-circle absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 bg-gray-400 text-xl hover:bg-gray-600"
                onClick={() => removeInputFile(index)}
              />
              <p className="truncate">{field.file.name}</p>
            </div>
          )
        })}

        <label className="flex w-1/5 justify-center rounded border-2 bg-gray-50 hover:cursor-pointer" htmlFor="file1">
          <span className="i-ion-add-circle bg-gray-400 text-3xl hover:bg-gray-600"></span>
          <input
            className="hidden"
            type="file"
            id="file1"
            {...register}
            onClick={(e) => {
              // MEMO: inputのfileで2回同じものを続けて選択するとonChangeが発火しない仕様を回避
              const target = e.target as HTMLInputElement
              target.value = ''
            }}
          />
        </label>
      </div>
    </div>
  )
}
