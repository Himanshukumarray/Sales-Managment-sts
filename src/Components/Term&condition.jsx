import { useState } from 'react';

const PermissionPage = () => {
  const [showModal, setShowModal] = useState(true);
  const [showPermissionPanel, setShowPermissionPanel] = useState(false);
  const [permissions, setPermissions] = useState({
    location: false,
    deviceId: false,
    ageVerification: false,
    phoneNumber: false,
    camera: false,
    microphone: false,
    notifications: false,
    contactList: false
  });

  const handlePermissionChange = (permission) => {
    setPermissions({
      ...permissions,
      [permission]: !permissions[permission]
    });
  };

  const handleAcceptAll = () => {
    setPermissions({
      location: true,
      deviceId: true,
      ageVerification: true,
      phoneNumber: true,
      camera: true,
      microphone: true,
      notifications: true,
      contactList: true
    });
    setShowModal(false);
  };

  const handleManageClick = () => {
    setShowPermissionPanel(true);
  };

  const handleCancelClick = () => {
    setShowModal(false);
  };

  const handleSavePermissions = () => {
    setShowPermissionPanel(false);
    setShowModal(false);
  };

  const handleBackToModal = () => {
    setShowPermissionPanel(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Main content that would be your website */}
      {!showModal && (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Our Website</h1>
          <p className="text-gray-600">You've accepted the necessary permissions.</p>
          <button 
            onClick={() => setShowModal(true)} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Show Permissions Again
          </button>
        </div>
      )}

      {/* Permission Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-70 flex items-center justify-center z-50 p-4">
          {/* Permission Panel */}
          {showPermissionPanel ? (
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 animate-appear">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Manage Permissions</h2>
                <button 
                  onClick={handleBackToModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <p className="text-gray-600 mb-4">Please select which permissions you'd like to enable:</p>
                
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm group relative cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Location Access</h3>
                      <p className="text-sm text-gray-500">Allow us to access your current location</p>
                    </div>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-blue-600" 
                        checked={permissions.location}
                        onChange={() => handlePermissionChange('location')}
                      />
                    </label>
                  </div>
                  {/* Purpose tooltip that appears on hover */}
                  <div className="absolute invisible group-hover:visible bg-gray-800 text-white p-3 rounded-md shadow-lg text-sm w-full max-w-xs right-0 mt-2 z-10 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    <div className="absolute right-3 -top-2 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                    <p>We need your location to show nearby stores and services, calculate accurate delivery times, and provide location-specific promotions.</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm group relative cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Device ID</h3>
                      <p className="text-sm text-gray-500">Allow us to access your device identifier</p>
                    </div>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-blue-600" 
                        checked={permissions.deviceId}
                        onChange={() => handlePermissionChange('deviceId')}
                      />
                    </label>
                  </div>
                  {/* Purpose tooltip */}
                  <div className="absolute invisible group-hover:visible bg-gray-800 text-white p-3 rounded-md shadow-lg text-sm w-full max-w-xs right-0 mt-2 z-10 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    <div className="absolute right-3 -top-2 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                    <p>Your device ID helps us provide a secure experience, prevent fraud, and enable seamless synchronization across your devices.</p>
                  </div>
                </div>
                
                {/* <div className="bg-gray-50 p-4 rounded-lg shadow-sm group relative cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Age Verification</h3>
                      <p className="text-sm text-gray-500">Confirm you are 18 years or older</p>
                    </div>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-blue-600" 
                        checked={permissions.ageVerification}
                        onChange={() => handlePermissionChange('ageVerification')}
                      />
                    </label>
                  </div>
                  <div className="absolute invisible group-hover:visible bg-gray-800 text-white p-3 rounded-md shadow-lg text-sm w-full max-w-xs right-0 mt-2 z-10 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    <div className="absolute right-3 -top-2 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                    <p>Age verification is required to comply with legal regulations and ensure you can access age-restricted content and services on our platform.</p>
                  </div>
                </div> */}
                
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm group relative cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Phone Number</h3>
                      <p className="text-sm text-gray-500">Allow us to access your phone number</p>
                    </div>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-blue-600" 
                        checked={permissions.phoneNumber}
                        onChange={() => handlePermissionChange('phoneNumber')}
                      />
                    </label>
                  </div>
                  {/* Purpose tooltip */}
                  <div className="absolute invisible group-hover:visible bg-gray-800 text-white p-3 rounded-md shadow-lg text-sm w-full max-w-xs right-0 mt-2 z-10 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    <div className="absolute right-3 -top-2 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                    <p>Your phone number helps us verify your account, send important security alerts, and enable two-factor authentication for enhanced account protection.</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm group relative cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Camera</h3>
                      <p className="text-sm text-gray-500">Allow access to your device camera</p>
                    </div>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-blue-600" 
                        checked={permissions.camera}
                        onChange={() => handlePermissionChange('camera')}
                      />
                    </label>
                  </div>
                  {/* Purpose tooltip */}
                  <div className="absolute invisible group-hover:visible bg-gray-800 text-white p-3 rounded-md shadow-lg text-sm w-full max-w-xs right-0 mt-2 z-10 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    <div className="absolute right-3 -top-2 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                    <p>Camera access enables you to scan QR codes, upload profile pictures, participate in video calls, and use augmented reality features within our app.</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm group relative cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Microphone</h3>
                      <p className="text-sm text-gray-500">Allow access to your device microphone</p>
                    </div>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-blue-600" 
                        checked={permissions.microphone}
                        onChange={() => handlePermissionChange('microphone')}
                      />
                    </label>
                  </div>
                  {/* Purpose tooltip */}
                  <div className="absolute invisible group-hover:visible bg-gray-800 text-white p-3 rounded-md shadow-lg text-sm w-full max-w-xs right-0 mt-2 z-10 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    <div className="absolute right-3 -top-2 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                    <p>Microphone access allows you to use voice search, participate in audio calls, record voice messages, and use voice-activated features in our application.</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm group relative cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Notifications</h3>
                      <p className="text-sm text-gray-500">Allow us to send you notifications</p>
                    </div>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-blue-600" 
                        checked={permissions.notifications}
                        onChange={() => handlePermissionChange('notifications')}
                      />
                    </label>
                  </div>
                  {/* Purpose tooltip */}
                  <div className="absolute invisible group-hover:visible bg-gray-800 text-white p-3 rounded-md shadow-lg text-sm w-full max-w-xs right-0 mt-2 z-10 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    <div className="absolute right-3 -top-2 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                    <p>Notifications keep you informed about important updates, new messages, special offers, account activity, and time-sensitive information related to our services.</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm group relative cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Contact List</h3>
                      <p className="text-sm text-gray-500">Allow access to your contact list</p>
                    </div>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-blue-600" 
                        checked={permissions.contactList}
                        onChange={() => handlePermissionChange('contactList')}
                      />
                    </label>
                  </div>
                  {/* Purpose tooltip */}
                  <div className="absolute invisible group-hover:visible bg-gray-800 text-white p-3 rounded-md shadow-lg text-sm w-full max-w-xs right-0 mt-2 z-10 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    <div className="absolute right-3 -top-2 w-4 h-4 bg-gray-800 transform rotate-45"></div>
                    <p>Contact list access helps you find friends who are already using our platform, share content with your contacts easily, and improve your social experience.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={handleBackToModal} 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button 
                  onClick={handleSavePermissions} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          ) : (
            /* Main Permission Modal */
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 animate-appear">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Permission Required</h2>
                <p className="text-gray-600">Before you continue, we need your consent for the following:</p>
              </div>
              
              {/* Age Verification Box */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
                <p className="text-gray-700">
                  By proceeding, I confirm that I am at least 18 years of age and legally able to provide consent for data processing.
                </p>
              </div>
              
              {/* Terms and Conditions */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6 max-h-60 overflow-y-auto border border-gray-200">
                <div className="mb-4">
                  <h3 className="font-medium text-lg text-gray-800 mb-2">Terms and Conditions</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Welcome to our service. By using our platform, you agree to these terms which are designed to protect both you and us.
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    We collect various types of data to improve your experience and provide our services. This includes technical information (such as IP address and device info), usage data, and information you explicitly provide to us.
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    We use industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, so we cannot guarantee absolute security.
                  </p>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-lg text-gray-800 mb-2">Privacy Policy</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Our privacy policy explains how we process your data, including collection, storage, protection, and your rights regarding your personal information.
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    You have the right to access, correct, delete, and port your data. You can also object to or restrict processing of your data in certain circumstances.
                  </p>
                  <p className="text-gray-600 text-sm">
                    We may update these terms from time to time. Continued use of our service after such changes constitutes your consent to the changes.
                  </p>
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-wrap justify-end gap-3">
                <button 
                  onClick={handleAcceptAll} 
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Accept All
                </button>
                <button 
                  onClick={handleManageClick} 
                  className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50"
                >
                  Manage
                </button>
                <button 
                  onClick={handleCancelClick} 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PermissionPage;



// import { useState } from 'react'; 

// const PermissionPage = () => {
//   const [showModal, setShowModal] = useState(true);
//   const [showPermissionPanel, setShowPermissionPanel] = useState(false);
//   const [permissions, setPermissions] = useState({
//     location: false,
//     deviceId: false,
//     ageVerification: false,
//     phoneNumber: false,
//     camera: false,
//     microphone: false,
//     notifications: false,
//     contactList: false
//   });

//   const handlePermissionChange = (permission) => {
//     setPermissions({
//       ...permissions,
//       [permission]: !permissions[permission]
//     });
//   };

//   const handleAcceptAll = () => {
//     setPermissions({
//       location: true,
//       deviceId: true,
//       ageVerification: true,
//       phoneNumber: true,
//       camera: true,
//       microphone: true,
//       notifications: true,
//       contactList: true
//     });
//     setShowModal(false);
//   };

//   const handleManageClick = () => {
//     setShowPermissionPanel(true);
//   };

//   const handleCancelClick = () => {
//     setShowModal(false);
//   };

//   const handleSavePermissions = () => {
//     setShowPermissionPanel(false);
//     setShowModal(false);
//   };

//   const handleBackToModal = () => {
//     setShowPermissionPanel(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4 font-sans">
//       {/* Main content that would be your website */}
//       {!showModal && (
//         <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-lg mx-auto">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Our Platform</h1>
//           <p className="text-gray-600 mb-6">You've successfully set your permission preferences.</p>
//           <button 
//             onClick={() => setShowModal(true)} 
//             className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//           >
//             Manage Permissions
//           </button>
//         </div>
//       )}

//       {/* Permission Modal Overlay */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           {/* Permission Panel */}
//           {showPermissionPanel ? (
//             <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-appear">
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold text-white">Manage Permissions</h2>
//                   <button 
//                     onClick={handleBackToModal}
//                     className="text-white hover:text-gray-200 transition-colors"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//                 <p className="text-blue-100 text-sm mt-1">Select which permissions you'd like to enable</p>
//               </div>
              
//               <div className="p-6">
//                 <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
//                   {/* Location Permission */}
//                   <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow group relative">
//                     <div className="p-4 flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div className="bg-blue-100 p-2 rounded-lg mr-4">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-800">Location Access</h3>
//                           <p className="text-xs text-gray-500 mt-1">Allow us to access your current location</p>
//                         </div>
//                       </div>
//                       <label className="inline-flex items-center">
//                         <div className="relative">
//                           <input 
//                             type="checkbox" 
//                             className="opacity-0 absolute h-0 w-0" 
//                             checked={permissions.location}
//                             onChange={() => handlePermissionChange('location')}
//                           />
//                           <div className={`toggle-bg w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${permissions.location ? 'bg-blue-600' : 'bg-gray-300'}`}>
//                             <div className={`toggle-dot w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${permissions.location ? 'translate-x-6' : 'translate-x-1'}`}></div>
//                           </div>
//                         </div>
//                       </label>
//                     </div>
//                     {/* Info tooltip */}
//                     <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-gray-800 text-white p-3 rounded-lg shadow-xl text-sm max-w-xs top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 transition-all duration-200">
//                       <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rotate-45"></div>
//                       <p>We need your location to show nearby stores and services, calculate accurate delivery times, and provide location-specific promotions.</p>
//                     </div>
//                   </div>
                  
//                   {/* Device ID Permission */}
//                   <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow group relative">
//                     <div className="p-4 flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div className="bg-purple-100 p-2 rounded-lg mr-4">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                           </svg>
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-800">Device ID</h3>
//                           <p className="text-xs text-gray-500 mt-1">Allow us to access your device identifier</p>
//                         </div>
//                       </div>
//                       <label className="inline-flex items-center">
//                         <div className="relative">
//                           <input 
//                             type="checkbox" 
//                             className="opacity-0 absolute h-0 w-0" 
//                             checked={permissions.deviceId}
//                             onChange={() => handlePermissionChange('deviceId')}
//                           />
//                           <div className={`toggle-bg w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${permissions.deviceId ? 'bg-blue-600' : 'bg-gray-300'}`}>
//                             <div className={`toggle-dot w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${permissions.deviceId ? 'translate-x-6' : 'translate-x-1'}`}></div>
//                           </div>
//                         </div>
//                       </label>
//                     </div>
//                     {/* Info tooltip */}
//                     <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-gray-800 text-white p-3 rounded-lg shadow-xl text-sm max-w-xs top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 transition-all duration-200">
//                       <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rotate-45"></div>
//                       <p>Your device ID helps us provide a secure experience, prevent fraud, and enable seamless synchronization across your devices.</p>
//                     </div>
//                   </div>
                  
//                   {/* Age Verification Permission */}
//                   <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow group relative">
//                     <div className="p-4 flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div className="bg-green-100 p-2 rounded-lg mr-4">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                           </svg>
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-800">Age Verification</h3>
//                           <p className="text-xs text-gray-500 mt-1">Confirm you are 18 years or older</p>
//                         </div>
//                       </div>
//                       <label className="inline-flex items-center">
//                         <div className="relative">
//                           <input 
//                             type="checkbox" 
//                             className="opacity-0 absolute h-0 w-0" 
//                             checked={permissions.ageVerification}
//                             onChange={() => handlePermissionChange('ageVerification')}
//                           />
//                           <div className={`toggle-bg w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${permissions.ageVerification ? 'bg-blue-600' : 'bg-gray-300'}`}>
//                             <div className={`toggle-dot w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${permissions.ageVerification ? 'translate-x-6' : 'translate-x-1'}`}></div>
//                           </div>
//                         </div>
//                       </label>
//                     </div>
//                     {/* Info tooltip */}
//                     <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-gray-800 text-white p-3 rounded-lg shadow-xl text-sm max-w-xs top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 transition-all duration-200">
//                       <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rotate-45"></div>
//                       <p>Age verification is required to comply with legal regulations and ensure you can access age-restricted content and services on our platform.</p>
//                     </div>
//                   </div>
                  
//                   {/* Phone Number Permission */}
//                   <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow group relative">
//                     <div className="p-4 flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div className="bg-red-100 p-2 rounded-lg mr-4">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                           </svg>
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-800">Phone Number</h3>
//                           <p className="text-xs text-gray-500 mt-1">Allow us to access your phone number</p>
//                         </div>
//                       </div>
//                       <label className="inline-flex items-center">
//                         <div className="relative">
//                           <input 
//                             type="checkbox" 
//                             className="opacity-0 absolute h-0 w-0" 
//                             checked={permissions.phoneNumber}
//                             onChange={() => handlePermissionChange('phoneNumber')}
//                           />
//                           <div className={`toggle-bg w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${permissions.phoneNumber ? 'bg-blue-600' : 'bg-gray-300'}`}>
//                             <div className={`toggle-dot w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${permissions.phoneNumber ? 'translate-x-6' : 'translate-x-1'}`}></div>
//                           </div>
//                         </div>
//                       </label>
//                     </div>
//                     {/* Info tooltip */}
//                     <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-gray-800 text-white p-3 rounded-lg shadow-xl text-sm max-w-xs top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 transition-all duration-200">
//                       <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rotate-45"></div>
//                       <p>Your phone number helps us verify your account, send important security alerts, and enable two-factor authentication for enhanced account protection.</p>
//                     </div>
//                   </div>
                  
//                   {/* Camera Permission */}
//                   <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow group relative">
//                     <div className="p-4 flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div className="bg-yellow-100 p-2 rounded-lg mr-4">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-800">Camera</h3>
//                           <p className="text-xs text-gray-500 mt-1">Allow access to your device camera</p>
//                         </div>
//                       </div>
//                       <label className="inline-flex items-center">
//                         <div className="relative">
//                           <input 
//                             type="checkbox" 
//                             className="opacity-0 absolute h-0 w-0" 
//                             checked={permissions.camera}
//                             onChange={() => handlePermissionChange('camera')}
//                           />
//                           <div className={`toggle-bg w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${permissions.camera ? 'bg-blue-600' : 'bg-gray-300'}`}>
//                             <div className={`toggle-dot w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${permissions.camera ? 'translate-x-6' : 'translate-x-1'}`}></div>
//                           </div>
//                         </div>
//                       </label>
//                     </div>
//                     {/* Info tooltip */}
//                     <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-gray-800 text-white p-3 rounded-lg shadow-xl text-sm max-w-xs top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 transition-all duration-200">
//                       <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rotate-45"></div>
//                       <p>Camera access enables you to scan QR codes, upload profile pictures, participate in video calls, and use augmented reality features within our app.</p>
//                     </div>
//                   </div>
                  
//                   {/* Microphone Permission */}
//                   <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow group relative">
//                     <div className="p-4 flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div className="bg-pink-100 p-2 rounded-lg mr-4">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//                           </svg>
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-800">Microphone</h3>
//                           <p className="text-xs text-gray-500 mt-1">Allow access to your device microphone</p>
//                         </div>
//                       </div>
//                       <label className="inline-flex items-center">
//                         <div className="relative">
//                           <input 
//                             type="checkbox" 
//                             className="opacity-0 absolute h-0 w-0" 
//                             checked={permissions.microphone}
//                             onChange={() => handlePermissionChange('microphone')}
//                           />
//                           <div className={`toggle-bg w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${permissions.microphone ? 'bg-blue-600' : 'bg-gray-300'}`}>
//                             <div className={`toggle-dot w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${permissions.microphone ? 'translate-x-6' : 'translate-x-1'}`}></div>
//                           </div>
//                         </div>
//                       </label>
//                     </div>
//                     {/* Info tooltip */}
//                     <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-gray-800 text-white p-3 rounded-lg shadow-xl text-sm max-w-xs top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 transition-all duration-200">
//                       <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rotate-45"></div>
//                       <p>Microphone access allows you to use voice search, participate in audio calls, record voice messages, and use voice-activated features in our application.</p>
//                     </div>
//                   </div>
                  
//                   {/* Notifications Permission */}
//                   <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow group relative">
//                     <div className="p-4 flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div className="bg-indigo-100 p-2 rounded-lg mr-4">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//                           </svg>
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-800">Notifications</h3>
//                           <p className="text-xs text-gray-500 mt-1">Allow us to send you notifications</p>
//                         </div>
//                       </div>
//                       <label className="inline-flex items-center">
//                         <div className="relative">
//                           <input 
//                             type="checkbox" 
//                             className="opacity-0 absolute h-0 w-0" 
//                             checked={permissions.notifications}
//                             onChange={() => handlePermissionChange('notifications')}
//                           />
//                           <div className={`toggle-bg w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${permissions.notifications ? 'bg-blue-600' : 'bg-gray-300'}`}>
//                             <div className={`toggle-dot w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${permissions.notifications ? 'translate-x-6' : 'translate-x-1'}`}></div>
//                           </div>
//                         </div>
//                       </label>
//                     </div>
//                     {/* Info tooltip */}
//                     <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-gray-800 text-white p-3 rounded-lg shadow-xl text-sm max-w-xs top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 transition-all duration-200">
//                       <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rotate-45"></div>
//                       <p>Notifications keep you informed about important updates, new messages, special offers, account activity, and time-sensitive information related to our services.</p>
//                     </div>
//                   </div>
                  
//                   {/* Contact List Permission */}
//                   <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow group relative">
//                     <div className="p-4 flex items-center justify-between">
//                       <div className="flex items-center">
//                         <div className="bg-teal-100 p-2 rounded-lg mr-4">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                           </svg>
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-800">Contact List</h3>
//                           <p className="text-xs text-gray-500 mt-1">Allow access to your contact list</p>
//                         </div>
//                       </div>
//                       <label className="inline-flex items-center">
//                         <div className="relative">
//                           <input 
//                             type="checkbox" 
//                             className="opacity-0 absolute h-0 w-0" 
//                             checked={permissions.contactList}
//                             onChange={() => handlePermissionChange('contactList')}
//                           />
//                           <div className={`toggle-bg w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${permissions.contactList ? 'bg-blue-600' : 'bg-gray-300'}`}>
//                             <div className={`toggle-dot w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${permissions.contactList ? 'translate-x-6' : 'translate-x-1'}`}></div>
//                           </div>
//                         </div>
//                       </label>
//                     </div>
//                     {/* Info tooltip */}
//                     <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-gray-800 text-white p-3 rounded-lg shadow-xl text-sm max-w-xs top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 transition-all duration-200">
//                       <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rotate-45"></div>
//                       <p>Contact list access helps you find friends who are already using our platform, share content with your contacts easily, and improve your social experience.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
//                 <button 
//                   onClick={handleBackToModal} 
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
//                 >
//                   Back
//                 </button>
//                 <button 
//                   onClick={handleSavePermissions} 
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                 >
//                   Save Preferences
//                 </button>
//               </div>
//             </div>
//           ) : (
//             /* Main