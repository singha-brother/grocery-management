import { Outlet } from 'react-router-dom'
import Main from '../components/Main'
import AppNavLink from '../components/AppNavLink'

const SaleRoutePage = () => {
  return (
    <Main title="Sale" navLinks={<SubPagesLink />}>
      <div className=" flex-1 mt-4">
        <Outlet />
      </div>
    </Main>
  )
}

const SubPagesLink = () => {
  return (
    <ul className="flex bg-warning py-2 rounded-full">
      <li>
        <AppNavLink link="/sale/new-sale" text="New Sale" />
      </li>
      <li>
        <AppNavLink link="/sale/sale-history" text="Sale History" />
      </li>
      <li>
        <AppNavLink link="/sale/customers" text="Customers" />
      </li>
    </ul>
  )
}

export default SaleRoutePage
