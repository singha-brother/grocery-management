import AppTable from '../../components/AppTable'
import { Product, ProductToShow } from '../../database/types'

import { useGetProducts } from '../../queries/productQueries'
import { createColumnHelper, Row } from '@tanstack/react-table'

const columnHelper = createColumnHelper<ProductToShow>()

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: () => <span>Product Name</span>,
  }),
  columnHelper.accessor('category_name', {
    cell: (info) => info.getValue(),
    header: () => <span>Category</span>,
  }),
  columnHelper.accessor('unit', {
    cell: (info) => info.getValue(),
    header: () => <span>Unit</span>,
  }),
  columnHelper.accessor('buy_price', {
    cell: (info) => <strong>{info.getValue()}</strong>,
    header: () => <span>Buy Price</span>,
  }),
  columnHelper.accessor('sale_price', {
    cell: (info) => <strong>{info.getValue()}</strong>,
    header: () => <span>Sale Price</span>,
  }),
  columnHelper.accessor('in_stock', {
    cell: (info) => info.getValue(),
    header: () => <span>In Stock</span>,
  }),
  columnHelper.accessor('sold', {
    cell: (info) => info.getValue(),
    header: () => <span>Sold</span>,
  }),
  columnHelper.accessor('loss', {
    cell: (info) => info.getValue(),
    header: () => <span>Loss</span>,
  }),
  columnHelper.accessor('description', {
    cell: (info) => (info.getValue() === '' ? '-' : info.getValue()),
    header: () => <span>Description</span>,
  }),
]

const ProductTable = ({
  setModalOpen,
  setFormProduct,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setFormProduct: React.Dispatch<React.SetStateAction<Product | undefined>>
}) => {
  const dataQuery = useGetProducts()

  if (dataQuery.isLoading) return <p>Loading...</p>
  if (dataQuery.isError) return <p>Error...</p>
  if (dataQuery.isSuccess) {
    return (
      <AppTable
        columnAccesors={columns}
        dataToRender={dataQuery.data}
        rowClickHandler={(row: Row<ProductToShow>) => {
          const originalData = row.original
          const productToUpdate: Product = {
            id: originalData.id,
            name: originalData.name,
            category_id: originalData.category_id,
            buy_price: originalData.buy_price,
            sale_price: originalData.sale_price,
            unit: originalData.unit,
            description: originalData.description,
          }
          setFormProduct(productToUpdate)
          setModalOpen(true)

          console.log(row.original)
        }}
      />
    )
  }
}

export default ProductTable
