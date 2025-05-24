import { MdWork } from "react-icons/md"; 
import { CgWorkAlt } from "react-icons/cg"; 
import { MdArticle } from "react-icons/md"; 
import { FaQuestionCircle } from "react-icons/fa"; 
import { MdRateReview } from "react-icons/md"; 
import { RiServiceFill } from "react-icons/ri"; 
import { BsPersonWorkspace } from "react-icons/bs"; 
import { AiOutlineTeam } from "react-icons/ai"; 
import { BiErrorCircle } from "react-icons/bi"; 
import { AiOutlineUserAdd } from "react-icons/ai"; 
import { AiOutlineShoppingCart } from "react-icons/ai"; 
import { MdOutlineDashboardCustomize } from "react-icons/md"; 
import { NavLink } from "react-router-dom";

export default function ListMenu(){
        const menuClass = ({ isActive }) =>
          `flex cursor-pointer items-center rounded-xl p-4 space-x-2
          ${isActive ? 
              "text-hijau bg-blue-200 font-extrabold" : 
              "text-gray-600 hover:text-hijau hover:bg-blue-200 hover:font-extrabold"
          }`


        const menuClass2 = ({ isActive }) =>
            `flex cursor-pointer items-center rounded-xl p-4 space-x-2
            ${isActive ? 
              "text-red-600 bg-red-100 font-extrabold" : 
              "text-gray-600 hover:text-red-600 hover:bg-red-100 hover:font-extrabold"
            }`;
         
    return(
        <div id="sidebar-menu" className="mt-10">
                        <ul id="menu-list" className="space-y-3">
                            <li>
                                <NavLink 
                                id="menu-1" 
                                to = "/"
                                className={menuClass}>
                                    <MdOutlineDashboardCustomize />Dashboard
                                    </NavLink>
                              </li>
                              
                            <li>
                                <NavLink
                                 id="menu-2"
                                 to = "/Reservasi"
                                 className={menuClass}>
                                    <RiServiceFill />Reservasi</NavLink>
                              </li>
                              <li>
                                <NavLink 
                                id="menu-3" 
                                to = "/RoomsList"
                                className={menuClass}>
                                    <BsPersonWorkspace />RoomsList
                                    </NavLink>
                              </li>
                              <li>
                                <NavLink 
                                id="menu-3" 
                                to = "/TeamManagement"
                                className={menuClass}>
                                    <AiOutlineTeam />Team Management
                                    </NavLink>
                              </li>
                              <li>
                                <NavLink 
                                id="menu-4" 
                                to = "/Review"
                                className={menuClass}>
                                    <MdRateReview />Review Pelanggan
                                    </NavLink>
                              </li>
                              <li>
                                <NavLink 
                                id="menu-5" 
                                to = "/LowonganList"
                                className={menuClass}>
                                    <MdWork />Lowongan
                                    </NavLink>
                              </li>
                              <li>
                                <NavLink 
                                id="menu-6" 
                                to = "/FAQList"
                                className={menuClass}>
                                    <FaQuestionCircle />FAQ
                                    </NavLink>
                              </li>
                              <li>
                                <NavLink 
                                id="menu-7" 
                                to = "/ArtikelCrud"
                                className={menuClass}>
                                    <MdArticle />Article
                                    </NavLink>
                              </li>
                              <li>
                                <NavLink 
                                id="menu-4" 
                                to = "/Error400"
                                className={menuClass2}>
                                    <BiErrorCircle />Error400
                                    </NavLink>
                              </li>
                              <li>
                                <NavLink 
                                id="menu-4" 
                                to = "/Error401"
                                className={menuClass2}>
                                    <BiErrorCircle />Error401
                                    </NavLink>
                              </li>
                              <li>
                                <NavLink 
                                id="menu-5" 
                                to = "/Error403"
                                className={menuClass2}>
                                    <BiErrorCircle />Error saja
                                    </NavLink>
                              </li>
                        </ul>
                    </div>
    )
}