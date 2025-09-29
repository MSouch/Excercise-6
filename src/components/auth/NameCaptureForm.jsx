import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth.jsx'
import SafeIcon from '../../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'

const { FiUser, FiArrowRight } = FiIcons

const NameCaptureForm = () => {
  const [formData, setFormData] = useState({
    fullName: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { registerUser } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const result = registerUser(formData.fullName.trim())
      if (result.data.user) {
        navigate('/dashboard')
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <img
          src="https://greta-preview.s3.us-east-2.amazonaws.com/assets/logo.svg"
          alt="APLS Logo"
          className="h-12 w-auto mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-900">Welcome to Project Manager Navigator</h2>
  <p className="text-gray-600">Enter your name to begin the training simulation</p>
      </div>

      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SafeIcon icon={FiUser} className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={`block w-full pl-10 pr-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.fullName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
              autoFocus
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            This name will appear on your completion certificate
          </p>
        </div>

        

        <button
          type="submit"
          disabled={loading || !formData.fullName.trim()}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <span>Start Training</span>
              <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          By continuing, you acknowledge that this is a training simulation and agree to complete the program.
        </p>
      </div>
    </motion.div>
  )
}

export default NameCaptureForm