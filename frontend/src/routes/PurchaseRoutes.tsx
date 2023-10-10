import { Outlet } from 'react-router-dom'
import Main from '../components/Main'
import AppNavLink from '../components/AppNavLink'

const PurchaseRoutePage = () => {
  return (
    <Main title="Purchase" navLinks={<SubPagesLink />}>
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
        <AppNavLink link="/purchase/new-purchase" text="New Purchase" />
      </li>
      <li>
        <AppNavLink link="/purchase/purchase-history" text="Purchase History" />
      </li>
      <li>
        <AppNavLink link="/purchase/suppliers" text="Suppliers" />
      </li>
    </ul>
  )
}

export default PurchaseRoutePage
