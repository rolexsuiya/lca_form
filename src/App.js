import React from "react";
import ResetSign from "./screen/ResetSign";
import SignIn from "./screen/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LcaList from "./screen/Lca_list";
import LcaEdit from "./screen/Lca_edit";

function App() {
  return (
    <>
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
