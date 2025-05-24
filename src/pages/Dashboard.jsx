import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container">
            <PageHeader
      title="Dashboard"
      breadcrumb={['Dashboard', 'Order List']}
    >
    <div className="flex space-x-2">
      <button className="bg-hijau text-white px-4 py-2 rounded-lg">
        Add Button
      </button>
      <button className="bg-biru text-white px-4 py-2 rounded-lg">
        Export
      </button>
      <button className="bg-merah text-white px-4 py-2 rounded-lg">
        Kembali
      </button>
      </div>
    </PageHeader>
            <div id="dashboard-grid" className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {/* Orders Section */}
                <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
                    <div className="bg-hijau text-white p-4 rounded-full">
                        <FaShoppingCart className="text-3xl" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">75</span>
                        <span className="text-gray-500">Total Orders</span>
                    </div>
                </div>

                {/* Delivered Section */}
                <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
                    <div className="bg-blue-500 text-white p-4 rounded-full">
                        <FaTruck className="text-3xl" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">175</span>
                        <span className="text-gray-500">Total Delivered</span>
                    </div>
                </div>

                {/* Canceled Section */}
                <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
                    <div className="bg-red-500 text-white p-4 rounded-full">
                        <FaBan className="text-3xl" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">40</span>
                        <span className="text-gray-500">Total Canceled</span>
                    </div>
                </div>

                {/* Revenue Section */}
                <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
                    <div className="bg-yellow-500 text-white p-4 rounded-full">
                        <FaDollarSign className="text-3xl" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">Rp.128</span>
                        <span className="text-gray-500">Total Revenue</span>
                    </div>
                </div>
            </div>
        </div>
    );
}