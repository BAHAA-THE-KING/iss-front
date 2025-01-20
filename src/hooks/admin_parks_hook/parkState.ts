import { Park } from "src/models/parks";

export interface ParkDialogState {
  filteredData: Park[];
  parkName: string;
  setParkName: React.Dispatch<React.SetStateAction<string>>;

  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  parkDescription: string;
  setParkDescription: React.Dispatch<React.SetStateAction<string>>;

  parkRentPrice: string;
  setParkRentPrice: React.Dispatch<React.SetStateAction<string>>;

  isCreate: boolean;
  open: boolean;
  selectedFilter: string;
  loading: boolean;

  fetchParks: () => Promise<void>;
  handleCreate: () => void;
  filterList: (filter:string) => Promise<void>;
  handleOpen: () => void;
  handleClose: () => void;
  setSelectedFilter: (filter:string) => void;
  handleConfirm: () => void;
  handleEdit: (item: Park) => Promise<void>;
  handleDelete: (park: Park) => Promise<void>;
}
