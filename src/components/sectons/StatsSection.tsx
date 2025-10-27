// src/components/sections/StatsSection.tsx
'use client'

import { useEffect, useState } from 'react'
import { Users, Calendar, BookOpen, Award, Globe, Heart } from 'lucide-react'

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({
    students: 0,
    events: 0,
    programs: 0,
    awards: 0,
    years: 0,
    volunteers: 0
  })

  const stats = [
    { icon: <Users className="w-8 h-8" />, value: 500, label: "Active Students", suffix: "+" },
    { icon: <Calendar className="w-8 h-8" />, value: 50, label: "Annual Events", suffix: "+" },
    { icon: <BookOpen className="w-8 h-8" />, value: 7, label: "Sub Wings", suffix: "" },
    { icon: <Award className="w-8 h-8" />, value: 25, label: "Awards Won", suffix: "+" },
    { icon: <Globe className="w-8 h-8" />, value: 15, label: "Years of Service", suffix: "+" },
    { icon: <Heart className="w-8 h-8" />, value: 1000, label: "Lives Impacted", suffix: "+" }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          animateCounters()
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('stats-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const animateCounters = () => {
    const duration = 2000
    const steps = 60
    const increment = duration / steps

    stats.forEach((stat, index) => {
      let current = 0
      const target = stat.value
      const step = target / steps

      const timer = setInterval(() => {
        current += step
        if (current >= target) {
          current = target
          clearInterval(timer)
        }

        setCounts(prev => ({
          ...prev,
          [Object.keys(prev)[index]]: Math.floor(current)
        }))
      }, increment)
    })
  }

  return (
    <section 
      id="stats-section" 
      className="py-10 sm:py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden"
      onMouseEnter={() => {
        const event = new CustomEvent('cursorColorChange', {
          detail: { color: 'from-emerald-500 to-cyan-500' }
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
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'white\' fill-opacity=\'0.3\'%3E%3Cpath d=\'M30 30c0-8.3-6.7-15-15-15s-15 6.7-15 15 6.7 15 15 15 15-6.7 15-15zm15 0c0-8.3-6.7-15-15-15s-15 6.7-15 15 6.7 15 15 15 15-6.7 15-15z\'/%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Our Impact in Numbers
          </h2>
          <p className="text-base sm:text-xl text-white/90 max-w-full sm:max-w-3xl mx-auto">
            Discover the remarkable journey of Noorul Ulama Students Association through our achievements and community impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center group transition-all duration-1000 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
                  {Object.values(counts)[index]}{stat.suffix}
                </div>
                <div className="text-white/90 text-base sm:text-lg font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection