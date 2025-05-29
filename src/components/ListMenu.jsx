import { MdWork } from "react-icons/md";
import { CgWorkAlt } from "react-icons/cg";
import { MdArticle } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { RiServiceFill } from "react-icons/ri";
import { BsPersonWorkspace } from "react-icons/bs";
import { AiOutlineTeam, AiOutlineUserAdd, AiOutlineShoppingCart } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function ListMenu() {
  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-4 py-2 transition-all duration-200 
    ${isActive ? "text-white font-semibold bg-white/10" : "text-gray-300 hover:bg-white/10 hover:text-white"}`;

  const errorClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-4 py-2 transition-all duration-200 
    ${isActive ? "text-red-400 font-semibold bg-red-200/10" : "text-gray-400 hover:text-red-400 hover:bg-red-100/10"}`;

  return (
    <div id="sidebar-menu" className="mt-6 text-sm">
      <ul id="menu-list" className="space-y-2">
        <li>
          <NavLink to="/" className={menuClass}>
            <MdOutlineDashboardCustomize /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/Reservasi" className={menuClass}>
            <RiServiceFill /> Reservasi
          </NavLink>
        </li>
        <li>
          <NavLink to="/RoomsList" className={menuClass}>
            <BsPersonWorkspace /> RoomsList
          </NavLink>
        </li>
        <li>
          <NavLink to="/TeamManagement" className={menuClass}>
            <AiOutlineTeam /> Team Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/Review" className={menuClass}>
            <MdRateReview /> Review Pelanggan
          </NavLink>
        </li>
        <li>
          <NavLink to="/LowonganList" className={menuClass}>
            <MdWork /> Lowongan
          </NavLink>
        </li>
        <li>
          <NavLink to="/FAQList" className={menuClass}>
            <FaQuestionCircle /> FAQ
          </NavLink>
        </li>
        <li>
          <NavLink to="/ArtikelCrud" className={menuClass}>
            <MdArticle /> Article
          </NavLink>
        </li>
        <li>
          <NavLink to="/Error400" className={errorClass}>
            <BiErrorCircle /> Error 400
          </NavLink>
        </li>
        <li>
          <NavLink to="/Error401" className={errorClass}>
            <BiErrorCircle /> Error 401
          </NavLink>
        </li>
        <li>
          <NavLink to="/Error403" className={errorClass}>
            <BiErrorCircle /> Error Saja
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
