import { AiOutlineUserAdd } from "react-icons/ai"; 
import { AiOutlineShoppingCart } from "react-icons/ai"; 
import { MdOutlineDashboardCustomize } from "react-icons/md"; 

export default function ListMenu(){
    return(
        <div id="sidebar-menu" className="mt-10">
                        <ul id="menu-list" className="space-y-3">
                            <li>
                                <div id="menu-1" className=" gap-2 hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
                                    <MdOutlineDashboardCustomize />Dashboard</div>
                              </li>
                              
                            <li>
                                <div id="menu-2" className=" gap-2 hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
                                    <AiOutlineShoppingCart />Orders</div>
                              </li>
                              <li>
                                <div id="menu-3" className="gap-2 hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
                                    <AiOutlineUserAdd />Customers</div>
                              </li>
                        </ul>
                    </div>
    )
}