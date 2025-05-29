import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container" className="bg-gray-100 min-h-screen p-6">
            <PageHeader
                title="Dashboard"
                breadcrumb={['Dashboard', 'Order List']}
            >

            </PageHeader>

            <div id="dashboard-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {/* Orders Section */}
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <div className="bg-orange-400 w-12 h-12 mx-auto rounded-lg flex items-center justify-center shadow-lg">
                        <FaShoppingCart className="text-white text-xl" />
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700 text-sm">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">75</p>
                        <p className="text-xs text-red-500 mt-1">Get more space</p>
                    </div>
                </div>

                {/* Delivered Section */}
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <div className="bg-green-500 w-12 h-12 mx-auto rounded-lg flex items-center justify-center shadow-lg">
                        <FaTruck className="text-white text-xl" />
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700 text-sm">Total Delivered</p>
                        <p className="text-2xl font-bold text-gray-900">175</p>
                        <p className="text-xs text-gray-400 mt-1">Last 24 Hours</p>
                    </div>
                </div>

                {/* Canceled Section */}
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <div className="bg-red-500 w-12 h-12 mx-auto rounded-lg flex items-center justify-center shadow-lg">
                        <FaBan className="text-white text-xl" />
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700 text-sm">Total Canceled</p>
                        <p className="text-2xl font-bold text-gray-900">40</p>
                        <p className="text-xs text-gray-400 mt-1">Tracked from system</p>
                    </div>
                </div>

                {/* Revenue Section */}
                <div className="bg-white rounded-lg shadow-md p-4 text-center">
                    <div className="bg-cyan-500 w-12 h-12 mx-auto rounded-lg flex items-center justify-center shadow-lg">
                        <FaDollarSign className="text-white text-xl" />
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700 text-sm">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">Rp.128</p>
                        <p className="text-xs text-gray-400 mt-1">Just Updated</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
