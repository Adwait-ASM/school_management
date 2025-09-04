'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: number;
  image: string | null;
  email_id: string;
}

export default function ShowSchools() {
  const router = useRouter();
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let filtered = schools;

    if (searchTerm) {
      filtered = filtered.filter(school =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(school =>
        school.city.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    setFilteredSchools(filtered);
  }, [schools, searchTerm, selectedCity]);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/schools');
      const result = await response.json();

      if (result.success) {
        setSchools(result.data);
        setFilteredSchools(result.data);
      } else {
        setError('Failed to fetch schools');
      }
    } catch (error) {
      setError('An error occurred while fetching schools');
    } finally {
      setLoading(false);
    }
  };

  const uniqueCities = [...new Set(schools.map(school => school.city))].sort();

  const openModal = (school: School) => {
    setSelectedSchool(school);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSchool(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading schools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchSchools}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation */}
          <div className="mb-6">
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center text-blue-600 hover:text-purple-600 transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
          </div>

          <div className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-4 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      School Directory
                    </h1>
                    <p className="text-gray-600 mt-1">Browse and discover schools in your area</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.push('/addSchool')}
                  className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-5 h-5 mr-2 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New School
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search Schools
                    </span>
                  </label>
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                    placeholder="Search by name, address, city, or state..."
                  />
                </div>

                {/* City Filter */}
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Filter by City
                    </span>
                  </label>
                  <select
                    id="city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  >
                    <option value="">All Cities</option>
                    {uniqueCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results count */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-blue-600">{filteredSchools.length}</span> of{' '}
                  <span className="font-semibold">{schools.length}</span> schools
                </p>
                {(searchTerm || selectedCity) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCity('');
                    }}
                    className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {schools.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No schools found</h3>
            <p className="text-gray-600 mb-6">Get started by adding the first school to the directory.</p>
            <button
              onClick={() => router.push('/addSchool')}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
            >
              Add First School
            </button>
          </div>
        ) : filteredSchools.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No schools found</h3>
              <p className="text-gray-600 mb-6">
                No schools match your current search criteria. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCity('');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Schools Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              {filteredSchools.map((school, index) => (
                <div
                  key={school.id}
                  className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 transform hover:scale-105 hover:-translate-y-2 ${isLoaded ? 'animate-slideInUp' : 'opacity-0'}`}
                  style={{ 
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* School Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:opacity-0 transition-opacity duration-500"></div>
                    {school.image ? (
                      <Image
                        src={school.image}
                        alt={school.name}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                          <svg className="h-16 w-16 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* School Info */}
                  <div className="relative p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {school.name}
                      </h3>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start">
                        <svg className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="line-clamp-2">{school.address}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>{school.city}, {school.state}</span>
                      </div>
                    </div>

                    {/* Contact Info (Hidden on mobile, shown on hover/larger screens) */}
                    <div className="mt-4 pt-4 border-t border-gray-200 hidden sm:block">
                      <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center">
                          <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{school.contact}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="truncate">{school.email_id}</span>
                        </div>
                      </div>
                    </div>

                      {/* View Details Button */}
                      <div className="mt-6">
                        <button 
                          onClick={() => openModal(school)}
                          className="relative w-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 py-3 px-4 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all duration-300 text-sm font-semibold border border-blue-200 hover:border-blue-300 group/btn overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            <svg className="w-4 h-4 mr-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Details
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedSchool && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-center text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">{selectedSchool.name}</h2>
                <p className="text-blue-100">School Details</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* School Image */}
              {selectedSchool.image && (
                <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={selectedSchool.image}
                    alt={selectedSchool.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}

              {/* School Information */}
              <div className="space-y-6">
                {/* Address Section */}
                <div className="bg-gray-50/80 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Address
                  </h3>
                  <p className="text-gray-700 mb-2">{selectedSchool.address}</p>
                  <p className="text-gray-600">
                    <span className="font-medium">{selectedSchool.city}</span>, {selectedSchool.state}
                  </p>
                </div>

                {/* Contact Section */}
                <div className="bg-gray-50/80 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="font-medium">Phone:</span>
                      <span className="ml-2">{selectedSchool.contact}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">Email:</span>
                      <span className="ml-2">{selectedSchool.email_id}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-8 flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    router.push('/addSchool');
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
                >
                  Add New School
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
