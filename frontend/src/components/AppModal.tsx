import { ReactElement } from "react";

const AppModal = ({
  modalOpen,
  children,
}: {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactElement;
}) => {
  return (
    <div
      className={`${
        modalOpen ? "z-10" : "-z-10"
      } fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center`}
    >
      <div className="bg-base-100 p-2 rounded-lg shadow-lg ">{children}</div>
    </div>
  );
};

export default AppModal;
