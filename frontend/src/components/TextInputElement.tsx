import { RegisterOptions, UseFormRegister } from 'react-hook-form'

type TextInputProps = {
  label?: string
  placeholder?: string
  fieldName: string
  register: UseFormRegister<any>
  validation?: RegisterOptions
  errorMessage?: string
  type?: React.HTMLInputTypeAttribute
}

const TextInputElement = ({
  label,
  placeholder,
  fieldName,
  register,
  errorMessage,
  validation,
  type = 'text',
}: TextInputProps) => {
  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        className="border-2 p-3 rounded-lg mb-1"
        placeholder={placeholder}
        type={type}
        {...register(fieldName, validation)}
      />
      {errorMessage && (
        <p className="text-error text-xs font-bold">{errorMessage}</p>
      )}
    </div>
  )
}

export default TextInputElement
