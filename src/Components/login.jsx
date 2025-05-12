import React, { useState } from 'react';
import { Mail, User, Phone, MapPin } from 'lucide-react';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: ''
        }
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle nested address fields
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Validation logic remains the same as previous example
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
            newErrors.phoneNumber = 'Phone number must be 10 digits';
        }
        if (!formData.address.street.trim()) {
            newErrors.street = 'Street address is required';
        }
        if (!formData.address.city.trim()) {
            newErrors.city = 'City is required';
        }
        if (!formData.address.state.trim()) {
            newErrors.state = 'State is required';
        }
        if (!formData.address.zipCode.trim()) {
            newErrors.zipCode = 'Zip code is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Form submitted:', formData);
            alert('Form submitted successfully!');
        } else {
            console.log('Form has errors');
        }
    };

    const formatPhoneNumber = (value) => {
        const phoneNumber = value.replace(/\D/g, '');
        const formattedNumber = phoneNumber.replace(
            /(\d{3})(\d{3})(\d{4})/,
            '($1) $2-$3'
        );
        return formattedNumber;
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        const formattedValue = formatPhoneNumber(value);
        setFormData(prev => ({
            ...prev,
            phoneNumber: formattedValue
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Create Your Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="firstName" className="mb-2 text-sm font-medium text-gray-700">
                                First Name *
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Name"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="middleName" className="mb-2 text-sm font-medium text-gray-700">
                                Middle Name
                            </label>
                            <input
                                type="text"
                                id="middleName"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Middle Name"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="lastName" className="mb-2 text-sm font-medium text-gray-700">
                                Last Name *
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Last name"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    {/* Contact Information Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="abc@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="phoneNumber" className="mb-2 text-sm font-medium text-gray-700">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handlePhoneChange}
                                maxLength="14"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="(+91) 123-456-7890"
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                            )}
                        </div>
                    </div>

                    {/* Address Row */}
                    <div className="flex flex-col">
                        <label htmlFor="address.street" className="mb-2 text-sm font-medium text-gray-700">
                            Street Address *
                        </label>
                        <input
                            type="text"
                            id="address.street"
                            name="address.street"
                            value={formData.address.street}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Adress "
                        />
                        {errors.street && (
                            <p className="text-red-500 text-xs mt-1">{errors.street}</p>
                        )}
                    </div>

                    {/* City, State, Zip Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="address.city" className="mb-2 text-sm font-medium text-gray-700">
                                City *
                            </label>
                            <input
                                type="text"
                                id="address.city"
                                name="address.city"
                                value={formData.address.city}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Lucknow"
                            />
                            {errors.city && (
                                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="address.state" className="mb-2 text-sm font-medium text-gray-700">
                                State *
                            </label>
                            <input
                                type="text"
                                id="address.state"
                                name="address.state"
                                value={formData.address.state}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Uttar Pradesh"
                            />
                            {errors.state && (
                                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="address.zipCode" className="mb-2 text-sm font-medium text-gray-700">
                                Zip Code *
                            </label>
                            <input
                                type="text"
                                id="address.zipCode"
                                name="address.zipCode"
                                value={formData.address.zipCode}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="123456"
                            />
                            {errors.zipCode && (
                                <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                            )}
                        </div>
                    </div>
                    
                    {/* Terms and Conditions */}
                    <div className="flex items-center mt-4">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            className="mr-2"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            I agree to the <a href="/permission" className="text-red-500 underline">Terms and Conditions</a>
                        </label>
                    </div>
                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-base font-semibold"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;