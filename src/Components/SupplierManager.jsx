// import React, { useState } from 'react';
// import SupplierForm from './SupplierForm';
// import SupplierList from './SupplierList';

// export default function SupplierManager() {
//   const [suppliers, setSuppliers] = useState([]);
//   const [selectedSupplier, setSelectedSupplier] = useState(null);

//   const handleAddOrUpdate = (supplier) => {
//     if (selectedSupplier) {
//       // Update existing supplier
//       setSuppliers((prev) =>
//         prev.map((s) =>
//           s.email === selectedSupplier.email ? supplier : s
//         )
//       );
//       setSelectedSupplier(null);
//     } else {
//       // Add new supplier
//       setSuppliers((prev) => [...prev, supplier]);
//     }
//   };

//   const handleEdit = (supplier) => {
//     setSelectedSupplier(supplier);
//   };

//   const handleClear = () => {
//     setSelectedSupplier(null);
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-6 p-4">
//       <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">
//         Supplier Management
//       </h1>
//       <SupplierForm
//         onSubmit={handleAddOrUpdate}
//         selected={selectedSupplier}
//         onClear={handleClear}
//       />
//       <SupplierList
//         suppliers={suppliers}
//         onEdit={handleEdit}
//       />
//     </div>
//   );
// }
