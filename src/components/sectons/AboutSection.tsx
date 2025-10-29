// src/components/sections/AboutSection.tsx
'use client'

import { useEffect, useState, useRef } from 'react'
import { Landmark, Users, Heart, BookOpen, Star, Award, ArrowRight, Quote, CheckCircle, Globe, Calendar } from 'lucide-react'
import Image from 'next/image'

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeValue, setActiveValue] = useState(0)
  const [counters, setCounters] = useState({ students: 0, years: 0, programs: 0, events: 0 })
  const sectionRef = useRef(null)

  const values = [
    {
      icon: <Landmark className="w-8 h-8" />,
      title: "Islamic Values",
      description: "Rooted in authentic Islamic teachings and principles that guide every aspect of our educational journey",
      color: "emerald",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Building strong bonds among students and society through collaborative learning and mutual support",
      color: "teal",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Service",
      description: "Dedicated to serving humanity with compassion, empathy, and unwavering commitment to social welfare",
      color: "rose",
      gradient: "from-rose-500 to-pink-500"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Knowledge",
      description: "Pursuing excellence in both religious and worldly education for holistic personal development",
      color: "blue",
      gradient: "from-blue-500 to-indigo-500"
    }
  ]

  const achievements = [
    { label: "Active Students", value: 500, suffix: "+" },
    { label: "Years of Excellence", value: 38, suffix: "+" },
    { label: "Educational Programs", value: 12, suffix: "" },
    { label: "Annual Events", value: 50, suffix: "+" }
  ]

  const testimonials = [
    {
      text: "Noorul Ulama has been instrumental in shaping my character and providing me with both spiritual and academic guidance.",
      author: "Ahmad Khalil",
      role: "Alumni, Class of 2023"
    },
    {
      text: "The values instilled here go beyond education - they prepare you for life with Islamic principles at the core.",
      author: "Fatima Noor",
      role: "Current Student"
    }
  ]

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          animateCounters()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Animate counters
  const animateCounters = () => {
    achievements.forEach((achievement, index) => {
      const duration = 2000
      const steps = 60
      const increment = achievement.value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= achievement.value) {
          current = achievement.value
          clearInterval(timer)
        }

        setCounters(prev => ({
          ...prev,
          [index === 0 ? 'students' : index === 1 ? 'years' : index === 2 ? 'programs' : 'events']: Math.floor(current)
        }))
      }, duration / steps)
    })
  }

  // Auto-rotate values
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue(prev => (prev + 1) % values.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden"
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
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23059669\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M50 50c0-13.8-11.2-25-25-25s-25 11.2-25 25 11.2 25 25 25 25-11.2 25-25zm25 0c0-13.8-11.2-25-25-25s-25 11.2-25 25 11.2 25 25 25 25-11.2 25-25z\'/%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Quote className="w-4 h-4" />
            Our Story & Mission
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            About <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Noorul Ulama</span>
          </h2>
          <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-6" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 sm:mb-20">

          {/* Left Column - Content */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>

            {/* Main Description */}
            <div className="mb-8 sm:mb-12">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-6 font-light">
                The Noorul Ulama Students Association stands as a <span className="font-semibold text-emerald-600">beacon of Islamic education</span> and cultural preservation at Jamia Nooriyya Arabiyya Pattikkad.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
                Founded with the vision of nurturing well-rounded individuals who embody both spiritual wisdom and academic excellence, our organization serves as a bridge between traditional Islamic scholarship and contemporary educational needs.
              </p>

              {/* Key Points */}
              <div className="space-y-3 mb-8">
                {[
                  "Fostering intellectual, spiritual, and social growth",
                  "Preserving Islamic heritage and cultural values",
                  "Building future leaders with strong moral foundations",
                  "Creating a supportive community for holistic development"
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5 group-hover:bg-emerald-200 transition-colors duration-300">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Stats */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 group-hover:scale-105 transform">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">
                      {index === 0 ? counters.students :
                        index === 1 ? counters.years :
                          index === 2 ? counters.programs : counters.events}
                      {achievement.suffix}
                    </div>
                    <div className="text-gray-600 text-xs sm:text-sm font-medium">
                      {achievement.label}
                    </div>
                  </div>
                </div>
              ))}
            </div> */}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base sm:text-lg flex items-center justify-center gap-3 relative overflow-hidden">
                <span className="relative z-10">Learn More About Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>

              <button className="group border-2 border-emerald-600 text-emerald-600 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-3">
                <Globe className="w-5 h-5" />
                <span>Visit Campus</span>
              </button>
            </div>
          </div>

          {/* Right Column - Visual Content */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>

            {/* Enhanced Image Section */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-sm" />
              <div className="relative bg-white p-4 sm:p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/img/4.webp"
                    alt="Jamia Nooriyya Arabiyya Pattikkad"
                    width={600}
                    height={400}
                    className="w-full h-auto group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white p-3 sm:p-4 rounded-2xl shadow-lg animate-pulse">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-3 sm:p-4 rounded-2xl shadow-lg animate-pulse animation-delay-1000">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              </div>
            </div>

            {/* Testimonials Carousel */}
            {/* <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 text-emerald-600 mb-4">
                <Quote className="w-5 h-5" />
                <span className="font-medium text-sm">Student Voices</span>
              </div>

              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="border-l-4 border-emerald-200 pl-4">
                    <p className="text-gray-700 italic mb-3 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>

        {/* Enhanced Values Section */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core <span className="text-emerald-600">Values</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The fundamental principles that guide our mission and shape our educational philosophy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group relative bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent cursor-pointer transform hover:-translate-y-2 ${activeValue === index ? 'ring-2 ring-emerald-200 shadow-xl scale-105' : ''
                  }`}
                onMouseEnter={() => setActiveValue(index)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl text-white mb-6 group-hover:scale-110 transform transition-all duration-300 shadow-lg`}>
                  {value.icon}
                </div>

                {/* Content */}
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {value.description}
                </p>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Preview */}
        {/* <div className={`mt-16 sm:mt-20 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 sm:p-12 border border-emerald-100">
            <Calendar className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Join Our Journey
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Be part of a legacy that spans decades of educational excellence and spiritual growth
            </p>
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
              Explore Our Timeline
            </button>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  )
}

export default AboutSection