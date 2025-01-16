import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import routes from "./routes";
import { useEffect } from "react";
import { api } from "./utils";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          {routes.map((e) => (
            <Route key={e.name} path={e.path} element={e.element} />
          ))}
          <Route path="*" element={<Navigate to={"/admin-parks"} />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
