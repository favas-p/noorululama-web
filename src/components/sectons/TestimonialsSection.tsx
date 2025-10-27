// src/components/sections/TestimonialsSection.tsx
'use client'

import { useEffect, useState } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Abdullah Rahman",
      role: "Alumni, Class of 2023",
      image: "/api/placeholder/100/100",
      quote: "Noorul Ulama shaped not just my academic journey but my character. The values I learned here guide me in every aspect of life. The mentorship and brotherhood I experienced are invaluable.",
      rating: 5,
      achievement: "Currently pursuing Masters in Islamic Studies"
    },
    {
      id: 2,
      name: "Aisha Fatima",
      role: "Current Student, Literature Wing",
      image: "/api/placeholder/100/100",
      quote: "Being part of the Literature Wing has unleashed my creative potential. The supportive environment and excellent guidance have helped me publish my first collection of poems.",
      rating: 5,
      achievement: "Published Author & Poetry Competition Winner"
    },
    {
      id: 3,
      name: "Dr. Hassan Ali",
      role: "Faculty Member",
      image: "/api/placeholder/100/100",
      quote: "Working with Noorul Ulama students is inspiring. Their dedication to learning, combined with strong moral values, makes them exceptional individuals who contribute positively to society.",
      rating: 5,
      achievement: "Professor of Islamic Studies"
    },
    {
      id: 4,
      name: "Omar Khalil",
      role: "Alumni, Class of 2022",
      image: "/api/placeholder/100/100",
      quote: "The community service initiatives taught me the importance of giving back. The skills and values I gained here helped me establish my own NGO for educational support.",
      rating: 5,
      achievement: "Social Entrepreneur & NGO Founder"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('testimonials-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section 
      id="testimonials-section" 
      className="py-10 sm:py-20 bg-gradient-to-br from-emerald-50 to-teal-50"
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
      <div className="container mx-auto px-4 sm:px-6">
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
            What Our <span className="text-emerald-600">Community Says</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-xl text-gray-600 max-w-full sm:max-w-3xl mx-auto">
            Hear from our students, alumni, and faculty about their transformative experiences
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial */}
            <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-white rounded-3xl shadow-2xl p-5 sm:p-8 md:p-12 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full transform translate-x-16 sm:translate-x-32 -translate-y-8 sm:-translate-y-32 opacity-50" />
                
                {/* Quote Icon */}
                <div className="absolute top-4 sm:top-8 left-4 sm:left-8 text-emerald-200">
                  <Quote className="w-10 h-10 sm:w-16 sm:h-16" />
                </div>
                
                <div className="relative z-10 text-center">
                  {/* Stars */}
                  <div className="flex justify-center mb-4 sm:mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-base sm:text-xl md:text-2xl text-gray-700 mb-4 sm:mb-8 leading-relaxed italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <Image
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      width={60}
                      height={60}
                      className="rounded-full border-2 sm:border-4 border-emerald-200"
                    />
                    <div className="text-center sm:text-left">
                      <div className="font-bold text-base sm:text-xl text-gray-800">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-emerald-600 font-semibold text-sm sm:text-base">
                        {testimonials[currentTestimonial].role}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        {testimonials[currentTestimonial].achievement}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center mt-6 sm:mt-8 gap-2 sm:gap-4">
              <button
                onClick={prevTestimonial}
                className="p-2 sm:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-emerald-600 hover:bg-emerald-50"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              {/* Indicators */}
              <div className="flex gap-1 sm:gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-emerald-500 scale-125' 
                        : 'bg-gray-300 hover:bg-emerald-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-2 sm:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-emerald-600 hover:bg-emerald-50"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Testimonial Grid Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-16">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`group cursor-pointer transition-all duration-1000 delay-${index * 200} ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              >
                <div className={`bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                  index === currentTestimonial ? 'border-emerald-500' : 'border-gray-100 hover:border-emerald-200'
                }`}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-gray-800 text-sm sm:text-base">{testimonial.name}</div>
                      <div className="text-xs sm:text-sm text-emerald-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex justify-between items-center mt-2 sm:mt-3">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
