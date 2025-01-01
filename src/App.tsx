import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((e) => (
          <Route key={e.name} path={e.path} element={e.element} />
        ))}
        <Route path="*" element={<Navigate to={"/show-parks"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
