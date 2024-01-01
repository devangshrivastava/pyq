import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function Layout() {
  return (
    <div>
       <CssBaseline />
        <Navbar />
        <Outlet />
    </div>
  )
}
