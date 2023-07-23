import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DailyVolumeLanking from "./pages/DailyVolume";
import TotalTransferLanking from "./pages/TotalTransfer";
import NounsLanking from "./pages/Nouns";
import CNPLanking from "./pages/CNP";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/DailyVolume`} element={<DailyVolumeLanking />} />
        <Route path={`/TotalTransfer`} element={<TotalTransferLanking />} />
        <Route path={`/Nouns`} element={<NounsLanking />} />
        <Route path={`/CNP`} element={<CNPLanking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
