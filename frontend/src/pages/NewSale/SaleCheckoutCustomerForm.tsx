import { useState } from 'react'
import { toast } from 'react-toastify'
import { FiSave } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { useSaleItemsContext } from '../../contexts/saleItemsContext'

type FormField = {
  amountPaid: number
  additionalComment: string
}

const SaleCheckOutCustomerForm = ({
  setModalOpen,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { getTotalPrice, setItemsToSale, customer, setCustomer } =
    useSaleItemsContext()
  const { register, handleSubmit, formState, setError, reset } =
    useForm<FormField>()
  const { errors } = formState
  const [isPaid, setIsPaid] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const submitHandler = async (data: FormField) => {
    setIsLoading(true)
    const totalPrice = getTotalPrice()
    console.log(totalPrice)
    let totalPaid
    if (isPaid) {
      totalPaid = getTotalPrice()
    } else {
      if (data.amountPaid > getTotalPrice()) {
        setError('amountPaid', {
          type: 'custom',
          message: 'Paid amount is greater than need to paid',
        })
        setIsLoading(false)
        return
      }
      totalPaid = data.amountPaid
      console.log(totalPaid)
    }
    try {
      // const res = await purchaseItemsAPI(
      //   totalPrice,
      //   'purchase',
      //   customer?.id ?? 1,
      //   totalPaid,
      //   itemsToSale
      // )
      // console.log(res)
      setItemsToSale([])
      setCustomer(undefined)
      setModalOpen(false)
      toast.success('Successfully Added!')
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        toast.error(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-80 p-4 min-h-[400px] flex flex-col">
      <h2 className="text-lg font-bold">Customer</h2>
      <div className="ml-4 my-2">
        <p>{customer?.name ?? ''}</p>
        <p>{customer?.phone_number ?? ''} </p>
      </div>
      <div className="form-control py-4">
        <label className="label cursor-pointer">
          <span className="label-text">Paid</span>
          <input
            type="checkbox"
            checked={isPaid}
            onChange={(e) => {
              if (customer !== undefined) {
                setIsPaid(e.target.checked)
                reset()
              } else {
                toast.error('Supplier Name should be provided!')
              }
            }}
            className="checkbox checkbox-primary"
          />
        </label>
      </div>
      {!isPaid && (
        <form noValidate>
          <div className=" mb-8 ">
            <div className="flex gap-x-4 relative">
              <span className="w-20">Amount Paid</span>
              <input
                type="number"
                placeholder="Amount Paid"
                className="input input-bordered w-full"
                {...register('amountPaid', {
                  required: {
                    value: true,
                    message: 'Amount Paid is required!',
                  },
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: 'Must be positive number',
                  },
                })}
              />
              {errors.amountPaid?.message && (
                <p className="text-error text-xs font-bold absolute top-14 left-20 ">
                  {errors.amountPaid?.message}
                </p>
              )}
            </div>
          </div>
          <textarea
            {...register('additionalComment')}
            placeholder="Additional Comment"
            className="textarea textarea-bordered w-full max-w-xs mb-4"
          />
        </form>
      )}
      <div className="flex  gap-4">
        <button
          className="btn btn-primary flex-1"
          disabled={isLoading}
          onClick={handleSubmit(submitHandler)}
        >
          <FiSave /> Save
        </button>
        <button className="btn flex-1" onClick={() => setModalOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default SaleCheckOutCustomerForm
