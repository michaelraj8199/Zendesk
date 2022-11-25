import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ZenForm from "./components/ZenForm";
import Success from "./components/Success";
import Status from "./components/Status";
import Dashboard from "./components/Admin/Dashboard";
import Issues from "./components/Issues";
import Login from "./components/Admin/Login";
import Adminprofile from "./components/Admin/Adminprofile";
import Signup from "../src/components/Admin/Signup";
import Home from "../src/components/LandingComponents/Home";
import Feedback from "../src/components/Feedback";

export const CommonContext = React.createContext();
const apiurl = "http://localhost:8000"; //'https://zendesk-be.herokuapp.com'
function App() {
  return (
    <>
      <BrowserRouter>
        <CommonContext.Provider value={{ apiurl }}>
          <Routes>
            <Route path="/new-issues" element={<ZenForm />}/>
            <Route path="/success/:zen_id" element={<Success />} />
            <Route path="/track-issue" element={<Status />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/issue/:id" element={<Issues />} />
            <Route path="/signup1" element={<Signup />} />
            <Route path="/login1" element={<Login />} />
            <Route path="/admin-profile" element={<Adminprofile />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </CommonContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
