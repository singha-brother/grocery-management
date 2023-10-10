import {
  useAddCategory,
  useUpdateCategory,
} from "../../queries/categoryQueries";
import { Category } from "../../database/types";

type Props = {
  category: Category;
  formUpdate: boolean;
  setFormUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
};

const CategoryInput = ({
  category,
  formUpdate,
  setCategory,
  setFormUpdate,
}: Props) => {
  const { mutate: addCategory } = useAddCategory();
  const { mutate: updateCategory } = useUpdateCategory();

  const resetCategory = () => {
    setCategory({ name: "", is_active: true });
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (category.name === "") return;
    addCategory(category, { onSuccess: () => resetCategory() });
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (category.name === "") return;
    updateCategory(category, {
      onSuccess: () => {
        resetCategory();
        setFormUpdate(false);
      },
    });
  };

  return (
    <div className="card bg-base-100 shadow-lg p-4 px-8 max-h-80 max-w-xs">
      <h2 className="font-lg font-bold mb-6">Category Name</h2>
      <form className="">
        <input
          className="border-2 p-3 rounded-lg mb-4"
          placeholder="eg - coffee / tea"
          type="text"
          value={category.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
        />
        {formUpdate ? (
          <div className="">
            <button
              onClick={(e) => handleUpdate(e)}
              type="submit"
              className="mr-4 py-3 px-6 bg-warning text-warning-content font-bold rounded-lg shadow-md"
            >
              Update
            </button>
            <button
              className="py-3 px-6 bg-info text-info-content font-bold rounded-lg shadow-md"
              onClick={() => {
                setFormUpdate(false);
                resetCategory();
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => handleAdd(e)}
            type="submit"
            className="block py-3 px-6 bg-primary text-primary-content font-bold rounded-lg shadow-md"
          >
            Add
          </button>
        )}
      </form>
    </div>
  );
};

export default CategoryInput;
