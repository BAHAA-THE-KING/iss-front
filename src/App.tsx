import { BrowserRouter, Route, Routes } from "react-router";
import routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((e) => (
          <Route {...e} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
