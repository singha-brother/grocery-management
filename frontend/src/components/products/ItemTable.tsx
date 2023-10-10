import pb from "../../database/pocketbase";
import { useQuery } from "@tanstack/react-query";

const ItemTable = () => {
  const result = useQuery({
    queryKey: ["items"],
    queryFn: () => pb.collection("items").getFullList({ sort: "-created" }),
  });

  if (result.isLoading) return <p>Loading...</p>;

  if (result.isError) return <p>Error...</p>;
  return (
    <div>
      {result.data.map((item) => (
        <p key={item.id}>
          {item.name} {item.stockQuantity} {item.buyPrice}
        </p>
      ))}
    </div>
  );
};

export default ItemTable;
