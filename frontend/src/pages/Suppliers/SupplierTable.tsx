import { Row, createColumnHelper } from "@tanstack/react-table";
import { Supplier } from "../../database/types";
import { useGetSuppliers } from "../../queries/supplierQueries";
import AppTable from "../../components/AppTable";

const columnHelper = createColumnHelper<Supplier>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => <span>Product Name</span>,
  }),
  columnHelper.accessor("company_name", {
    cell: (info) => info.getValue(),
    header: () => <span>Company Name</span>,
  }),
  columnHelper.accessor("phone_number", {
    cell: (info) => info.getValue(),
    header: () => <span>Phone Number</span>,
  }),
];

const SupplierTable = ({
  setModalOpen,
  setFormSupplier,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFormSupplier: React.Dispatch<React.SetStateAction<Supplier | undefined>>;
}) => {
  const dataQuery = useGetSuppliers();

  if (dataQuery.isLoading) return <p>Loading...</p>;
  if (dataQuery.isError) return <p>Error...</p>;
  if (dataQuery.isSuccess) {
    return (
      <AppTable
        columnAccesors={columns}
        dataToRender={dataQuery.data}
        rowClickHandler={(row: Row<Supplier>) => {
          const originalData = row.original;
          const supplierToUpdate: Supplier = {
            id: originalData.id,
            name: originalData.name,
            company_name: originalData.company_name,
            phone_number: originalData.phone_number,
          };
          setFormSupplier(supplierToUpdate);
          setModalOpen(true);

          console.log(row.original);
        }}
      />
    );
  }
};

export default SupplierTable;
