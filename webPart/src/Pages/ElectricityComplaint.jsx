import { useState } from 'react'
import { FaBolt, FaUserAlt, FaMapMarkerAlt, FaFileAlt, FaCamera } from 'react-icons/fa'
import { MdDescription, MdAccessTimeFilled, MdPriorityHigh } from 'react-icons/md'
import { BiSolidFileDoc } from 'react-icons/bi'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyDqWpeErNqE79KalumA1dFaezG4wPmBTZw')
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

const determinePriority = async (issueType, issueDetails) => {
  if (!issueType || !issueDetails) {
    throw new Error('Issue type and details are required');
  }

  try {
    const prompt = `
      As an electrical utility expert, analyze this electricity-related issue and classify its priority as 'high', 'medium', or 'low'.
      
      Issue Type: ${issueType}
      Detailed Description: ${issueDetails}
      
      Classification Rules:
      HIGH priority if:
      - Complete power outage affecting multiple households
      - Live wire/electrical hazards
      - Transformer sparking or burning
      - Electric shock incidents
      - Fire hazards
      - Power fluctuations causing equipment damage
      - Major infrastructure damage
      
      MEDIUM priority if:
      - Localized power outage (single household)
      - Voltage fluctuations without damage
      - Frequent circuit trips
      - Meter malfunctions
      - Street light issues
      - Minor electrical repairs
      - Loose connections
      
      LOW priority if:
      - Billing inquiries
      - New connection requests
      - General information requests
      - Scheduled maintenance queries
      - Future service modifications
      - Documentation updates
      
      Based on the above criteria, respond with exactly one word (high/medium/low):
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const priority = response.text().trim().toLowerCase();
    
    // Ensure valid priority value
    if (!['high', 'medium', 'low'].includes(priority)) {
      console.error('Invalid priority response from AI:', priority);
      throw new Error('Could not determine priority level');
    }
    
    return priority;
  } catch (error) {
    console.error('Error determining priority:', error);
    throw error; // Propagate the error instead of defaulting to medium
  }
}

function ElectricityComplaint() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    district: '',
    pincode: '',
    landmark: '',
    consumerNumber: '',
    meterNumber: '',
    issueType: '',
    issueDetails: '',
    duration: '',
    preferredTime: '',
    previousComplaint: '',
    idProofType: '',
    idProofNumber: '',
    photos: [],
    idProofFile: null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (name === 'photos') {
      setFormData(prev => ({ 
        ...prev, 
        photos: [...prev.photos, ...Array.from(files)]
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: files[0] }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Valid 10-digit phone number is required'
    if (!formData.consumerNumber.trim()) newErrors.consumerNumber = 'Consumer number is required'
    if (!formData.meterNumber.trim()) newErrors.meterNumber = 'Meter number is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.issueType) newErrors.issueType = 'Issue type is required'
    if (!formData.issueDetails.trim()) newErrors.issueDetails = 'Issue details are required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      // Get priority using AI
      const priority = await determinePriority(formData.issueType, formData.issueDetails);
      
      // Create complaint object
      const complaintData = {
        ...formData,
        complaintId: `ELEC-${Date.now()}`,
        priority,
        status: 'registered',
        timestamp: new Date().toISOString(),
        expectedResponse: priority === 'high' ? '4 hours' : priority === 'medium' ? '12 hours' : '24 hours'
      };
  
      console.log('New Complaint:', complaintData);
      alert(`Complaint registered successfully!\nComplaint ID: ${complaintData.complaintId}`);
  
      // Reset form
      setFormData({
        ...formData,
        // ... reset other fields
      });
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Error determining complaint priority. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50 p-6">
      {/* Lightning Animation Background */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-[url('/lightning-pattern.png')] bg-repeat animate-pulse-slow"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Smart Assistant Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 border border-yellow-100 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">AI Assistant</h2>
              <p className="text-sm text-gray-600">
                I'll help analyze your electrical issue and prioritize it based on severity
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-yellow-100">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <FaBolt className="text-3xl text-yellow-500" />
              </div>
              <div>
                <h1 className="text-white text-2xl font-semibold">Electricity Complaint</h1>
                <p className="text-yellow-100">UP Power Corporation | Smart Complaint System</p>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">District *</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    <option value="">Select District</option>
                    <option value="lucknow">Lucknow</option>
                    <option value="kanpur">Kanpur</option>
                    <option value="varanasi">Varanasi</option>
                    {/* Add more districts */}
                  </select>
                  {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                </div>
              </div>
            </div>

            {/* Consumer Details Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Consumer Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Consumer Number *</label>
                  <input
                    type="text"
                    name="consumerNumber"
                    value={formData.consumerNumber}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                  {errors.consumerNumber && <p className="text-red-500 text-sm mt-1">{errors.consumerNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Meter Number *</label>
                  <input
                    type="text"
                    name="meterNumber"
                    value={formData.meterNumber}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                  {errors.meterNumber && <p className="text-red-500 text-sm mt-1">{errors.meterNumber}</p>}
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Address Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Complete Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                  {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Landmark</label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
            </div>


            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Issue Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type of Issue *</label>
                  <select
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    <option value="">Select Issue Type</option>
                    <option value="Power Outage">Power Outage</option>
                    <option value="Voltage Fluctuation">Voltage Fluctuation</option>
                    <option value="Meter Issues">Meter Issues</option>
                    <option value="Billing Problem">Billing Problem</option>
                    <option value="Electrical Hazard">Electrical Hazard</option>
                    <option value="Connection Issue">Connection Issue</option>
                  </select>
                  {errors.issueType && <p className="text-red-500 text-sm mt-1">{errors.issueType}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration of Issue *</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    <option value="">Select Duration</option>
                    <option value="Currently">Currently</option>
                    <option value="Few Hours">Few Hours</option>
                    <option value="Today">Today</option>
                    <option value="Few Days">Few Days</option>
                    <option value="More than a week">More than a week</option>
                  </select>
                  {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Detailed Description *</label>
                  <textarea
                    name="issueDetails"
                    value={formData.issueDetails}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    placeholder="Please provide detailed information about the electrical issue..."
                    required
                  />
                  {errors.issueDetails && <p className="text-red-500 text-sm mt-1">{errors.issueDetails}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Preferred Inspection Time</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">Select Time Slot</option>
                    <option value="Morning (9AM-12PM)">Morning (9AM-12PM)</option>
                    <option value="Afternoon (12PM-3PM)">Afternoon (12PM-3PM)</option>
                    <option value="Evening (3PM-6PM)">Evening (3PM-6PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Previous Complaint Reference</label>
                  <input
                    type="text"
                    name="previousComplaint"
                    value={formData.previousComplaint}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    placeholder="If any"
                  />
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Required Documents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">ID Proof Type *</label>
                  <select
                    name="idProofType"
                    value={formData.idProofType}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    required
                  >
                    <option value="">Select ID Proof</option>
                    <option value="Aadhar">Aadhar Card</option>
                    <option value="Voter">Voter ID</option>
                    <option value="Driving">Driving License</option>
                    <option value="Passport">Passport</option>
                  </select>
                  {errors.idProofType && <p className="text-red-500 text-sm mt-1">{errors.idProofType}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">ID Proof Number *</label>
                  <input
                    type="text"
                    name="idProofNumber"
                    value={formData.idProofNumber}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                  {errors.idProofNumber && <p className="text-red-500 text-sm mt-1">{errors.idProofNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload ID Proof *</label>
                  <input
                    type="file"
                    name="idProofFile"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="mt-1 w-full"
                    required
                  />
                  {errors.idProofFile && <p className="text-red-500 text-sm mt-1">{errors.idProofFile}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Issue Photos</label>
                  <input
                    type="file"
                    name="photos"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="mt-1 w-full"
                  />
                  <p className="text-sm text-gray-500 mt-1">You can upload multiple photos</p>
                </div>
              </div>
            </div>

            {/* Safety Alert Section */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-red-600 mb-2">
                <MdPriorityHigh className="text-xl" />
                <h3 className="font-semibold">Safety First!</h3>
              </div>
              <p className="text-sm text-red-600">
                If you notice any exposed wires or immediate electrical hazards, 
                please maintain a safe distance and contact our emergency helpline immediately at 1912.
              </p>
            </div>

  
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 
                         transition-colors duration-200 flex items-center space-x-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Submit Complaint</span>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-100">
            <div className="flex items-center space-x-3 text-yellow-600 mb-2">
              <FaBolt className="text-xl" />
              <h3 className="font-semibold">24/7 Response</h3>
            </div>
            <p className="text-sm text-gray-600">
              Round-the-clock monitoring for critical electrical issues
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-100">
            <div className="flex items-center space-x-3 text-yellow-600 mb-2">
              <MdAccessTimeFilled className="text-xl" />
              <h3 className="font-semibold">Quick Resolution</h3>
            </div>
            <p className="text-sm text-gray-600">
              Priority-based handling of complaints for faster resolution
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-100">
            <div className="flex items-center space-x-3 text-yellow-600 mb-2">
              <FaFileAlt className="text-xl" />
              <h3 className="font-semibold">Smart Tracking</h3>
            </div>
            <p className="text-sm text-gray-600">
              Real-time updates on your complaint status
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ElectricityComplaint