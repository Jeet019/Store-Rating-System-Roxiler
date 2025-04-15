// import React, { useState } from 'react';
// import api from '../utils/api';
// import { useForm } from 'react-hook-form';
// import { motion } from 'framer-motion';
// import { Store, Mail, MapPin, Loader2 } from 'lucide-react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AddStore = () => {
//   const [serverMsg, setServerMsg] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
//   const [loading, setLoading] = useState(false);

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     reset,
// //   } = useForm();

// //   const onSubmit = async (data) => {
// //     setLoading(true);
// //     setServerMsg('');
// //     setErrorMsg('');
// //     try {
// //       const user = JSON.parse(localStorage.getItem('user'));
// //       const token = user?.token;

// //       const res = await api.post('/owner/store', data, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       setServerMsg(res.data.message);
// //       reset();
// //     } catch (err) {
// //       setErrorMsg(err.response?.data?.message || 'Failed to add store');
// //     } finally {
// //       setLoading(false);
// //     }
// const { register, handleSubmit, formState: { errors } } = useForm();

// const onSubmit = async (data) => {
//   setLoading(true);
//   try {
//     const res = await axios.post(
//       '/api/owner/store', // ✅ no id passed
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       }
//     );
//     toast.success(res.data.message);
//   } catch (err) {
//     toast.error(err.response?.data?.message || 'Error adding store');
//   } finally {
//     setLoading(false);
//   }

//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
//       <motion.div
//         className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">List Your Store 🏬</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* Store Name */}
//           <div className="flex items-center border border-purple-300 rounded-lg px-4 py-2">
//             <Store className="text-purple-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Store Name"
//               {...register('name', { required: 'Store name is required' })}
//               className="w-full bg-transparent outline-none text-gray-700"
//             />
//           </div>
//           {errors.name && <p className="text-red-500 text-sm -mt-3">{errors.name.message}</p>}

//           {/* Email */}
//           <div className="flex items-center border border-purple-300 rounded-lg px-4 py-2">
//             <Mail className="text-purple-500 mr-2" />
//             <input
//               type="email"
//               placeholder="Store Email"
//               {...register('email', {
//                 required: 'Email is required',
//                 pattern: {
//                   value: /\S+@\S+\.\S+/,
//                   message: 'Invalid email address',
//                 },
//               })}
//               className="w-full bg-transparent outline-none text-gray-700"
//             />
//           </div>
//           {errors.email && <p className="text-red-500 text-sm -mt-3">{errors.email.message}</p>}

//           {/* Address */}
//           <div className="flex items-center border border-purple-300 rounded-lg px-4 py-2">
//             <MapPin className="text-purple-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Store Address"
//               {...register('address', { required: 'Address is required' })}
//               className="w-full bg-transparent outline-none text-gray-700"
//             />
//           </div>
//           {errors.address && <p className="text-red-500 text-sm -mt-3">{errors.address.message}</p>}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition duration-300 flex items-center justify-center gap-2"
//           >
//             {loading && <Loader2 className="animate-spin h-5 w-5" />}
//             {loading ? 'Submitting...' : 'Add Store'}
//           </button>
//         </form>

//         {/* Response Messages */}
//         {serverMsg && <p className="mt-4 text-green-600 text-center font-medium">{serverMsg}</p>}
//         {errorMsg && <p className="mt-4 text-red-500 text-center font-medium">{errorMsg}</p>}
//       </motion.div>
//     </div>
//   );
// };

// export default AddStore;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Store, Mail, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';  // Ensure axios is imported
import 'react-toastify/dist/ReactToastify.css';

const AddStore = () => {
  const [serverMsg, setServerMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,  // Reset form after successful submit
  } = useForm();

  // onSubmit function that handles form submission
  const onSubmit = async (data) => {
    setLoading(true);
    setServerMsg('');  // Clear previous messages
    setErrorMsg('');   // Clear error messages
    try {
      // Get the token from localStorage and pass it in the header
      const token = localStorage.getItem('token');

      // Make the POST request
      const res = await axios.post(
        '/api/owner/store', // The API endpoint for adding store
        data,  // The form data: { name, email, address }
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass the token in headers
          },
        }
      );

      // Display success message if the store is added successfully
      toast.success(res.data.message);
      setServerMsg(res.data.message); // Show the server response message
      reset();  // Reset the form after successful submission
    } catch (err) {
      // Handle error and display the error message
      toast.error(err.response?.data?.message || 'Error adding store');
      setErrorMsg(err.response?.data?.message || 'Error adding store');
    } finally {
      setLoading(false); // Hide the loading spinner
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">List Your Store 🏬</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Store Name */}
          <div className="flex items-center border border-purple-300 rounded-lg px-4 py-2">
            <Store className="text-purple-500 mr-2" />
            <input
              type="text"
              placeholder="Store Name"
              {...register('name', { required: 'Store name is required' })}
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm -mt-3">{errors.name.message}</p>}

          {/* Email */}
          <div className="flex items-center border border-purple-300 rounded-lg px-4 py-2">
            <Mail className="text-purple-500 mr-2" />
            <input
              type="email"
              placeholder="Store Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email address',
                },
              })}
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm -mt-3">{errors.email.message}</p>}

          {/* Address */}
          <div className="flex items-center border border-purple-300 rounded-lg px-4 py-2">
            <MapPin className="text-purple-500 mr-2" />
            <input
              type="text"
              placeholder="Store Address"
              {...register('address', { required: 'Address is required' })}
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>
          {errors.address && <p className="text-red-500 text-sm -mt-3">{errors.address.message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition duration-300 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            {loading ? 'Submitting...' : 'Add Store'}
          </button>
        </form>

        {/* Response Messages */}
        {serverMsg && <p className="mt-4 text-green-600 text-center font-medium">{serverMsg}</p>}
        {errorMsg && <p className="mt-4 text-red-500 text-center font-medium">{errorMsg}</p>}
      </motion.div>
    </div>
  );
};

export default AddStore;
