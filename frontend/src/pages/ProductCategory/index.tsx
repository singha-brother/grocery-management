import { useState } from 'react'
import CategoryInput from './CategoryInput'
import CategoryList from './CategoryList'
import { Category } from '../../database/types'

const ProductCategoryPage = () => {
  const [category, setCategory] = useState<Category>({
    name: '',
    is_active: true,
  })
  const [formUpdate, setFormUpdate] = useState(false)

  return (
    <div className="p-8 md:flex md:flex-row gap-12">
      <CategoryInput
        category={category}
        setCategory={setCategory}
        formUpdate={formUpdate}
        setFormUpdate={setFormUpdate}
      />
      <CategoryList setCategory={setCategory} setFormUpdate={setFormUpdate} />
    </div>
  )
}

export default ProductCategoryPage
