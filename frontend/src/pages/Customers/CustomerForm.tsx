import { useForm } from 'react-hook-form'
import { Customer } from '../../database/types'
import {
  useCreateCustomer,
  useUpdateCustomer,
} from '../../queries/customerQueries'
import { useEffect } from 'react'
import TextInputElement from '../../components/TextInputElement'

const CustomerForm = ({
  setModalOpen,
  customer,
  additionalFuncAfterCreate,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  customer?: Customer
  additionalFuncAfterCreate?: (customer: Customer) => void
}) => {
  const { mutate: createCustomer } = useCreateCustomer()
  const { mutate: updateCustomer } = useUpdateCustomer()

  const defaultEmptyFormValue = {
    name: '',
    phone_number: '',
  }

  const isUpdating = customer === undefined ? false : true

  const { register, handleSubmit, formState, reset } = useForm<Customer>({})

  const { errors, isDirty } = formState

  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name || '',
        phone_number: customer.phone_number || '',
      })
    } else {
      reset(defaultEmptyFormValue)
    }
  }, [customer, reset])

  const onSubmit = (data: Customer) => {
    if (!isDirty) {
      return
    }
    if (isUpdating) {
      const updatedData = { ...data, id: customer!.id }
      updateCustomer(updatedData, {
        onSuccess: () => {
          reset()
          if (setModalOpen) {
            setModalOpen(false)
          }
        },
      })
    } else {
      createCustomer(data, {
        onSuccess: (returnData) => {
          reset()
          if (additionalFuncAfterCreate !== undefined) {
            additionalFuncAfterCreate(returnData)
          }
        },
      })
    }
  }
  return (
    // p-4 px-8 w-96
    <div className="p-4 px-8 w-96">
      <form
        className="flex flex-col max-w-sm gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextInputElement
          label="Name of Customer *"
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
          label="Phone Number"
          fieldName="phone_number"
          errorMessage={errors.phone_number?.message || ''}
          register={register}
        />

        <div className="flex my-4 gap-4">
          <button type="submit" className="flex-1 btn btn-primary">
            {isUpdating ? 'Update' : 'Add'}
          </button>
          <div
            className="flex-1 btn btn-outline"
            onClick={() => {
              setModalOpen(false)
              reset(defaultEmptyFormValue)
            }}
          >
            Cancel
          </div>
        </div>
      </form>
    </div>
  )
}

export default CustomerForm
