import React,{useState} from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import {motion} from 'framer-motion'
import {useAuth} from '../../hooks/useAuth.jsx'
import SafeIcon from '../../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'

const { FiUser, FiArrowRight } = FiIcons

const LoginForm = () => {
  const [fullName, setFullName] = useState('')
  const [loading,setLoading] = useState(false)
  const { registerUser, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const from = location.state?.from?.pathname || '/dashboard'

  const handleInputChange = (value) => setFullName(value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const result = registerUser(fullName.trim())
    if (result?.data?.user) {
      navigate(from,{replace: true})
    }
    
    setLoading(false)
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      initial={{opacity: 0,y: 20}}
      animate={{opacity: 1,y: 0}}
      transition={{duration: 0.3}}
    >
      <div className="text-center mb-8">
        <img 
          src="https://greta-preview.s3.us-east-2.amazonaws.com/assets/logo.svg" 
          alt="APLS Logo" 
          className="h-12 w-auto mx-auto mb-4" 
        />
  <h2 className="text-2xl font-bold text-gray-900">Start Simulation</h2>
  <p className="text-gray-600">Enter your name to begin</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
          <p className="text-sm text-red-600">{error}</p>
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
              value={fullName}
              onChange={(e) => handleInputChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !fullName.trim()}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Starting…' : 'Start Simulation'}
        </button>
      </form>

    </motion.div>
  )
}

export default LoginForm