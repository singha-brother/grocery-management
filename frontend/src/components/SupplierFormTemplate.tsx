import { UseFormRegister, FieldErrors } from 'react-hook-form'
import TextInputElement from './TextInputElement'
import { Supplier } from '../database/types'
import { ReactNode } from 'react'

const SupplierFormTemplate = ({
  submitHandler,
  cancelHandler,
  isUpdating,
  register,
  errors,
  newFormField,
}: {
  submitHandler: React.FormEventHandler
  cancelHandler: React.MouseEventHandler
  isUpdating: boolean
  register: UseFormRegister<Supplier>
  errors: FieldErrors<Supplier>
  newFormField?: ReactNode
}) => {
  return (
    <form
      className="flex flex-col max-w-sm gap-4"
      onSubmit={submitHandler}
      noValidate
    >
      <TextInputElement
        label="Name of Supplier *"
        fieldName="name"
        placeholder=""
        errorMessage={errors.name?.message || ''}
        register={register}
        validation={{
          required: {
            value: true,
            message: 'Name is required',
          },
        }}
      />
      <TextInputElement
        label="Company Name *"
        fieldName="company_name"
        errorMessage={errors.company_name?.message || ''}
        register={register}
        validation={{
          required: {
            value: true,
            message: 'Company Name is required',
          },
        }}
      />
      <TextInputElement
        label="Phone Number"
        fieldName="phone_number"
        errorMessage={errors.phone_number?.message || ''}
        register={register}
      />
      {newFormField !== undefined && newFormField}

      <div className="flex my-4 gap-4">
        <button type="submit" className="flex-1 btn btn-primary">
          {isUpdating ? 'Update' : 'Add'}
        </button>
        <div className="flex-1 btn btn-outline" onClick={cancelHandler}>
          Cancel
        </div>
      </div>
    </form>
  )
}

export default SupplierFormTemplate
