import React from 'react';

const ContactCard = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-4xl font-bold text-gray-800">Contact Us</div>
        <div className="text-3xl font-bold text-yellow-500">IGRS</div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Address Section */}
          <div className="flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Our Location</h3>
              <p className="text-gray-600">Lok Bhawan, Lucknow</p>
              <p className="text-gray-600">Uttar Pradesh, India</p>
            </div>
          </div>

          {/* Email Section */}
          <div className="flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
              <a href="mailto:jansunwai-up@gov.in" className="text-yellow-600 hover:text-yellow-700">test@123.com</a>
              <p className="text-sm text-gray-500 mt-1">(For Technical Issues only)</p>
            </div>
          </div>

          {/* Website Section */}
          <div className="flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Website</h3>
              <a href="/" className="text-yellow-600 hover:text-yellow-700">websitelink</a>
            </div>
          </div>

          {/* Information Box */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-6">
            <p className="text-gray-700 mb-2">
              This portal has been created to register complaints. Please send mails to the above email-id only for technical problems.
            </p>
            <p className="text-red-500 font-medium text-sm">
              (Please do not send your complaint letter to this email, there will be no action on these letters)
            </p>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative h-full">
          <div 
            className="absolute top-4 left-4 z-10 bg-white px-4 py-2 rounded-full shadow-lg border border-yellow-200 cursor-pointer transform hover:scale-105 transition-transform"
            onClick={() => {
              const lokBhawanCoords = { lat: 26.8741, lng: 80.9355 }; // Lok Bhawan coordinates
              window.open(`https://www.google.com/maps?q=${lokBhawanCoords.lat},${lokBhawanCoords.lng}&z=18`, '_blank');
            }}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-yellow-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-700 font-medium">Lok Bhawan</span>
            </div>
          </div>
          <iframe
            className="w-full h-full min-h-[400px] rounded-xl shadow-lg border-2 border-yellow-200"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.8977685644392!2d80.93296597620669!3d26.874076476938794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLok%20Bhawan!5e0!3m2!1sen!2sin!4v1707998433980!5m2!1sen!2sin"
            title="Google Map of Lok Bhawan"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;