import { AiOutlinePlusCircle } from "react-icons/ai";
import ItemTable from "../components/products/ItemTable";
import ItemForm from "../components/products/ItemForm";

const ItemRegister = () => {
  return (
    <main className="p-4">
      <AiOutlinePlusCircle size={30} />
      <ItemForm />
      <ItemTable />
    </main>
  );
};

export default ItemRegister;
