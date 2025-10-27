// src/components/sections/HeroSection.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  ChevronRight, 
  Play, 
  Users, 
  Calendar, 
  BookOpen, 
  Star, 
  Award, 
  Globe, 
  ArrowDown, 
  Sparkles, 
  GraduationCap, 
  Heart,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'
import Image from 'next/image'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const heroRef = useRef<HTMLElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Add state for floating particles
  const [particles, setParticles] = useState<{left: string, top: string, animationDelay: string, animationDuration: string}[]>([]);

  useEffect(() => {
    // Only run on client
    const generated = Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    }));
    setParticles(generated);
  }, []);

  const heroSlides = [
    {
      title: "نور العلماء",
      subtitle: "Illuminating Hearts & Minds",
      description: "Empowering the next generation through Islamic knowledge, cultural heritage, and community service at Jamia Nooriyya Arabiyya Pattikkad",
      image: "/img/1.webp",
      cta: "Discover Our Mission",
      accent: "emerald",
      stats: { students: "2000+", years: "39", programs: "15+" },
      highlight: "Excellence in Islamic Education"
    },
    {
      title: "الوحدة في التنوع",
      subtitle: "Building Tomorrow's Leaders",
      description: "Join our vibrant community of scholars dedicated to academic excellence, spiritual growth, and social responsibility in the modern world",
      image: "/img/2.webp",
      cta: "Join Our Community",
      accent: "blue",
      stats: { graduates: "5000+", faculty: "120+", awards: "25+" },
      highlight: "Unity in Diversity"
    },
    {
      title: "العلم والحكمة",
      subtitle: "Preserving Islamic Heritage",
      description: "Bridging traditional Islamic education with contemporary learning methodologies for comprehensive personal and intellectual development",
      image: "/img/3.webp",
      cta: "Explore Programs",
      accent: "purple",
      stats: { library: "50K+", research: "100+", community: "10K+" },
      highlight: "Knowledge & Wisdom"
    }
  ]

  const minSwipeDistance = 50

  const handleMouseMove = (e: React.MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      })
    }
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsAutoPlaying(false)
  }

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    }
    
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      }, 8000)
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isAutoPlaying, heroSlides.length])

  const currentSlideData = heroSlides[currentSlide]
  const accentColors = {
    emerald: {
      primary: 'from-emerald-600 via-emerald-500 to-teal-600',
      secondary: 'from-emerald-400 to-teal-400',
      glow: 'shadow-emerald-500/30',
      border: 'border-emerald-400/50',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    blue: {
      primary: 'from-blue-600 via-blue-500 to-indigo-600',
      secondary: 'from-blue-400 to-indigo-400',
      glow: 'shadow-blue-500/30',
      border: 'border-blue-400/50',
      text: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    purple: {
      primary: 'from-purple-600 via-purple-500 to-pink-600',
      secondary: 'from-purple-400 to-pink-400',
      glow: 'shadow-purple-500/30',
      border: 'border-purple-400/50',
      text: 'text-purple-400',
      bg: 'bg-purple-500/10'
    }
  }

  const currentAccent = accentColors[currentSlideData.accent as keyof typeof accentColors]

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        const colorMap: Record<string, string> = {
          emerald: 'from-emerald-500 to-green-500',
          blue: 'from-blue-500 to-indigo-500',
          purple: 'from-purple-500 to-pink-500'
        };
        const event = new CustomEvent('cursorColorChange', {
          detail: { color: colorMap[currentSlideData.accent] || 'from-emerald-500 to-green-500' }
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
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Background Images with Enhanced Parallax */}
      <div className="absolute inset-0 z-10">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
            style={{
              transform: index === currentSlide 
                ? `translateX(${mousePosition.x * 8}px) translateY(${mousePosition.y * 8}px)` 
                : 'none'
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover filter brightness-50"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
            <div className={`absolute inset-0 bg-gradient-to-br ${currentAccent.bg} mix-blend-overlay`} />
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-20">
        {particles.map((style, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={style}
          >
            <div className="w-2 h-2 bg-white rounded-full blur-sm" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-30 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          
          {/* Enhanced Header Badge */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl rounded-full px-6 py-3 border border-white/10 shadow-2xl mb-6 hover:bg-white/10 transition-all duration-300">
              <div className="relative">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-ping" />
              </div>
              <span className="text-white/90 font-medium text-sm sm:text-base">Est. 1985 • Islamic Excellence</span>
              <GraduationCap className={`w-5 h-5 ${currentAccent.text}`} />
            </div>
            
            {/* Highlight Badge */}
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${currentAccent.bg} ${currentAccent.text} border ${currentAccent.border} backdrop-blur-sm`}>
              {currentSlideData.highlight}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8">
              
              {/* Arabic Title with Enhanced Styling */}
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-arabic leading-[1.1] tracking-tight">
                  <span className="block bg-gradient-to-r from-white via-gray-50 to-white bg-clip-text text-transparent drop-shadow-2xl animate-gradient">
                    {currentSlideData.title}
                  </span>
                </h1>
                
                <div className={`w-16 sm:w-24 lg:w-32 h-1 mx-auto lg:mx-0 rounded-full bg-gradient-to-r ${currentAccent.primary} shadow-lg ${currentAccent.glow}`} />
              </div>

              {/* English Subtitle with Better Typography */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white/95 leading-tight font-sans tracking-wide">
                {currentSlideData.subtitle}
              </h2>

              {/* Enhanced Description */}
              <p className="text-base sm:text-lg lg:text-xl text-gray-300/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                {currentSlideData.description}
              </p>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-semibold text-base sm:text-lg shadow-2xl transition-all duration-500 flex items-center justify-center gap-3 hover:scale-105 hover:shadow-3xl bg-gradient-to-r ${currentAccent.primary} text-white border border-white/10 ${currentAccent.glow}`}>
                  <span className="relative z-10">{currentSlideData.cta}</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
                
                <button className="group relative border-2 border-white/40 text-white px-8 py-4 rounded-2xl font-semibold text-base sm:text-lg hover:bg-white hover:text-gray-900 transition-all duration-500 flex items-center justify-center gap-3 backdrop-blur-sm hover:scale-105 hover:border-white/80 hover:shadow-xl">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Virtual Tour</span>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-2xl transition-all duration-300" />
                </button>
              </div>
            </div>

            {/* Right Column - Enhanced Stats & Features */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              
              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {Object.entries(currentSlideData.stats).map(([key, value], index) => (
                  <div 
                    key={key} 
                    className={`group text-center p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl hover:scale-105 hover:bg-white/10 transition-all duration-500 cursor-pointer ${
                      isVisible ? 'animate-fade-in-up' : 'opacity-0'
                    }`} 
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-br ${currentAccent.secondary} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                      {value}
                    </div>
                    <div className="text-white/70 text-xs sm:text-sm capitalize font-medium mt-1 group-hover:text-white/90 transition-colors duration-300">
                      {key}
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { icon: BookOpen, text: "Modern Curriculum", delay: "600ms" },
                  { icon: Users, text: "Expert Faculty", delay: "700ms" },
                  { icon: Globe, text: "Global Network", delay: "800ms" },
                  { icon: Heart, text: "Community Service", delay: "900ms" }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`group flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer ${
                      isVisible ? 'animate-fade-in-up' : 'opacity-0'
                    }`} 
                    style={{ animationDelay: item.delay }}
                  >
                    <div className={`p-2 rounded-lg ${currentAccent.bg} group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`w-5 h-5 ${currentAccent.text}`} />
                    </div>
                    <span className="text-white/90 font-medium text-sm sm:text-base group-hover:text-white transition-colors duration-300">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-4 sm:p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <MapPin className={`w-4 h-4 ${currentAccent.text}`} />
                  Quick Contact
                </h3>
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    <span>+91 123-456-7890</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <span>info@jamianooriyya.edu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-40 hidden lg:block">
        <div className="flex flex-col items-center space-y-3 animate-bounce">
          <div className="text-white/60 text-sm font-medium">Explore</div>
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center hover:border-white/60 transition-all duration-300 cursor-pointer group">
            <ArrowDown className="w-4 h-4 text-white/60 mt-2 animate-pulse group-hover:text-white/80 transition-colors duration-300" />
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      {/* <div className="absolute top-0 left-0 right-0 z-40 h-1 bg-white/5">
        <div 
          className={`h-full bg-gradient-to-r ${currentAccent.primary} transition-all duration-500 shadow-lg`}
          style={{ 
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`
          }}
        />
      </div> */}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .font-arabic {
          font-family: 'Amiri', 'Noto Naskh Arabic', 'Times New Roman', serif;
          font-weight: 700;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.5);
        }
        
        /* Enhanced mobile responsiveness */
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .font-arabic {
            font-size: 2.5rem !important;
            line-height: 1.1;
          }
          
          h2 {
            font-size: 1.25rem !important;
          }
          
          p {
            font-size: 0.95rem !important;
            line-height: 1.6;
          }
          
          .grid-cols-3 > div {
            padding: 0.75rem !important;
          }
          
          button {
            padding: 0.75rem 1.5rem !important;
            font-size: 0.9rem !important;
          }
        }
        
        @media (max-width: 375px) {
          .font-arabic {
            font-size: 2rem !important;
          }
          
          .grid-cols-3 {
            gap: 0.5rem;
          }
          
          .space-y-8 > * + * {
            margin-top: 1.5rem !important;
          }
        }
        
        /* High-resolution screens */
        @media (min-width: 1920px) {
          .font-arabic {
            font-size: 6rem;
          }
          
          h2 {
            font-size: 3.5rem;
          }
          
          p {
            font-size: 1.5rem;
          }
        }
        
        /* Dark mode enhancements */
        @media (prefers-color-scheme: dark) {
          .backdrop-blur-2xl {
            background-color: rgba(0, 0, 0, 0.2);
          }
        }
        
        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce,
          .animate-pulse,
          .animate-float,
          .animate-gradient {
            animation: none;
          }
          
          .transition-all {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}

export default HeroSection