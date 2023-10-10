import { Link } from 'react-router-dom'
import { route_names } from '../routes/constants'

import { FaHome, FaCubes, FaMoneyBill, FaShoppingCart } from 'react-icons/fa'
import { useState } from 'react'

const Sidebar = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const iconSize = 20
  const [currentPage, setCurrentPage] = useState<string>('home')

  return (
    <aside
      className={`mt-14 h-[calc(100vh-56px)] absolute z-10 w-[300px] border-r-2 overflow-scroll bg-base-100 transition-transform duration-300 ${
        showSidebar ? 'translate-x-0' : '-translate-x-[300px]'
      }`}
    >
      <ul className="flex flex-col mt-4">
        <SidebarItem
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setShowSidebar={setShowSidebar}
          icon={<FaHome size={iconSize} />}
          name="Home"
          link={route_names.home}
        />
        <SidebarItem
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setShowSidebar={setShowSidebar}
          icon={<FaMoneyBill size={iconSize} />}
          name="Purchase"
          link={route_names.purchase}
        />
        <SidebarItem
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setShowSidebar={setShowSidebar}
          icon={<FaShoppingCart size={iconSize} />}
          name="Sale"
          link={route_names.sale}
        />

        <SidebarItem
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setShowSidebar={setShowSidebar}
          icon={<FaCubes size={iconSize} />}
          name="Products"
          link={route_names.products}
        />

        {/* <SidebarItem
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          icon={<FaClipboardList size={iconSize} />}
          name="Reports"
          link={route_names.reports}
        />

        <SidebarItem
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          icon={<FaBoxes size={iconSize} />}
          name="Stock Management"
          link={route_names.stockManagement}
        />

        <SidebarSubtitle text="People" />
        <SidebarItem
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          icon={<FaUserTie size={iconSize} />}
          name="Employees"
          link={route_names.employees}
        />
        <SidebarSubtitle text="Reports" />

        <SidebarItem
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          icon={<FaFileInvoice size={iconSize} />}
          name="Inventory Reports"
          link={route_names.inventoryReport}
        />
        <SidebarItem
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          icon={<FaMoneyBill size={iconSize} />}
          name="Financial Reports"
          link={route_names.finanacialReport}
        />

        <SidebarSubtitle text="Settings" />
        <SidebarItem
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          icon={<FaCog size={iconSize} />}
          name="Settings"
          link={route_names.setting}
        /> */}
      </ul>
    </aside>
  )
}

interface Props {
  icon: JSX.Element
  name: string
  link: string
  currentPage: string
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarItem = ({
  icon,
  name,
  link,
  currentPage,
  setCurrentPage,
  setShowSidebar,
}: Props) => {
  return (
    <Link to={link}>
      <li
        onClick={() => {
          setCurrentPage(link)
          setShowSidebar(false)
        }}
        className={`px-4 py-4 hover:bg-primary hover:text-primary-content ${
          currentPage === link &&
          'text-primary-content  bg-primary-focus font-bold'
        }`}
      >
        <div className="flex gap-x-4 items-center">
          {icon}
          <span className={`text-md tracking-wider`}>{name}</span>
        </div>
      </li>
    </Link>
  )
}

export default Sidebar
