import { useState } from "react";
import { ParkDialogState} from "./parkState"
import {Park} from "src/models/parks";
import {api} from "src/utils/apiUtil"
import { AxiosResponse } from "axios";


export const useParkDialog = (): ParkDialogState => {
  const [parkName, setParkName] = useState<string>("");
  const [parkDescription, setParkDescription] = useState<string>("");
  const [parkRentPrice, setParkRentPrice] = useState<string>("0");
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Park[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
    
    const fetchParks = async () => {
      try {
        const response = await api.get("/park/all");
        setData(response.data.parks);
      } catch (error) {
        console.error("Error fetching parks:", error);
      } finally {
        setLoading(false);
      }
    };

   const  parkRequest = async (response: AxiosResponse) => {
      setLoading(true);
      try {
        if(response.status === 200 || response.status === 201){
        return true;
        }
        return false;
      } catch (error) {
        console.error("Error fetching parks:", error);
        return false;
      }
    };

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

  const handleConfirm = async() => {
    if (isCreate) {
      const newItem: Park = {
        id: data.length + 1,
        image: "https://via.placeholder.com/50",
        name: parkName,
        description: parkDescription,
        price: Number.parseInt(parkRentPrice) ,
        status: "free",
        rentTime: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setOpen(false);
      if(await parkRequest(await api.post("/park/add" , newItem))){
        setLoading(false);
        setData((prevData) => [...prevData, newItem]);
      }
    } else if (selectedId !== null) {
      if(await parkRequest (await api.put(`/park/edit` , {
        parkId: selectedId,
        name: parkName,
        description: parkDescription,
        price: parkRentPrice
      } ))){
        const updatedData = data.map((item) =>
         item.id === selectedId
           ? {
               ...item,
               name: parkName,
               description: parkDescription,
               price: Number.parseInt(parkRentPrice),
             }
           : item
       );
       setLoading(false);
       setData(updatedData);
      }else{
        setLoading(false);
      }
    }
    handleClose();
  };


  const handleEdit = async (item: Park) => {
    setIsCreate(false);
    setSelectedId(item.id);
    setParkName(item.name);
    setParkDescription(item.description);
    setParkRentPrice(item.price.toString());
    handleOpen();
  };

  const handleCreate = () => {
    handleOpen();
  };

  const handleDelete = async (park: Park) => {
    if(await parkRequest(await api.delete(`/park/delete/${park.id}`))){
      setData((prevData) => prevData.filter((item) => item.id !== park.id));
      setLoading(false);
    }else{
      setLoading(false);
    }
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
    loading,
    fetchParks,
    handleCreate,
    handleOpen,
    handleClose,
    handleConfirm,
    handleEdit,
    handleDelete,
  };
};
