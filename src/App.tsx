import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VLALanking from "./pages/VLA";
import VLCNPLanking from "./pages/VLCNP";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/VLA`} element={<VLALanking />} />
        <Route path={`/VLCNP`} element={<VLCNPLanking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
