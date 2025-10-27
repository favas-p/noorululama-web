"use client";

import React from "react";
import { useEffect, useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageSquare, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  ExternalLink,
  Clock,
  Globe
} from 'lucide-react'

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('contact-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields')
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    setIsSubmitting(false)
    
    // Show success message (you can implement a toast notification here)
    alert('Message sent successfully!')
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: [
        "Faizabad, Pattikkad PO",
        "Malappuram, Kerala 679325",
        "India"
      ]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["jamianooriya@gmail.com"]
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+91 98470 70200", "+91 97473 99584"]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Office Hours",
      details: ["Mon - Fri: 9:00 AM - 5:00 PM", "Sat: 9:00 AM - 1:00 PM"]
    }
  ]

  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      name: "Facebook",
      url: "#",
      color: "hover:bg-blue-600"
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      name: "Instagram", 
      url: "#",
      color: "hover:bg-pink-600"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      name: "Twitter",
      url: "#",
      color: "hover:bg-blue-400"
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      name: "YouTube",
      url: "#",
      color: "hover:bg-red-600"
    }
  ]

  return (
    <section id="contact-section" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Get in <span className="text-emerald-400">Touch</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Connect with Noorul Ulama Students Association - We're here to help and answer your questions
          </p>
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <Globe className="w-5 h-5" />
            <span className="text-sm font-medium">Jamia Nooriyya Arabiyya</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-gray-400 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* About Organization */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 sm:p-6 mb-8">
                <h4 className="text-emerald-400 font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  About Noorul Ulama
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Founded in 1964, Noorul Ulama (Light of the Scholars) is the student organization of 
                  Jamia Nooriyya Arabiyya, dedicated to nurturing creative talents and developing 
                  artistic, literary, and organizational skills among students.
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 ${social.color} group`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Send us a Message
              </h3>
              
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <div className="block text-gray-300 font-medium mb-2">
                      Full Name *
                    </div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="block text-gray-300 font-medium mb-2">
                      Email Address *
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="block text-gray-300 font-medium mb-2">
                    Subject *
                  </div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <div className="block text-gray-300 font-medium mb-2">
                    Message *
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-300 resize-vertical"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-500/25"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-gray-400 text-sm text-center">
                  We typically respond within 24 hours during business days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className={`mt-12 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Find Us Here
                </h3>
                <a
                  href="https://maps.google.com/maps?q=Faizabad,+Pattikkad+PO,+Malappuram,+Kerala+679325,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  Open in Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              {/* Placeholder for map - replace with actual map integration */}
              <div className="bg-gray-700/50 rounded-lg h-64 sm:h-80 flex items-center justify-center border border-gray-600">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">Interactive Map</p>
                  <p className="text-gray-400 text-sm">
                    Faizabad, Pattikkad PO, Malappuram, Kerala 679325
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection