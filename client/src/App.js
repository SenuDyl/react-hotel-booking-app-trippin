import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/hotel";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProfileSummary from "./pages/ProfileSummary/ProfileSummary";
import UserBookings from "./pages/UserBookings/UserBookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<ProfileSummary />} />
        <Route path="/profile/userbookings" element={<UserBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
