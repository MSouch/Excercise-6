import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/common/Layout.jsx'
import { useProgress } from '../hooks/useProgress.jsx'
import { useAuth } from '../hooks/useAuth.jsx'
import SafeIcon from '../common/SafeIcon.jsx'
import * as FiIcons from 'react-icons/fi'
import { FaLinkedin, FaFacebook, FaXTwitter } from 'react-icons/fa6'
import apLogo from '../assets/AP-Networks-LearningSytems-Full-DivOf (6).png'
// Use dynamic import for jsPDF per requirements

const { FiAward, FiDownload, FiShare2, FiHome, FiTarget, FiTrendingUp } = FiIcons

const Conclusion = () => {
  const { user } = useAuth()
  const { progress } = useProgress()
  const [certificateUrl, setCertificateUrl] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [certificateGenerated, setCertificateGenerated] = useState(false)

  const calculateScoreLevel = () => {
    const { completedChallenges, totalChallenges } = progress
    if (completedChallenges === totalChallenges) return 'Expert'
    if (completedChallenges >= 3) return 'Proficient'
    if (completedChallenges >= 2) return 'Developing'
    return 'Needs Training'
  }

  const generateCertificate = async () => {
    console.log('Starting certificate generation...')
    setGenerating(true)
    
    try {
      console.log('Creating jsPDF instance...')
      const { jsPDF } = await import('jspdf')
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })
      
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      console.log('PDF dimensions:', { pageWidth, pageHeight })

      // Background
      pdf.setFillColor(248, 250, 252)
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')

      // Main Border
      pdf.setDrawColor(59, 130, 246)
      pdf.setLineWidth(2)
      pdf.rect(5, 5, pageWidth - 10, pageHeight - 10)

      // Header with logo (local asset)
      try {
        const img = new Image()
        img.src = apLogo
        await new Promise((resolve) => {
          img.onload = () => resolve()
          img.onerror = () => resolve()
        })
        // Place logo top-left (slightly larger)
        pdf.addImage(img, 'PNG', 14, 11, 44, 18)
      } catch (e) {
        console.warn('Logo not embedded:', e)
        // Fallback brand text at top-left
        pdf.setFontSize(10)
        pdf.setTextColor(59, 130, 246)
        pdf.setFont('helvetica', 'bold')
        pdf.text('AP-Learning Systems', 12, 18)
      }

      // Header
      pdf.setFontSize(28)
      pdf.setTextColor(59, 130, 246)
      pdf.setFont('helvetica', 'bold')
      pdf.text('CERTIFICATE OF COMPLETION', pageWidth / 2, 30, { align: 'center' })

      // Subtitle
      pdf.setFontSize(18)
      pdf.setTextColor(75, 85, 99)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Project Manager Navigator Training Simulation', pageWidth / 2, 45, { align: 'center' })

      // Achievement text
      pdf.setFontSize(16)
      pdf.setTextColor(17, 24, 39)
      pdf.text('This certifies that', pageWidth / 2, 65, { align: 'center' })

      // User name
      const userName = user?.full_name || user?.user_metadata?.full_name || user?.email || 'Participant'
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(17, 24, 39)
      pdf.text(userName, pageWidth / 2, 80, { align: 'center' })

      // Achievement description
      pdf.setFontSize(16)
      pdf.setTextColor(75, 85, 99)
      pdf.setFont('helvetica', 'normal')
      pdf.text('has successfully completed the Project Manager Navigator training simulation', pageWidth / 2, 100, { align: 'center' })
      pdf.text('and demonstrated mastery of PMI process group integration principles', pageWidth / 2, 115, { align: 'center' })

      // Score level
      pdf.setFontSize(20)
      pdf.setTextColor(34, 197, 94)
      pdf.setFont('helvetica', 'bold')
      pdf.text(`Achievement Level: ${calculateScoreLevel()}`, pageWidth / 2, 135, { align: 'center' })

      // Date
      pdf.setFontSize(14)
      pdf.setTextColor(107, 114, 128)
      pdf.setFont('helvetica', 'normal')
      const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      pdf.text(`Completed on ${date}`, pageWidth / 2, 155, { align: 'center' })

  // Company info
      pdf.setFontSize(16)
      pdf.setTextColor(59, 130, 246)
      pdf.setFont('helvetica', 'bold')
      pdf.text('AP-Learning Systems', pageWidth / 2, 175, { align: 'center' })

      // Division text
      pdf.setFontSize(12)
      pdf.setTextColor(107, 114, 128)
      pdf.setFont('helvetica', 'normal')
      pdf.text('A Division of AP-Networks LLC', pageWidth / 2, 185, { align: 'center' })

      // Completion Code - Updated to PMN0400
      pdf.setFontSize(10)
      pdf.setTextColor(107, 114, 128)
      pdf.text('Completion Code: PMN0400', 15, pageHeight - 20)

      // Certificate verification info
      const userEmail = user?.email || user?.user_metadata?.email || ''
      if (userEmail) {
        pdf.setFontSize(8)
        pdf.setTextColor(107, 114, 128)
        pdf.text(`Issued to: ${userEmail}`, pageWidth - 15, pageHeight - 30, { align: 'right' })
      }

      // Copyright
      pdf.setFontSize(8)
      pdf.setTextColor(107, 114, 128)
      pdf.text('© 2025 AP-Learning Systems, a Division of AP-Networks LLC - ALL RIGHTS RESERVED', pageWidth / 2, pageHeight - 10, { align: 'center' })

      console.log('PDF content generated successfully')

  // Save certificate
      const pdfBlob = pdf.output('blob')
      const url = URL.createObjectURL(pdfBlob)
      console.log('Certificate blob created:', { size: pdfBlob.size, type: pdfBlob.type })

      setCertificateUrl(url)
      setCertificateGenerated(true)

      // Save certificate info to localStorage
  const certificateData = {
        user_id: user?.id || 'unknown',
        user_email: userEmail,
        user_name: userName,
        certificate_code: 'PMN0400',
        score_level: calculateScoreLevel(),
        total_score: progress.overallScore,
        issued_at: new Date().toISOString(),
        url: url
      }
      localStorage.setItem('projectManagerNavigatorCertificate', JSON.stringify(certificateData))
      console.log('Certificate data saved to localStorage')

    } catch (error) {
      console.error('Error generating certificate:', error)
      alert('There was an error generating your certificate. Please try refreshing the page and trying again.')
    } finally {
      setGenerating(false)
    }
  }

  const downloadCertificate = () => {
    if (certificateUrl) {
      try {
        const userName = user?.full_name || user?.user_metadata?.full_name || 'Participant'
        const fileName = `Project-Manager-Navigator-Certificate-${userName.replace(/\s+/g, '-')}.pdf`
        
        const link = document.createElement('a')
        link.href = certificateUrl
        link.download = fileName
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        console.log('Certificate download initiated:', fileName)
      } catch (error) {
        console.error('Error downloading certificate:', error)
        alert('There was an error downloading your certificate. Please try again.')
      }
    } else {
      alert('Certificate not ready. Please wait for generation to complete.')
    }
  }

  // Check if user completed all challenges
  const allChallengesCompleted = progress.completedChallenges === progress.totalChallenges

  // Check for existing certificate in localStorage
  useEffect(() => {
    const existingCertificate = localStorage.getItem('projectManagerNavigatorCertificate')
    if (existingCertificate && allChallengesCompleted) {
      try {
        const certData = JSON.parse(existingCertificate)
        if (certData.user_id === user?.id && certData.url) {
          setCertificateUrl(certData.url)
          setCertificateGenerated(true)
          console.log('Loaded existing certificate from localStorage')
        }
      } catch (error) {
        console.error('Error loading existing certificate:', error)
      }
    }
  }, [user?.id, allChallengesCompleted])

  // Generate certificate when component mounts if all challenges are complete and no existing certificate
  useEffect(() => {
    console.log('Conclusion useEffect - Checking certificate generation conditions')
    console.log('All challenges completed:', allChallengesCompleted)
    console.log('Certificate generated:', certificateGenerated)
    console.log('Currently generating:', generating)
    console.log('User exists:', !!user)
    
    if (allChallengesCompleted && !certificateGenerated && !generating && user) {
      console.log('All conditions met - generating certificate...')
      // Add a small delay to ensure the component is fully mounted
      setTimeout(() => {
        generateCertificate()
      }, 500)
    }
  }, [allChallengesCompleted, certificateGenerated, generating, user])

  const performanceImpacts = [
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
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-success-50 to-primary-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiAward} className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Outstanding Achievement - Project Manager Navigator Expert!
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You've successfully completed Project Manager Navigator and proven your mastery of PMI process group integration. Your strategic approach demonstrates the advanced capabilities that distinguish expert project planners.
            </p>
          </motion.div>

          {/* Performance Impact */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your Project Management Integration Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {performanceImpacts.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
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
              {[
                { metric: '35%', label: 'Fewer scope changes during execution' },
                { metric: '25%', label: 'Improved schedule performance' },
                { metric: '40%', label: 'Better stakeholder satisfaction' },
                { metric: '50%', label: 'Reduced rework from better integration' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-primary-600" />
                  </div>
                  <p className="text-2xl font-bold text-primary-600 mb-1">{stat.metric}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certificate Section */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Certificate of Mastery
            </h2>
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary-500 to-success-500 rounded-lg p-6 text-white mb-6">
                <SafeIcon icon={FiAward} className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">Certified Project Manager Navigator Expert</h3>
                <p className="text-primary-100">
                  Achievement Level: {calculateScoreLevel()}
                </p>
                <p className="text-primary-100 text-sm">
                  Overall Score: {progress.overallScore}%
                </p>
                <p className="text-primary-100 text-sm mt-2">
                  Completion Code: PMN0400
                </p>
                {user?.email && (
                  <p className="text-primary-100 text-xs mt-2">
                    Issued to: {user.email}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {!allChallengesCompleted ? (
                  <div className="py-4">
                    <p className="text-gray-600 mb-4">Complete all 4 challenges to generate your certificate</p>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      <SafeIcon icon={FiHome} className="w-4 h-4" />
                      <span>Continue Training</span>
                    </Link>
                  </div>
                ) : generating ? (
                  <div className="flex items-center justify-center space-x-2 py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                    <span className="text-gray-600">Generating your certificate...</span>
                  </div>
                ) : certificateGenerated && certificateUrl ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-success-600 mb-4">
                      <SafeIcon icon={FiAward} className="w-5 h-5" />
                      <span className="font-medium">Certificate Ready!</span>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                      <button
                        onClick={downloadCertificate}
                        className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg"
                      >
                        <SafeIcon icon={FiDownload} className="w-4 h-4" />
                        <span>Download Certificate</span>
                      </button>
                      {/* Social Share Section */}
                      <div className="mt-6 pt-6 border-t border-gray-200 w-full">
                        <p className="text-sm font-medium text-gray-700 mb-3 text-center">Share your achievement:</p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-2 bg-[#1877F2] hover:bg-[#125ec0] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow"
                            aria-label="Share on Facebook"
                          >
                            <FaFacebook className="w-4 h-4" />
                            <span>Facebook</span>
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('I just completed the Project Manager Navigator training simulation and earned the Project Manager Navigator Expert certificate!')}&url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-2 bg:black bg-black hover:bg-neutral-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow"
                            aria-label="Share on X"
                          >
                            <FaXTwitter className="w-4 h-4" />
                            <span>X</span>
                          </a>
                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-2 bg-[#0A66C2] hover:bg-[#084f94] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow"
                            aria-label="Share on LinkedIn"
                          >
                            <FaLinkedin className="w-4 h-4" />
                            <span>LinkedIn</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : allChallengesCompleted ? (
                  <div className="py-4">
                    <button
                      onClick={generateCertificate}
                      disabled={generating}
                      className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
                    >
                      <SafeIcon icon={FiAward} className="w-4 h-4" />
                      <span>Generate Certificate</span>
                    </button>
                  </div>
                ) : null}
              </div>
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
                  <li>• Apply charter adequacy framework on your current project</li>
                  <li>• Implement one integrated planning workshop in the next 30 days</li>
                  <li>• Share PMI process group concepts with stakeholders</li>
                  <li>• Begin implementing EVM for better performance visibility</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Professional Development:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Pursue advanced EVM certification</li>
                  <li>• Explore PMI Planning Specialist Pathway</li>
                  <li>• Lead organizational integration improvement initiatives</li>
                  <li>• Explore other Navigator Series training modules</li>
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