import { BrowserRouter, Routes, Route } from "react-router-dom";
import All from "./components/All";
import SignUp from "./components/Signup/SignUp";
function App() {
  // ======================================

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<All />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
