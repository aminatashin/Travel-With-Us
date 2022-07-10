import { BrowserRouter, Routes, Route } from "react-router-dom";
import All from "./components/All";
import SignUp from "./components/Signup/SignUp";
import LogIn from "./components/login/LogIn";
import Favourite from "./components/favourite/Favourite";
function App() {
  // ======================================
  // const [current]
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/" element={<LogIn />} />
        <Route path="/Travel-with-us" element={<All />} />
        <Route path="/favourite" element={<Favourite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
