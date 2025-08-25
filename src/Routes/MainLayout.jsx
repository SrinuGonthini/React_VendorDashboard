import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const MainLayout = () => {
    return(
        <div className="Appbar">
        <Sidebar/>
        <Outlet/>
        </div>
    )
}

export default MainLayout