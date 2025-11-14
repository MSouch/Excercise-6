import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/common/Layout.jsx'
import { useProgress } from '../hooks/useProgress.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import SafeIcon from '../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'
import { FaLinkedin, FaFacebook, FaXTwitter, FaCopy, FaCheck, FaArrowDown, FaArrowUp } from 'react-icons/fa6'
import medallionImage from '../assets/APLS-Medallion-2025_PM.png'

const { FiShield, FiTarget, FiHome, FiDownload } = FiIcons

// Simulation-specific configuration
const SIMULATION_CONFIG = {
  name: 'Project Manager Navigator',
  credentialTitle: 'Certified Project Manager Navigator Expert',
  programName: 'Project Manager Navigator Training Simulation',
  completionCode: 'PMN0400',
  medallionImage: medallionImage,
  
  shareText: {
    message: 'I just completed the Project Manager Navigator simulation and earned the Project Manager Navigator Expert certificate!',
    hashtags: '#ProjectManagement #PMI #ProfessionalDevelopment',
    url: 'https://ap-networks.com/learning-systems'
  },
  
  performanceImpacts: [
    {
      challenge: 'Challenge 1',
      impact: 'Distinguished between PMI Process Groups and industrial phases, enabling stakeholder understanding of integrated planning approaches'
    },
    {
      challenge: 'Challenge 2',
      impact: 'Leveraged charter clarification to establish clear planning parameters and strengthen project foundation'
    },
    {
      challenge: 'Challenge 3',
      impact: 'Implemented integrated planning workshops to coordinate multiple functions and eliminate execution disconnects'
    },
    {
      challenge: 'Challenge 4',
      impact: 'Established EVM systems providing objective, integrated performance visibility across all project dimensions'
    }
  ],
  
  successStatistics: {
    introText: 'Organizations implementing project management integration approaches like yours report:',
    metrics: [
      { metric: '35%', label: 'Fewer scope changes during execution', direction: 'down' },
      { metric: '25%', label: 'Improved schedule performance', direction: 'up' },
      { metric: '40%', label: 'Better stakeholder satisfaction', direction: 'up' },
      { metric: '50%', label: 'Reduced rework from better integration', direction: 'down' }
    ]
  },
  
  nextSteps: {
    immediateActions: [
      'Apply charter adequacy framework on your current project',
      'Implement one integrated planning workshop in the next 30 days',
      'Share PMI process group concepts with stakeholders',
      'Begin implementing EVM for better performance visibility'
    ],
    continueLinks: [
      'Pursue advanced EVM certification',
      'Explore PMI Planning Specialist Pathway',
      'Lead organizational integration improvement initiatives',
      'Explore other Navigator Series training modules'
    ]
  }
}

const Conclusion = () => {
  const { user } = useAuth()
  const { progress } = useProgress()
  const [credentialId, setCredentialId] = useState(null)
  const [copiedShareText, setCopiedShareText] = useState(false)

  const calculateScoreLevel = () => {
    const { completedChallenges = 0, totalChallenges = 4 } = progress || {}
    if (completedChallenges === totalChallenges) return 'Expert'
    if (completedChallenges >= 3) return 'Proficient'
    if (completedChallenges >= 2) return 'Developing'
    return 'Needs Training'
  }

  const generateCredentialId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const copyShareText = async () => {
    const shareText = `${SIMULATION_CONFIG.shareText.message}\n\n${SIMULATION_CONFIG.shareText.hashtags}`
    try {
      await navigator.clipboard.writeText(shareText)
      setCopiedShareText(true)
      setTimeout(() => setCopiedShareText(false), 2000)
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = shareText
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopiedShareText(true)
        setTimeout(() => setCopiedShareText(false), 2000)
      } catch (e) {
        console.error('Failed to copy text:', e)
        alert('Share text:\n\n' + shareText)
      }
      document.body.removeChild(textArea)
    }
  }

  const downloadMedallion = () => {
    try {
      const link = document.createElement('a')
      link.href = SIMULATION_CONFIG.medallionImage
      link.download = `APLS-${SIMULATION_CONFIG.name.replace(/\s+/g, '-')}-Medallion.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (e) {
      console.error('Error downloading medallion', e)
    }
  }

  useEffect(() => {
    if (!progress) return
    const completed = progress.completedChallenges || 0
    const total = progress.totalChallenges || 4

    if (completed === total && !credentialId) {
      const stored = localStorage.getItem('projectManagerNavigatorCredential')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (parsed?.credential_id) {
            setCredentialId(parsed.credential_id)
            return
          }
        } catch (e) {
          // ignore and create new
        }
      }

      const newId = generateCredentialId()
      setCredentialId(newId)

      const userName = user?.full_name || user?.user_metadata?.full_name || 'Participant'
      const payload = {
        user_id: user?.id || 'anonymous',
        user_name: userName,
        credential_id: newId,
        score_level: calculateScoreLevel(),
        total_score: progress.overallScore || 0,
        issued_at: new Date().toISOString()
      }

      try {
        localStorage.setItem('projectManagerNavigatorCredential', JSON.stringify(payload))
      } catch (e) {
        console.warn('Could not persist credential to localStorage', e)
      }
    }
  }, [progress, credentialId, user])

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-success-50 to-primary-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiShield} className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Digital Simulation Expert Credential Awarded</h1>
            <p className="text-lg text-gray-600">{SIMULATION_CONFIG.programName}</p>
          </motion.div>

          {/* Grand Medallion Card */}
          <motion.div 
            className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden mb-8 shadow-2xl"
            style={{ borderWidth: '6px', borderStyle: 'solid', borderImage: 'linear-gradient(135deg, #005397 0%, #0077be 100%) 1' }}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#005397]"></div>
              <div className="absolute top-0 left-0 w-1 h-full bg-[#005397]"></div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <div className="absolute top-0 right-0 w-full h-1 bg-[#005397]"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-[#005397]"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#005397]"></div>
              <div className="absolute bottom-0 left-0 w-1 h-full bg-[#005397]"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
              <div className="absolute bottom-0 right-0 w-full h-1 bg-[#005397]"></div>
              <div className="absolute bottom-0 right-0 w-1 h-full bg-[#005397]"></div>
            </div>

            <div className="relative p-12 text-center">
              {/* Medallion Image */}
              <div className="inline-block mb-8 relative">
                <div className="absolute inset-0 bg-[#005397] opacity-10 rounded-full blur-2xl scale-110"></div>
                <img src={SIMULATION_CONFIG.medallionImage} alt={`${SIMULATION_CONFIG.name} Medallion`} className="relative w-64 h-64 mx-auto drop-shadow-2xl" />
              </div>

              {/* Title & Name */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-[#005397] mb-3">{SIMULATION_CONFIG.credentialTitle}</h3>
                <p className="text-xl text-gray-700 font-semibold">{user?.full_name || user?.user_metadata?.full_name || 'Participant'}</p>
              </div>

              {/* Download Button */}
              <div className="mb-8">
                <button 
                  onClick={downloadMedallion} 
                  className="inline-flex items-center space-x-2 bg-[#005397] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#003d73] transition-all transform hover:scale-105 shadow-lg"
                >
                  <SafeIcon icon={FiDownload} className="w-5 h-5" />
                  <span>Download Medallion</span>
                </button>
              </div>

              {/* Credential Details Section */}
              <div className="border-t-2 border-[#005397] pt-8 mb-8">
                <h4 className="text-xl font-bold text-[#005397] mb-6 flex items-center justify-center">
                  <SafeIcon icon={FiShield} className="w-5 h-5 mr-2" />
                  Credential Details
                </h4>
                <div className="max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <span className="text-sm text-gray-600 block mb-1">Credential Name</span>
                      <span className="font-semibold text-gray-900">{SIMULATION_CONFIG.name}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <span className="text-sm text-gray-600 block mb-1">Issued By</span>
                      <span className="font-semibold text-gray-900">AP-Learning Systems</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <span className="text-sm text-gray-600 block mb-1">Issue Date</span>
                      <span className="font-semibold text-gray-900">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <span className="text-sm text-gray-600 block mb-1">Achievement Level</span>
                      <span className="font-semibold text-[#005397]">{calculateScoreLevel()}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 md:col-span-2">
                      <span className="text-sm text-gray-600 block mb-1">Overall Score</span>
                      <span className="font-semibold text-[#005397] text-xl">{progress?.overallScore || 0}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="border-t-2 border-[#005397] pt-8">
                <h4 className="text-xl font-bold text-[#005397] mb-4">Share Your Achievement</h4>
                <p className="text-gray-600 text-sm mb-6">Showcase your professional credential on social media</p>
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  {(() => {
                    const shareUrl = encodeURIComponent(SIMULATION_CONFIG.shareText.url)
                    const shareText = encodeURIComponent(`${SIMULATION_CONFIG.shareText.message}\n\n${SIMULATION_CONFIG.shareText.hashtags}`)
                    const platforms = [
                      { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, bg: 'bg-[#0A66C2] hover:bg-[#084f94]', icon: FaLinkedin },
                      { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, bg: 'bg-[#1877F2] hover:bg-[#125ec0]', icon: FaFacebook },
                      { name: 'X', href: `https://twitter.com/intent/tweet?text=${shareText}`, bg: 'bg-black hover:bg-neutral-700', icon: FaXTwitter }
                    ]
                    return platforms.map(p => (
                      <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center space-x-2 ${p.bg} text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all transform hover:scale-105 shadow-lg`}>
                        <p.icon className="w-4 h-4" />
                        <span>{p.name}</span>
                      </a>
                    ))
                  })()}
                </div>
                <button 
                  type="button" 
                  onClick={copyShareText} 
                  className="w-full max-w-md mx-auto bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 shadow"
                >
                  {copiedShareText ? (<><FaCheck className="w-4 h-4 text-green-600" /><span>Copied!</span></>) : (<><FaCopy className="w-4 h-4" /><span>Copy Share Text</span></>)}
                </button>
                <p className="text-xs text-gray-500 mt-4"><strong>Tip:</strong> Add this credential to your LinkedIn profile under "Licenses & Certifications"</p>
              </div>
            </div>
          </motion.div>

          {/* Performance Impact */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your Performance Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SIMULATION_CONFIG.performanceImpacts.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                >
                  <div className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <SafeIcon icon={FiTarget} className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.challenge}</h3>
                    <p className="text-gray-600 text-sm">{item.impact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Success Statistics */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Industry Impact - Your Skills Create Measurable Value
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Organizations implementing project management integration approaches like yours report:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SIMULATION_CONFIG.successStatistics.metrics.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${stat.direction === 'down' ? 'bg-success-100' : 'bg-primary-100'}`}>
                    {stat.direction === 'down' ? (
                      <FaArrowDown className="w-6 h-6 text-green-600" />
                    ) : (
                      <FaArrowUp className="w-6 h-6 text-primary-600" />
                    )}
                  </div>
                  <p className={`text-2xl font-bold mb-1 ${stat.direction === 'down' ? 'text-green-600' : 'text-primary-600'}`}>{stat.metric}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Next Steps for Continued Excellence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Immediate Implementation:</h3>
                <ul className="space-y-2 text-gray-600">
                  {SIMULATION_CONFIG.nextSteps.immediateActions.map((action, index) => (
                    <li key={index}>• {action}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Professional Development:</h3>
                <ul className="space-y-2 text-gray-600">
                  {SIMULATION_CONFIG.nextSteps.continueLinks.map((link, index) => (
                    <li key={index}>• {link}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiHome} className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default Conclusion