// src/components/sections/CTASection.tsx
'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Users, MessageCircle, Calendar, Mail } from 'lucide-react'

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('cta-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const ctaCards = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Join Our Community",
      description: "Become part of our vibrant student community and unlock opportunities for growth",
      action: "Apply Now",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Attend Our Events",
      description: "Participate in our educational, cultural, and community service programs",
      action: "View Events",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Get in Touch",
      description: "Have questions? Our team is here to help guide your journey",
      action: "Contact Us",
      gradient: "from-purple-500 to-pink-500"
    }
  ]

  return (
    <section 
      id="cta-section" 
      className="py-10 sm:py-20 bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900 relative overflow-hidden"
      onMouseEnter={() => {
        const event = new CustomEvent('cursorColorChange', {
          detail: { color: 'from-emerald-500 to-teal-500' }
        });
        window.dispatchEvent(event);
      }}
      onMouseLeave={() => {
        const resetEvent = new CustomEvent('cursorColorChange', {
          detail: { color: 'from-emerald-500 to-teal-500' }
        });
        window.dispatchEvent(resetEvent);
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'white\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M40 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm20 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z\'/%3E%3C/g%3E%3C/svg%3E')]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}> 
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to <span className="text-emerald-400">Begin Your Journey?</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-xl text-gray-300 max-w-full sm:max-w-3xl mx-auto">
            Join thousands of students who have transformed their lives through Islamic education and community service
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-10 sm:mb-16">
          {ctaCards.map((card, index) => (
            <div
              key={index}
              className={`group transition-all duration-1000 delay-${index * 200} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center">
                <div className={`inline-flex p-3 sm:p-4 rounded-full bg-gradient-to-r ${card.gradient} text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-4">{card.title}</h3>
                <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{card.description}</p>
                <button className={`w-full bg-gradient-to-r ${card.gradient} text-white py-3 px-4 sm:px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-xl text-sm sm:text-base`}>
                  {card.action}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className={`max-w-2xl mx-auto transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}> 
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-white/20 text-center">
            <div className="inline-flex p-3 sm:p-4 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-white mb-3 sm:mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">Stay Connected</h3>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              Subscribe to our newsletter for updates on events, programs, and inspiring stories from our community
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent backdrop-blur-sm text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            
            {isSubscribed && (
              <div className="mt-3 sm:mt-4 p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-lg text-emerald-300 text-sm sm:text-base">
                Thank you for subscribing! You'll receive our latest updates soon.
              </div>
            )}
            
            <p className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className={`text-center mt-10 sm:mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}> 
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 rounded-2xl" />
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
                Transform Your Life Through Islamic Education
              </h3>
              <p className="text-emerald-100 mb-4 sm:mb-6 text-base sm:text-lg">
                Join a community that values knowledge, character, and service to humanity
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button className="w-full sm:w-auto bg-white text-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base">
                  Start Your Application
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
                  Schedule a Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection