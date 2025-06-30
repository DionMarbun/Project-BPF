import { NavLink } from "react-router-dom";
import {
  MdPermMedia,
  MdWork,
  MdArticle,
  MdRateReview,
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import {
  RiProfileLine,
  RiServiceFill,
  RiAdminFill,
} from "react-icons/ri";
import {
  AiOutlineContacts,
  AiOutlineTeam,
} from "react-icons/ai";
import { FaQuestionCircle } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";

export default function ListMenu() {
  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all 
    ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"}`;

  const errorClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all 
    ${isActive ? "bg-red-100 text-red-600" : "text-gray-500 hover:bg-red-50 hover:text-red-500"}`;

  return (
    <div id="sidebar-menu" className="mt-4 text-sm font-sans">
      <ul className="space-y-1">
        <li>
          <NavLink to="/" className={menuClass}>
            <MdOutlineDashboardCustomize className="text-lg" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/Reservasi" className={menuClass}>
            <RiServiceFill className="text-lg" />
            Reservasi
          </NavLink>
        </li>
        <li>
          <NavLink to="/RoomsList" className={menuClass}>
            <BsPersonWorkspace className="text-lg" />
            Rooms List
          </NavLink>
        </li>
        <li>
          <NavLink to="/TeamManagement" className={menuClass}>
            <AiOutlineTeam className="text-lg" />
            Team Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/Review" className={menuClass}>
            <MdRateReview className="text-lg" />
            Review Pelanggan
          </NavLink>
        </li>
        <li>
          <NavLink to="/LowonganList" className={menuClass}>
            <MdWork className="text-lg" />
            Lowongan
          </NavLink>
        </li>
        <li>
          <NavLink to="/FAQList" className={menuClass}>
            <FaQuestionCircle className="text-lg" />
            FAQ
          </NavLink>
        </li>
        <li>
          <NavLink to="/ArtikelCrud" className={menuClass}>
            <MdArticle className="text-lg" />
            Artikel
          </NavLink>
        </li>
        <li>
          <NavLink to="/KontakMasuk" className={menuClass}>
            <AiOutlineContacts className="text-lg" />
            Kontak Masuk
          </NavLink>
        </li>
        <li>
          <NavLink to="/Role" className={menuClass}>
            <RiAdminFill className="text-lg" />
            Role Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/CompanyProfile" className={menuClass}>
            <RiProfileLine className="text-lg" />
            Company Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/MediaGallery" className={menuClass}>
            <MdPermMedia className="text-lg" />
            Media Gallery
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
