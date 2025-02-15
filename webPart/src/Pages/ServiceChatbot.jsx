import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI('AIzaSyDqWpeErNqE79KalumA1dFaezG4wPmBTZw')
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

const departmentQuestions = {
  'jal-board': {
    en: [
      { id: 1, question: "What type of water supply issue are you facing?", options: ["No Water Supply", "Low Pressure", "Contaminated Water", "Water Leakage"] },
      { id: 2, question: "How long has this issue been occurring?", options: ["Today", "Few Days", "More than a week", "More than a month"] },
      { id: 3, question: "Please provide your complete address:", type: "text" },
      { id: 4, question: "Your name:", type: "text" },
      { id: 5, question: "Contact number:", type: "tel" },
      { id: 6, question: "Email (optional):", type: "email" },
      { id: 7, question: "Landmark near your location:", type: "text" },
      { id: 8, question: "Best time to visit for inspection:", options: ["Morning (9AM-12PM)", "Afternoon (12PM-3PM)", "Evening (3PM-6PM)"] },
      { id: 9, question: "Any previous complaint reference?", type: "text", optional: true },
      { id: 10, question: "Additional details about the issue:", type: "textarea" }
    ],
    hi: [
      { id: 1, question: "आप किस प्रकार की जल आपूर्ति समस्या का सामना कर रहे हैं?", options: ["पानी की आपूर्ति नहीं", "कम दबाव", "दूषित पानी", "पानी का रिसाव"] },
      { id: 2, question: "यह समस्या कब से हो रही है?", options: ["आज", "कुछ दिनों से", "एक सप्ताह से अधिक", "एक महीने से अधिक"] },
      { id: 3, question: "कृपया अपने पूरे पता बताएं:", type: "text" },
      { id: 4, question: "आपका नाम है:", type: "text" },
      { id: 5, question: "संपर्क नंबर:", type: "tel" },
      { id: 6, question: "ईमेल (वैकल्पिक):", type: "email" },
      { id: 7, question: "आपके स्थान के पास का लैंडमार्क:", type: "text" },
      { id: 8, question: "जाँच के लिए आपको कब यात्रा करनी चाहिए:", options: ["सुबह (9AM-12PM)", "दोपहर (12PM-3PM)", "शाम (3PM-6PM)"] },
      { id: 9, question: "क्या पिछली आयात का संदर्भ है?", type: "text", optional: true },
      { id: 10, question: "समस्या के बारे में कोई अतिरिक्त विवरण:", type: "textarea" }
    ]
  },
  // ... other departments
}

// Add district options
const districtOptions = {
  hi: [
    'लखनऊ', 'कानपुर', 'वाराणसी', 'प्रयागराज', 'आगरा', 
    'गोरखपुर', 'मेरठ', 'गाजियाबाद', 'नोएडा', 'बरेली'
  ],
  en: [
    'Lucknow', 'Kanpur', 'Varanasi', 'Prayagraj', 'Agra', 
    'Gorakhpur', 'Meerut', 'Ghaziabad', 'Noida', 'Bareilly'
  ]
}

const initialQuestions = {
  hi: [
    { 
      id: 'name', 
      question: 'कृपया अपना नाम बताएं:', 
      type: 'text',
      validation: (value) => value.length >= 3
    },
    { 
      id: 'phone', 
      question: 'अपना मोबाइल नंबर दर्ज करें:', 
      type: 'tel',
      validation: (value) => /^[0-9]{10}$/.test(value),
      placeholder: '10 अंकों का मोबाइल नंबर'
    },
    { 
      id: 'district', 
      question: 'अपना जिला चुनें:', 
      type: 'select',
      options: districtOptions.hi
    },
    { 
      id: 'pincode', 
      question: 'पिनकोड दर्ज करें:', 
      type: 'number',
      validation: (value) => /^[0-9]{6}$/.test(value),
      placeholder: '6 अंकों का पिनकोड'
    },
    { 
      id: 'address', 
      question: 'विस्तृत पता दर्ज करें:', 
      type: 'textarea',
      validation: (value) => value.length >= 10,
      placeholder: 'मकान नंबर, मोहल्ला, लैंडमार्क आदि'
    },
    { 
      id: 'issue', 
      question: 'समस्या का विवरण दें:', 
      type: 'select',
      options: [
        'पानी नहीं आ रहा है',
        'कम प्रेशर',
        'पानी की गुणवत्ता खराब है',
        'पाइप लीकेज',
        'अन्य समस्या'
      ]
    }
  ],
  en: [
    { id: 'name', question: 'Please enter your name:' },
    { id: 'phone', question: 'Enter your mobile number:' },
    { id: 'district', question: 'Select your district:' },
    { id: 'pincode', question: 'Enter pincode:' },
    { id: 'address', question: 'Enter detailed address:' },
    { id: 'issue', question: 'Describe your issue:' }
  ]
}

const determinePriority = async (issue) => {
  if (!issue) return 'medium';

  try {
    // Prompt for Gemini to analyze the issue
    const prompt = `
      Analyze this water-related issue and classify its priority as 'high', 'medium', or 'low'.
      
      Priority levels:
      - High: Issues affecting health (contamination, bad smell) or complete lack of water supply
      - Medium: Issues affecting water delivery (low pressure, leakage)
      - Low: General inquiries or minor issues
      
      Issue description: "${issue}"
      
      Respond with only one word: high, medium, or low
    `;

    const result = await model.generateContent(prompt);
    const priority = result.response.text.trim().toLowerCase();
    
    // Validate the response
    if (['high', 'medium', 'low'].includes(priority)) {
      return priority;
    }
    
    return 'medium'; // Default fallback
  } catch (error) {
    console.error('Error determining priority:', error);
    return 'medium'; // Default fallback on error
  }
}

function ServiceChatbot() {
  const chatEndRef = useRef(null)
  const [inputMessage, setInputMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const { departmentId } = useParams()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userResponses, setUserResponses] = useState({})
  const [isChatComplete, setIsChatComplete] = useState(false)
  const [language, setLanguage] = useState('hi') // Default to Hindi
  const [aiResponse, setAiResponse] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [complaintData, setComplaintData] = useState({
    issueType: null,
    duration: null,
    address: null,
    name: null,
    contact: null,
    email: null,
    landmark: null,
    preferredTime: null,
    previousReference: null,
    additionalDetails: null,
    complaintId: null,
    status: 'draft',
    severity: null,
    createdAt: null,
    lastUpdated: null,
    assignedTo: null,
    expectedResolutionTime: null,
    photos: []
  })
  const [inputError, setInputError] = useState('')

  const questions = departmentQuestions[departmentId]?.[language] || []

  useEffect(() => {
    // Reset chat when department or language changes
    setChatHistory([])
    setCurrentQuestionIndex(0)
    setUserResponses({})
    setIsChatComplete(false)
  }, [departmentId, language])

  const initialMessage = {
    hi: 'नमस्ते! मैं जल बोर्ड का AI सहायक हूं। आपकी क्या समस्या है?',
    en: 'Hello! I am the Jal Board AI Assistant. How may I help you?'
  }

  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: initialMessage.hi,
      options: [
        { hi: 'पानी नहीं आ रहा है', en: 'No Water Supply' },
        { hi: 'कम प्रेशर', en: 'Low Pressure' },
        { hi: 'पानी की गुणवत्ता खराब है', en: 'Poor Water Quality' },
        { hi: 'पाइप लीकेज', en: 'Pipe Leakage' },
        { hi: 'अन्य समस्या', en: 'Other Issue' }
      ]
    }
  ])

  const generateComplaintId = () => {
    const prefix = '52';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let id = prefix;
    
    // Add 2 random letters
    for (let i = 0; i < 2; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Add 2 random numbers
    for (let i = 0; i < 2; i++) {
      id += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    // Add 3 more random chars
    for (let i = 0; i < 3; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return id;
  }

  const validateInput = (value) => {
    const currentQuestion = initialQuestions[language][currentQuestionIndex]
    if (!currentQuestion.validation) return true
    return currentQuestion.validation(value)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputMessage(value)
    setInputError('')
  }

  const handleUserResponse = async (response) => {
    if (!validateInput(response)) {
      setInputError(language === 'hi' 
        ? 'कृपया सही जानकारी दर्ज करें'
        : 'Please enter valid information'
      )
      return
    }

    setIsProcessing(true)
    setInputError('')
    
    // Save user's response
    setUserResponses(prev => ({
      ...prev,
      [initialQuestions[language][currentQuestionIndex].id]: response
    }))

    // Clear input after saving
    setInputMessage('')

    // Add user's response to chat
    setMessages(prev => [...prev, {
      type: 'user',
      content: response
    }])

    // If all questions are answered, generate complaint
    if (currentQuestionIndex === initialQuestions[language].length - 1) {
      const complaintId = generateComplaintId()
      const timestamp = new Date().toISOString()
      
      // Get priority using AI for the issue description
      const priority = await determinePriority(userResponses.issue)
      
      // Create detailed complaint object
      const complaintDetails = {
        complaintId,
        ...userResponses,
        timestamp,
        status: 'registered',
        expectedResponse: '48 hours',
        priority
      }
      
      // Log complete complaint details
      console.log('New Complaint:', complaintDetails)

      // Show success message
      setMessages(prev => [...prev, {
        type: 'success',
        content: {
          title: language === 'hi' ? 'शिकायत सफलतापूर्वक दर्ज की गई!' : 'Complaint Filed Successfully!',
          complaintId,
          subtitle: language === 'hi' 
            ? `कृपया भविष्य में संदर्भ के लिए यह ID सहेज लें\nअनुमानित प्रतिक्रिया समय: 48 घंटे`
            : `Please save this ID for future reference\nExpected response time: 48 hours`
        }
      }])

      setIsChatComplete(true)
    } else {
      // Show next question
      setCurrentQuestionIndex(prev => prev + 1)
      setMessages(prev => [...prev, {
        type: 'bot',
        content: initialQuestions[language][currentQuestionIndex + 1].question
      }])
    }

    setIsProcessing(false)
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Add image upload handler
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    const imageUrls = files.map(file => URL.createObjectURL(file))
    
    setComplaintData(prev => ({
      ...prev,
      photos: [...prev.photos, ...imageUrls]
    }))
  }

  // Add new success message component
  const SuccessMessage = ({ content }) => (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm">
      <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold mb-2">{content.title}</h2>
      <p className="text-gray-600 mb-4">Your complaint ID is: <span className="font-mono font-bold">{content.complaintId}</span></p>
      <p className="text-sm text-gray-500">{content.subtitle}</p>
    </div>
  )

  // New Chat Button Component
  const NewChatButton = () => (
    <button
      onClick={() => {
        setMessages([{
          type: 'bot',
          content: initialQuestions[language][0].question
        }])
        setCurrentQuestionIndex(0)
        setUserResponses({})
        setIsChatComplete(false)
      }}
      className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 
                 transition-colors flex items-center space-x-2"
    >
      <span>{language === 'hi' ? 'नई शिकायत दर्ज करें' : 'File New Complaint'}</span>
    </button>
  )

  // Input component based on question type
  const InputField = () => {
    const currentQuestion = initialQuestions[language][currentQuestionIndex]

    switch (currentQuestion.type) {
      case 'select':
        return (
          <div className="relative">
            <select
              value={inputMessage}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 
                       focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                       text-gray-700 appearance-none"
            >
              <option value="">{language === 'hi' ? 'चुनें' : 'Select'}</option>
              {currentQuestion.options.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )

      case 'textarea':
        return (
          <textarea
            value={inputMessage}
            onChange={handleInputChange}
            placeholder={currentQuestion.placeholder}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 
                     focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                     placeholder-gray-400 text-gray-700"
          />
        )

      default:
        return (
          <input
            type={currentQuestion.type}
            value={inputMessage}
            onChange={handleInputChange}
            placeholder={currentQuestion.placeholder}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 
                     focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                     placeholder-gray-400 text-gray-700"
          />
        )
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-100px)]">
      {/* Language Selector */}
      <div className="mb-4 flex justify-end">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          <option value="hi">हिंदी</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-lg h-full flex flex-col">
        {/* Chat Header */}
        <div className="bg-yellow-500 p-6 rounded-t-xl">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl">💧</span>
            </div>
            <div>
              <h2 className="text-white text-xl font-semibold">
                {language === 'hi' ? 'सेवा सहायक' : 'Service Assistant'}
              </h2>
              <p className="text-yellow-100">
                {language === 'hi' ? 'ऑनलाइन | तुरंत प्रतिक्रिया' : 'Online | Quick Response'}
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
          {messages.map((message, index) => (
            <div key={index} 
                 className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'success' ? (
                <SuccessMessage content={message.content} />
              ) : (
                <>
                  {message.type === 'bot' && (
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex-shrink-0 mr-3 
                                  flex items-center justify-center">
                      <span className="text-white text-sm">🤖</span>
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    message.type === 'user' 
                      ? 'bg-yellow-500 text-white ml-4' 
                      : 'bg-white border border-gray-100'
                  }`}>
                    <p className={message.type === 'user' ? 'text-white' : 'text-gray-800'}>
                      {message.content}
                    </p>
                    {message.options && (
                      <div className="mt-4 space-y-2">
                        {message.options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleUserResponse(option[language])}
                            className="w-full text-left px-4 py-3 rounded-xl 
                                     bg-gray-50 hover:bg-yellow-50 
                                     text-gray-700 hover:text-yellow-700
                                     border border-gray-200 hover:border-yellow-200
                                     transition-all duration-200 ease-in-out"
                          >
                            {option[language]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
          {isProcessing && (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" 
                   style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" 
                   style={{ animationDelay: '0.4s' }}></div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        {!isChatComplete && questions[currentQuestionIndex] && (
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center space-x-4">
              {questions[currentQuestionIndex].type === 'select' ? (
                <select
                  value={inputMessage}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 
                           focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                           text-gray-700"
                >
                  <option value="">{language === 'hi' ? 'चुनें' : 'Select'}</option>
                  {questions[currentQuestionIndex].options?.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={questions[currentQuestionIndex].type || 'text'}
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleUserResponse(inputMessage)}
                  placeholder={questions[currentQuestionIndex].question}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 
                           focus:ring-2 focus:ring-yellow-500 focus:border-transparent
                           placeholder-gray-400 text-gray-700"
                />
              )}

              <button
                onClick={() => handleUserResponse(inputMessage)}
                disabled={isProcessing || !inputMessage.trim()}
                className="px-6 py-3 bg-yellow-500 text-white rounded-xl
                         hover:bg-yellow-600 transition-colors flex items-center space-x-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{language === 'hi' ? 'भेजें' : 'Send'}</span>
              </button>
            </div>
            {inputError && (
              <p className="text-red-500 text-sm mt-2">{inputError}</p>
            )}
          </div>
        )}

        {isChatComplete && (
          <div className="p-4 bg-white border-t border-gray-100 flex justify-center">
            <NewChatButton />
          </div>
        )}
      </div>

      {/* Display uploaded images */}
      {complaintData.photos.length > 0 && (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {complaintData.photos.map((url, idx) => (
            <img key={idx} src={url} alt="Uploaded" className="h-16 w-16 object-cover rounded" />
          ))}
        </div>
      )}
    </div>
  )
}

export default ServiceChatbot