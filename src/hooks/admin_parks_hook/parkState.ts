import { Park } from "src/models/parks";

export interface ParkDialogState {
  data: Park[];
  setData: React.Dispatch<React.SetStateAction<Park[]>>;

  parkName: string;
  setParkName: React.Dispatch<React.SetStateAction<string>>;

  parkDescription: string;
  setParkDescription: React.Dispatch<React.SetStateAction<string>>;

  parkRentPrice: string;
  setParkRentPrice: React.Dispatch<React.SetStateAction<string>>;

  isCreate: boolean;
  open: boolean;
  loading: boolean;

  // Methods
  fetchParks: () => Promise<void>;
  handleCreate: () => void;
  handleOpen: () => void;
  handleClose: () => void;
  handleConfirm: () => void;

  handleEdit: (item: Park) => void;
  handleDelete: (id: number) => void;
}
