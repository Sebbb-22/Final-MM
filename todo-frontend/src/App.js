import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar.js";
import Home from "./pages/Home";
import ViewTask from "./pages/ViewTask.js";
import EditTask from "./pages/EditTask";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:id" element={<ViewTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
