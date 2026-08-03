import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function MainLayout() {
  return (
    <>
    <Navbar />   
    {/* this Navbar is shared ui we want to have across the pages */}
      <Outlet/>
      {/* Outlet is actual page which is rendered along with Navbar */}
    </>
  );
}
