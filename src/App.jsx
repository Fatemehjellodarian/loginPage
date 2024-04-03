import { Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import SignIn from "./components/login/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
}
export default App;
