import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OpenMics from "./pages/OpenMics";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mics" element={<OpenMics />} />
      </Routes>
    </Router>
  );
}

export default App;
