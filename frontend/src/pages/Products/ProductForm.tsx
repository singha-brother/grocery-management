import { useForm } from 'react-hook-form'
import { Product } from '../../database/types'
import { useGetActiveCategories } from '../../queries/categoryQueries'
import { DevTool } from '@hookform/devtools'
import {
  useCreateProduct,
  useUpdateProduct,
} from '../../queries/productQueries'
import { useEffect } from 'react'
import TextInputElement from '../../components/TextInputElement'

const ProductForm = ({
  setModalOpen,
  product,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  product?: Product
}) => {
  const { mutate: createProduct } = useCreateProduct()
  const { mutate: updateProduct } = useUpdateProduct()
  const categories = useGetActiveCategories()
  const isUpdating = product === undefined ? false : true
  const defaultEmptyFormValue = {
    name: '',
    unit: '',
    // category_id: '',
    description: '',
    sale_price: '',
    buy_price: '',
  }

  const { register, handleSubmit, formState, control, reset } =
    useForm<Product>({})

  const { errors, isDirty } = formState

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || '',
        unit: product.unit || '',
        category_id: product.category_id,
        description: product.description || '',
        sale_price: product.sale_price || '',
        buy_price: product.buy_price || '',
      })
    } else {
      reset(defaultEmptyFormValue)
    }
  }, [product, reset])

  const onSubmit = (data: Product) => {
    if (!isDirty) {
      return
    }
    if (isUpdating) {
      const updatedData = { ...data, id: product?.id }
      updateProduct(updatedData, {
        onSuccess: () => {
          reset()
          setModalOpen(false)
        },
      })
    } else {
      createProduct(data, {
        onSuccess: () => reset(),
      })
    }
  }

  return (
    // card bg-base-100 shadow-lg p-4 px-8 w-96
    <div className="p-4 px-8 w-96">
      <form
        className="flex flex-col max-w-xs gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextInputElement
          fieldName="name"
          label="Name of Product *"
          register={register}
          errorMessage={errors.name?.message || ''}
          validation={{
            required: {
              value: true,
              message: 'Name is required',
            },
          }}
          placeholder="Royal-D"
        />

        <TextInputElement
          errorMessage={errors.unit?.message || ''}
          fieldName="unit"
          register={register}
          validation={{
            required: {
              value: true,
              message: 'Unit is required',
            },
          }}
          label="Unit of Measure *"
          placeholder="bot"
        />
        {/* BUY PRICE */}
        <TextInputElement
          errorMessage={errors.buy_price?.message || ''}
          fieldName="buy_price"
          label="Buy Price for 1 unit *"
          register={register}
          validation={{
            required: {
              value: true,
              message: 'Buy price is required',
            },
            valueAsNumber: true,
            min: {
              value: 0,
              message: 'Must be positive number',
            },
          }}
          placeholder="10000"
        />
        {/* SALE PRICE */}
        <TextInputElement
          errorMessage={errors.sale_price?.message || ''}
          fieldName="sale_price"
          label="Sale Price (Approximate) for 1 unit *"
          register={register}
          validation={{
            required: {
              value: true,
              message: 'Approximate Sale price is required',
            },
            valueAsNumber: true,
            min: {
              value: 0,
              message: 'Must be positive number',
            },
          }}
          placeholder="10000"
        />

        <div className="form-control">
          <select
            className="select select-bordered"
            {...register('category_id', {
              required: {
                value: true,
                message: 'Select one of the category',
              },
            })}
          >
            <option disabled value="">
              Select Category
            </option>
            {categories.data &&
              categories.data.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
          {errors.category_id && (
            <p className="text-error text-xs font-bold">
              {errors.category_id.message}
            </p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Anything About the product</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Anything about product"
            {...register('description')}
          />
        </div>
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
        <DevTool control={control} />
      </form>
    </div>
  )
}

export default ProductForm
