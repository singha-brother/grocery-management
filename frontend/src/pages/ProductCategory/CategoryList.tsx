import { Category } from "../../database/types";
import {
  useUpdateActiveCategory,
  useGetCategories,
} from "../../queries/categoryQueries";

type Props = {
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  setFormUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const CategoryList = ({ setCategory, setFormUpdate }: Props) => {
  console.log("PASSED HERE");
  const result = useGetCategories();
  const { mutate: updateActiveCategory } = useUpdateActiveCategory();

  if (result.isLoading) return <p>Loading ...</p>;
  if (result.isError) return <p>{result.error.message}</p>;

  if (result.isSuccess)
    return (
      <div className="flex-1 p-6 bg-base-300 shadow-lg flex flex-wrap gap-x-10">
        {result.data.map((category) => (
          <div
            className="bg-base-100 border-l-4 px-4 
            border-primary flex items-center w-64 mb-4 hover:bg-base-200 shadow-md cursor-pointer"
            key={category.id}
          >
            <p
              onClick={() => {
                setCategory(category);
                setFormUpdate(true);
              }}
              className="flex-1 py-2   label-text text-lg cursor-pointer "
            >
              {category.name}
            </p>
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={category.is_active}
                onChange={() => updateActiveCategory(category)}
              />
            </label>
          </div>
        ))}
      </div>
    );
};

export default CategoryList;
