import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Scheduler from "./Pages/Scheduler";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/scheduler" element={<Scheduler />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
