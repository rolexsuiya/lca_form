import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LcaEdit from "./screen/Lca_edit";
import LcaList from "./screen/Lca_list";
import ResetSign from "./screen/ResetSign";
import SignIn from "./screen/Signin";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/Reset" element={<ResetSign />} />
          <Route path="/LcaList" element={<LcaList />} />
          <Route path="/LcaEdit" element={<LcaEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
