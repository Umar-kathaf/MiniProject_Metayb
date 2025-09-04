import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Appbar from "./Components/Appbar";
import LoginPage from "./Components/Auth/LoginPage";
import SignUpForm from "./Components/Auth/SignUpForm";
import Effects from "./Components/Hooks/Effects";
import MemoHook from "./Components/Hooks/MemoHook";
import Ref from "./Components/Hooks/Ref";
import CartPage from "./Components/MUIConcepts/CartPage";
import CounterApp from "./Components/MUIConcepts/CounterApp";
import EmpDatas from "./Components/MUIConcepts/EmpDatas";
import Faq_Accordion from "./Components/MUIConcepts/Faq_Accordion";
import GreetingProps from "./Components/MUIConcepts/GreetingProps";
import ResponsiveGrid from "./Components/MUIConcepts/ResponsiveGrid";
import To_Do_App from "./Components/MUIConcepts/To_Do_App";
import SideBar from "./Components/SideBar";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import ProfilePage from "./Components/MUIConcepts/Profile";
// import newName from './Components/ES6'

function App() {
  const ProtectedLayout = () => {
    return (
      <>
        <Appbar />
        <ProtectedRoutes />
      </>
    );
  };
  return (
    <>
      <Routes>
        {/* public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/cartpage" element={<CartPage />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/gridresponsive" element={<ResponsiveGrid />} />
          <Route path="/empdata" element={<EmpDatas />} />
          <Route path="/counter" element={<CounterApp />} />
          <Route path="/greet" element={<GreetingProps />} />
          <Route path="/effect" element={<Effects />} />
          <Route path="/ref" element={<Ref />} />
          <Route path="/to-do" element={<To_Do_App />} />
          <Route path="/faq" element={<Faq_Accordion />} />
          <Route path="/sidebar" element={<SideBar />} />
          <Route path="/memohook" element={<MemoHook />} />
          <Route path="/profile" element={<ProfilePage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
