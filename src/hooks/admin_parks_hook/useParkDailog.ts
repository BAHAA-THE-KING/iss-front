import { useState } from "react";

export const useParkDialog = (initialData: any[]) => {
  const [data, setData] = useState(initialData);
  const [parkName, setParkName] = useState<string>("");
  const [parkDescription, setParkDescription] = useState<string>("");
  const [parkRentPrice, setParkRentPrice] = useState<string>("0");
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const resetFields = () => {
    setParkName("");
    setParkDescription("");
    setParkRentPrice("");
    setSelectedId(null);
    setIsCreate(true);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetFields();
  };

  const handleConfirm = () => {
    if (isCreate) {
      const newItem = {
        id: data.length + 1,
        image: "https://via.placeholder.com/50",
        name: parkName,
        description: parkDescription,
        price: parkRentPrice,
      };
      setData((prevData) => [...prevData, newItem]);
    } else if (selectedId !== null) {
      const updatedData = data.map((item) =>
        item.id === selectedId
          ? {
              ...item,
              name: parkName,
              description: parkDescription,
              price: parkRentPrice,
            }
          : item
      );
      setData(updatedData);
    }
    handleClose();
  };

  const handleEdit = (item: any) => {
    setIsCreate(false);
    setSelectedId(item.id);
    setParkName(item.name);
    setParkDescription(item.description);
    setParkRentPrice(item.price);
    handleOpen();
  };

  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return {
    data,
    setData,
    parkName,
    setParkName,
    parkDescription,
    setParkDescription,
    parkRentPrice,
    setParkRentPrice,
    isCreate,
    open,
    handleOpen,
    handleClose,
    handleConfirm,
    handleEdit,
    handleDelete,
  };
};
