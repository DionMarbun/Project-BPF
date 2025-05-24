// import productsData from "./products.json";

// export default function FrameworkProduct() {
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
//             {productsData.map((item) => (
// 		            <div key={item.id} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
// 		            <p className="text-gray-600">{item.description}</p>
//                     <p className="text-gray-600">{item.category}</p>
//                     <p className="text-gray-600">{item.price}</p>
//                     <p className="text-gray-600">{item.discountPercentage}</p>
//                     <p className="text-gray-600">{item.rating}</p>
//                     <p className="text-gray-600">{item.stock}</p>
//                     <p className="text-gray-600">{item.tags}</p>
//                     <p className="text-gray-600">{item.brand}</p>
//                     <p className="text-gray-600">{item.dimensions.depth}</p> 
//                     <p className="text-gray-600">{item.dimensions.height}</p> 
//                     <p className="text-gray-600">{item.dimensions.width}</p>

//     <p>{item.tags.map((tag,index)=>(
//         <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full mr-2">
//             {tag}
//             </span>
//             ))}</p>
// 		            </div>
                    
//             ))}
//         </div>
//     )
// }




// <p className="text-gray-600">{item.description}</p>
// <p className="text-gray-600">{item.category}</p>
// <p className="text-gray-600">{item.price}</p>
// <p className="text-gray-600">{item.discountPercentage}</p>
// <p className="text-gray-600">{item.rating}</p>
// <p className="text-gray-600">{item.stock}</p>
// <p className="text-gray-600">{item.tags}</p>
// <p className="text-gray-600">{item.brand}</p>
// <p className="text-gray-600">{item.dimensions}</p>

import productsData from "./products.json";

export default function FrameworkProduct() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {productsData.map((item) => (
                <div
                    key={item.id}
                    className="border p-4 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-lg"
                >
                    {/* Gambar Produk */}
                    {item.image && (
                        <img
                            src={item.image}
                            alt={item.description}
                            className="w-full h-40 object-cover rounded-md mb-3"
                        />
                    )}

                    {/* Kategori Produk */}
                    <p className="text-sm font-semibold text-white bg-blue-500 px-2 py-1 rounded-full w-fit mb-2">
                        {item.category}
                    </p>

                    {/* Kategori Produk dengan Warna Dinamis */}
                    <p className={`text-sm font-semibold text-white px-2 py-1 rounded-full w-fit mb-2 {item.category}`}>
                        {item.category}
                    </p>

                    {/* Deskripsi Produk */}
                    <p className="text-gray-800 font-semibold">{item.description}</p>

                    {/* Harga & Diskon */}
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-lg font-bold text-green-600">${item.price}</p>
                        {item.discountPercentage > 0 && (
                            <span className="text-sm text-red-500 font-semibold">
                                -{item.discountPercentage}%
                            </span>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span
                                key={i}
                                className={`text-yellow-400 ${
                                    i < Math.round(item.rating) ? "opacity-100" : "opacity-30"
                                }`}
                            >
                                ★
                            </span>
                        ))}
                        <p className="ml-2 text-gray-600 text-sm">({item.rating})</p>
                    </div>

                    {/* Stok */}
                    <p className="text-sm text-gray-500 mt-2">Stock: {item.stock}</p>

                    {/* Brand */}
                    <p className="text-sm text-gray-600 mt-1">Brand: {item.brand}</p>

                    {/* Dimensi */}
                    <p className="text-sm text-gray-500 mt-1">
                        Size: {item.dimensions.width} x {item.dimensions.height} x{" "}
                        {item.dimensions.depth}
                    </p>

                    {/* Tags */}
                    <div className="mt-2 flex flex-wrap">
                        {item.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full mr-2 mb-1"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
