'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface SchoolFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: FileList;
}

export default function AddSchool() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SchoolFormData>();

  const onSubmit = async (data: SchoolFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email_id', data.email_id);
      
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage({ type: 'success', text: 'School added successfully!' });
        reset();
        setTimeout(() => {
          router.push('/showSchools');
        }, 2000);
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Failed to add school' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'An error occurred while adding the school' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Add New School</h1>
              <p className="text-blue-100">Fill in the details to add a school to the database</p>
            </div>

            <div className="p-8">

              {submitMessage && (
                <div className={`mb-6 p-4 rounded-xl border-2 backdrop-blur-sm transition-all duration-300 ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-50/80 text-green-700 border-green-200 shadow-green-100/50' 
                    : 'bg-red-50/80 text-red-700 border-red-200 shadow-red-100/50'
                } shadow-lg`}>
                  <div className="flex items-center">
                    {submitMessage.type === 'success' ? (
                      <svg className="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                    {submitMessage.text}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* School Name */}
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-200">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      School Name *
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      {...register('name', { 
                        required: 'School name is required',
                        minLength: { value: 2, message: 'School name must be at least 2 characters' }
                      })}
                      className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 hover:border-gray-300"
                      placeholder="Enter school name"
                    />
                    {errors.name && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center animate-pulse">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.name.message}
                    </p>
                  )}
                </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <textarea
              id="address"
              rows={3}
              {...register('address', { 
                required: 'Address is required',
                minLength: { value: 10, message: 'Address must be at least 10 characters' }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter complete address"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                id="city"
                {...register('city', { 
                  required: 'City is required',
                  minLength: { value: 2, message: 'City must be at least 2 characters' }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter city"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                id="state"
                {...register('state', { 
                  required: 'State is required',
                  minLength: { value: 2, message: 'State must be at least 2 characters' }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter state"
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number *
            </label>
            <input
              type="tel"
              id="contact"
              {...register('contact', { 
                required: 'Contact number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Contact number must be exactly 10 digits'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter 10-digit contact number"
            />
            {errors.contact && (
              <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email_id" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email_id"
              {...register('email_id', { 
                required: 'Email address is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email address"
            />
            {errors.email_id && (
              <p className="mt-1 text-sm text-red-600">{errors.email_id.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              School Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register('image', {
                validate: {
                  fileType: (files) => {
                    if (!files || files.length === 0) return true;
                    const file = files[0];
                    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                    return validTypes.includes(file.type) || 'Please upload a valid image file (JPEG, PNG, GIF)';
                  },
                  fileSize: (files) => {
                    if (!files || files.length === 0) return true;
                    const file = files[0];
                    return file.size <= 5 * 1024 * 1024 || 'Image size must be less than 5MB';
                  }
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">Optional: Upload an image (JPEG, PNG, GIF, max 5MB)</p>
          </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Adding School...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Add School
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="pt-6 text-center border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => router.push('/showSchools')}
                    className="inline-flex items-center text-blue-600 hover:text-purple-600 text-sm font-medium transition-colors duration-200 group"
                  >
                    View All Schools
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
