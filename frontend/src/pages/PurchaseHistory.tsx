import { Row, createColumnHelper } from '@tanstack/react-table'
import AppTable from '../components/AppTable'
import { ProductsPurchases } from '../database/types'
import { useGetProductsPurchases } from '../queries/purchasedQueries'
import AppModal from '../components/AppModal'
import { useEffect, useState } from 'react'
import { getPurchaseDetail } from '../database/purchaseHistoryAPI'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const columnHelper = createColumnHelper<ProductsPurchases>()

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: () => <span>Supplier</span>,
  }),
  columnHelper.accessor('company_name', {
    cell: (info) => info.getValue(),
    header: () => <span>Company Name</span>,
  }),
  columnHelper.accessor('phone_number', {
    cell: (info) => info.getValue(),
    header: () => <span>Phone Number</span>,
  }),
  columnHelper.accessor('total', {
    cell: (info) => info.getValue(),
    header: () => <span>Total</span>,
  }),
  columnHelper.accessor('total_paid', {
    cell: (info) => info.getValue(),
    header: () => <span>Total Paid</span>,
  }),
  columnHelper.accessor('is_paid', {
    cell: (info) => {
      const value = info.getValue()
      if (value === 'debt') {
        return <span className="text-danger font-bold">{value}</span>
      }
      return <span className="">{value}</span>
    },
    header: () => <span>Paid</span>,
  }),
  columnHelper.accessor('created', {
    cell: (info) => {
      const inputDate = new Date(info.getValue())
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      } as const
      return new Intl.DateTimeFormat('en-US', options).format(inputDate)
    },
    header: () => <span>Date</span>,
  }),
]

const PurchaseHistory = () => {
  const dataQuery = useGetProductsPurchases()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [purchaseData, setPurchaseData] = useState<ProductsPurchases>()

  if (dataQuery.isLoading)
    return <span className="loading loading-dots loading-lg"></span>
  if (dataQuery.isError) return <p>Error...</p>
  if (dataQuery.isSuccess) {
    console.log(dataQuery.data)
    return (
      <>
        <AppTable
          columnAccesors={columns}
          dataToRender={dataQuery.data}
          rowClickHandler={(row: Row<ProductsPurchases>) => {
            console.log(row.original)
            setPurchaseData(row.original)
            setModalOpen(true)
          }}
        />
        <AppModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <PurchaseDetail
            setModalOpen={setModalOpen}
            purchaseData={purchaseData}
          />
        </AppModal>
      </>
    )
  }
}

export default PurchaseHistory

const PurchaseDetail = ({
  purchaseData,
  setModalOpen,
}: {
  purchaseData?: ProductsPurchases
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [showData, setShowData] = useState([])
  console.log(showData, purchaseData)
  useEffect(() => {
    if (purchaseData) {
      getPurchaseDetail(purchaseData.id).then((items) => setShowData(items))
    }
  }, [purchaseData])
  if (purchaseData) {
    return (
      <div className="w-96 relative">
        <div
          className="absolute right-2 cursor-pointer"
          onClick={() => setModalOpen(false)}
        >
          <AiOutlineCloseCircle size={25} />
        </div>
        <h2 className="text-lg font-bold mb-2">Supplier</h2>
        <div className="px-4 py-2 bg-info text-info-content mb-4">
          <p>{purchaseData.name}</p>
          <p>{purchaseData.company_name}</p>
          <p>{purchaseData.phone_number}</p>
        </div>

        <ul>
          {showData &&
            showData.map((item, idx) => (
              // @ts-ignore
              <li className="flex mb-2" key={item.name}>
                <div className="w-6">
                  <span>{idx + 1}.</span>
                </div>
                <div>
                  {/*  @ts-ignore */}
                  <p>{item.name}</p>
                  {/*  @ts-ignore */}
                  <span>{item.buy_price} kyats x </span>
                  {/*  @ts-ignore */}
                  <span>{item.quantity} / </span>
                  {/*  @ts-ignore */}
                  <span>{item.unit}</span>
                </div>
              </li>
            ))}
        </ul>
        {showData && (
          <div>
            <div className="border-[1px] mb-2"></div>
            <p>Total : {purchaseData.total}</p>
            <p>Total Paid : {purchaseData.total_paid}</p>
          </div>
        )}
      </div>
    )
  } else {
    return <></>
  }
}
