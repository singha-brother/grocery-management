import { Outlet } from 'react-router-dom'
import Main from '../components/Main'
import AppNavLink from '../components/AppNavLink'

const ProductRoutePage = () => {
  return (
    <Main title="Products" navLinks={<SubPagesLink />}>
      <div className=" flex-1 mt-4">
        <Outlet />
      </div>
    </Main>
  )
}

const SubPagesLink = () => {
  return (
    <ul className="flex bg-warning py-2 rounded-full ">
      <li>
        <AppNavLink link="/products/products" text="Products" />
      </li>
      <li>
        <AppNavLink link="/products/categories" text="Categories" />
      </li>
    </ul>
  )
}

export default ProductRoutePage
