import { Route, Routes } from "react-router-dom";
import { Main, Channel, VideoDetail, Search, Navbar } from "..";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/channel/:id" element={<Channel />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/search/:id" element={<Search />} />
      </Routes>
    </>
  );
};

export default App;
