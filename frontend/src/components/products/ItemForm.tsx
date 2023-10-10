
const ItemForm = () => {
  return (
    <form>
      <ItemInput label="Item Name" />
      <ItemInput label="Description" />
      <ItemInput label="Buy Price" type="number" />
      <ItemInput label="Stock Quantity" type="number" />
    </form>
  );
};

export default ItemForm;


interface Props {
  type?: string
  label?: string
  placeholder?: string

}

const ItemInput = ({ type = "text", label, placeholder = "" }: Props) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered input-primary w-full max-w-xs"
      />
    </div>
  );
};
