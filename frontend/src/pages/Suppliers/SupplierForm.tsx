import { useForm } from 'react-hook-form'
import { Supplier } from '../../database/types'
import {
  useCreateSupplier,
  useUpdateSupplier,
} from '../../queries/supplierQueries'
import { useEffect } from 'react'
import SupplierFormTemplate from '../../components/SupplierFormTemplate'

const SupplierForm = ({
  setModalOpen,
  supplier,
  additionalFuncAfterCreate,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  supplier?: Supplier
  additionalFuncAfterCreate?: (supplier: Supplier) => void
}) => {
  const { mutate: createSupplier } = useCreateSupplier()
  const { mutate: updateSupplier } = useUpdateSupplier()

  const defaultEmptyFormValue = {
    name: '',
    company_name: '',
    phone_number: '',
  }

  const isUpdating = supplier === undefined ? false : true

  const { register, handleSubmit, formState, reset } = useForm<Supplier>({})

  const { errors, isDirty } = formState

  useEffect(() => {
    if (supplier) {
      reset({
        name: supplier.name || '',
        company_name: supplier.company_name || '',
        phone_number: supplier.phone_number || '',
      })
    } else {
      reset(defaultEmptyFormValue)
    }
  }, [supplier, reset])

  const onSubmit = (data: Supplier) => {
    if (!isDirty) {
      return
    }
    if (isUpdating) {
      const updatedData = { ...data, id: supplier!.id }
      updateSupplier(updatedData, {
        onSuccess: () => {
          reset()
          if (setModalOpen) {
            setModalOpen(false)
          }
        },
      })
    } else {
      createSupplier(data, {
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
      <SupplierFormTemplate
        submitHandler={handleSubmit(onSubmit)}
        cancelHandler={() => {
          setModalOpen(false)
          reset(defaultEmptyFormValue)
        }}
        errors={errors}
        isUpdating={isUpdating}
        register={register}
      />
    </div>
  )
}

export default SupplierForm

// <form
//         className="flex flex-col max-w-xs gap-4"
//         onSubmit={handleSubmit(onSubmit)}
//         noValidate
//       >
//         <TextInputElement
//           label="Name of Supplier *"
//           fieldName="name"
//           placeholder=""
//           errorMessage={errors.name?.message || ''}
//           register={register}
//           validation={{
//             required: {
//               value: true,
//               message: 'Name is required',
//             },
//           }}
//         />
//         <TextInputElement
//           label="Company Name *"
//           fieldName="company_name"
//           errorMessage={errors.company_name?.message || ''}
//           register={register}
//           validation={{
//             required: {
//               value: true,
//               message: 'Company Name is required',
//             },
//           }}
//         />
//         <TextInputElement
//           label="Phone Number"
//           fieldName="phone_number"
//           errorMessage={errors.phone_number?.message || ''}
//           register={register}
//         />

//         <div className="flex my-4 gap-4">
//           <button type="submit" className="flex-1 btn btn-primary">
//             {isUpdating ? 'Update' : 'Add'}
//           </button>
//           <div
//             className="flex-1 btn btn-outline"
//             onClick={() => {
//               if (setModalOpen) {
//                 setModalOpen(false)
//               }
//               reset(defaultEmptyFormValue)
//             }}
//           >
//             Cancel
//           </div>
//         </div>
//       </form>
