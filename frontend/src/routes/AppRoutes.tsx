import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '../pages/AppLayout'
import HomePage from '../pages/HomePage'
import Customers from '../pages/Customers'
import NewSalePage from '../pages/NewSale'
import SaleHistoryPage from '../pages/SaleHistoryPage'
import NewPurchasePage from '../pages/NewPurchase'
import PurchaseHistory from '../pages/PurchaseHistory'
import SupplierPage from '../pages/Suppliers'
import ProductsPage from '../pages/Products'
import StockManagementPage from '../pages/StockManagementPage'
import EmployeePage from '../pages/EmployeePage'
import SaleReportPage from '../pages/SaleReportPage'
import InventoryReportPage from '../pages/InventoryReportPage'
import FinancialReportPage from '../pages/FinancialReportPage'
import SettingPage from '../pages/SettingPage'
import { route_names } from './constants'
import ProductCategoryPage from '../pages/ProductCategory'
import PurchaseRoutePage from './PurchaseRoutes'
import SaleRoutePage from './SaleRoutes'
import ProductRoutePage from './ProductRoutes'
import ReportRoutePage from './ReportRoutes'

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to={route_names.home} />} />
          <Route path={route_names.home} element={<HomePage />} />
          <Route path={route_names.purchase} element={<PurchaseRoutePage />}>
            <Route
              index
              element={<Navigate replace to={route_names.newPurchase} />}
            />
            <Route
              path={route_names.newPurchase}
              element={<NewPurchasePage />}
            />
            <Route
              path={route_names.purchaseHistory}
              element={<PurchaseHistory />}
            />
            <Route path={route_names.suppliers} element={<SupplierPage />} />
          </Route>
          <Route path={route_names.sale} element={<SaleRoutePage />}>
            <Route
              index
              element={<Navigate replace to={route_names.newSale} />}
            />
            <Route path={route_names.newSale} element={<NewSalePage />} />
            <Route
              path={route_names.saleHistory}
              element={<SaleHistoryPage />}
            />
            <Route path={route_names.customers} element={<Customers />} />
          </Route>

          <Route path={route_names.products} element={<ProductRoutePage />}>
            <Route
              index
              element={<Navigate replace to={route_names.products} />}
            />
            <Route path={route_names.products} element={<ProductsPage />} />
            <Route
              path={route_names.categories}
              element={<ProductCategoryPage />}
            />
          </Route>

          <Route
            path={route_names.reports}
            element={<ReportRoutePage />}
          ></Route>

          <Route
            path={route_names.stockManagement}
            element={<StockManagementPage />}
          />
          <Route path={route_names.employees} element={<EmployeePage />} />
          <Route path={route_names.saleReport} element={<SaleReportPage />} />
          <Route
            path={route_names.inventoryReport}
            element={<InventoryReportPage />}
          />
          <Route
            path={route_names.finanacialReport}
            element={<FinancialReportPage />}
          />
          <Route path={route_names.setting} element={<SettingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default PageRoutes
