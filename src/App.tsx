import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ResultPage from "./pages/result";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
