import React from "react";
import { Outlet } from "react-router-dom";
// Sections
import Header from "sections/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
