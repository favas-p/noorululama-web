'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Mail, Phone, Linkedin, Instagram, Facebook,
  Award, Users, Target, Briefcase, GraduationCap,
  Star, ChevronRight, ChevronLeft, MapPin, Calendar, ExternalLink
} from 'lucide-react'
import { BorderBeam } from "@/components/ui/border-beam"

const CoreCommitteeSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const sectionRef = useRef(null)

  // Replace with your actual committee members data
  const committeeMembers = [
  {
    name: "Sayyid Hudaib Adil Jifri",
    role: "President",
    category: "leadership",
    department: "General Department",
    year: "Final Year",
    image: "/images/core/president.webp",
    bio: "Leading the union with vision and dedication to student welfare and academic excellence.",
    location: "Mannarkkad",
    phone: "+91 62351 63130",
    social: {
      linkedin: "#",
      instagram: "#",
      facebook: "#"
    },
    responsibilities: [
      "Overall union leadership",
      "Strategic planning",
      "Student representation"
    ],
    color: "from-blue-500 to-indigo-600"
  },
  {
    name: "Abdulla Rashid Eletti",
    role: "General Secretary",
    category: "leadership",
    department: "Lugha Department",
    year: "Final Year",
    image: "/images/core/secretary.webp",
    bio: "Coordinating all union activities and ensuring smooth operations across all departments.",
    location: "Elettil Vattoli",
    phone: "+91 79074 13615",
    social: {
      linkedin: "#",
      instagram: "#",
      facebook: "#"
    },
    responsibilities: [
      "Administrative coordination",
      "Meeting management",
      "Documentation"
    ],
    color: "from-emerald-500 to-teal-600"
  },
  {
    name: "Yahya Qasim Hikami",
    role: "Treasurer",
    category: "secretaries",
    department: "Lugha Department",
    year: "Final Year",
    image: "/images/core/treasurer.webp",
    bio: "Managing financial operations and ensuring transparent budget allocation.",
    location: "Deshamangalam",
    phone: "+91 89436 61810",
    social: {
      linkedin: "#",
      instagram: "#",
      facebook: "#"
    },
    responsibilities: [
      "Financial management",
      "Budget planning",
      "Financial reporting"
    ],
    color: "from-purple-500 to-pink-600"
  },
  {
    name: "Sayyid Muhammed Jalal Shihab",
    role: "Vice President",
    category: "leadership",
    department: "General Department",
    year: "Final Year",
    image: "/images/core/vp1.webp",
    bio: "Supporting leadership initiatives and coordinating academic programs.",
    location: "Munduparamba",
    phone: "+91 70348 38316",
    social: {
      linkedin: "#",
      instagram: "#",
      facebook: "#"
    },
    responsibilities: [
      "Academic coordination",
      "Program oversight",
      "Leadership support"
    ],
    color: "from-orange-500 to-red-600"
  },
  {
    name: "Sayyid Adnan Hydrosi",
    role: "Vice President",
    category: "leadership",
    department: "Aqeeda Department",
    year: "First Year",
    image: "/images/core/vp2.webp",
    bio: "Overseeing cultural activities and student welfare programs.",
    location: "Koonammoochi",
    phone: "+91 99479 01269",
    social: {
      linkedin: "#",
      instagram: "#",
      facebook: "#"
    },
    responsibilities: [
      "Cultural programs",
      "Student welfare",
      "Event coordination"
    ],
    color: "from-cyan-500 to-blue-600"
  },
  {
    name: "Ubaid Nizami Pakkana",
    role: "Joint Secretary",
    category: "secretaries",
    department: "Hadeeth Department",
    year: "Finel Year",
    image: "/images/core/joint-sec1.webp",
    bio: "Managing administrative tasks and supporting secretarial operations.",
    location: "Pakkana",
    phone: "+91 75980 24308",
    social: {
      linkedin: "#",
      instagram: "#",
      facebook: "#"
    },
    responsibilities: [
      "Administrative support",
      "Documentation",
      "Meeting coordination"
    ],
    color: "from-pink-500 to-rose-600"
  },
  {
    name: "Muhammed Nafih Elamkulam",
    role: "Joint Secretary",
    category: "secretaries",
    department: "General Department",
    year: "First Year",
    image: "/images/core/joint-sec2.webp",
    bio: "Assisting in organizational activities and communication management.",
    location: "Elamkulam",
    phone: "+91 80783 50280",
    social: {
      linkedin: "#",
      instagram: "#",
      facebook: "#"
    },
    responsibilities: [
      "Communication management",
      "Record keeping",
      "Event assistance"
    ],
    color: "from-green-500 to-emerald-600"
  }
]
  

  const categories = [
    { id: 'all', label: 'All Members', icon: <Users className="w-4 h-4" /> },
    { id: 'leadership', label: 'Leadership', icon: <Award className="w-4 h-4" /> },
    { id: 'secretaries', label: 'Secretaries', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'coordinators', label: 'Coordinators', icon: <Target className="w-4 h-4" /> }
  ]

  const filteredMembers = activeCategory === 'all'
    ? committeeMembers
    : committeeMembers.filter(member => member.category === activeCategory)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const MemberCard = ({ member, index }) => (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
      onClick={() => setSelectedMember(member)}
      onMouseEnter={() => {
        const event = new CustomEvent('cursorColorChange', {
          detail: { color: member.color }
        });
        window.dispatchEvent(event);
      }}
      onMouseLeave={() => {
        const resetEvent = new CustomEvent('cursorColorChange', {
          detail: { color: 'from-emerald-500 to-teal-500' }
        });
        window.dispatchEvent(resetEvent);
      }}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Section */}
      <div className="relative h-80 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`} />
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23e5e7eb' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='48' font-family='sans-serif'%3EPhoto%3C/text%3E%3C/svg%3E"
          }}
        />

        {/* Overlay Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className={`bg-gradient-to-r ${member.color} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
            {member.category === 'leadership' && <Award className="w-4 h-4 inline mr-1" />}
            {member.category === 'secretaries' && <Briefcase className="w-4 h-4 inline mr-1" />}
            {member.category === 'coordinators' && <Target className="w-4 h-4 inline mr-1" />}
            {member.role}
          </div>
        </div>
      </div>

      {/* Content Section */}

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
          {member.name}
        </h3>

        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <GraduationCap className="w-4 h-4" />
          <span className="text-sm">{member.department} • {member.year}</span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {member.bio}
        </p>

        {/* View Details Button */}
        <button className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-4 rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 transform">
          <span>View Full Profile</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
        <BorderBeam
        duration={4}
        size={300}
        
        className="from-transparent via-green-500 to-transparent"
      />
      </div>
    </div>
  )

  const MemberModal = ({ member, onClose }) => {
    if (!member) return null

    const currentIndex = filteredMembers.findIndex(m => m.name === member.name)
    const hasPrevious = currentIndex > 0
    const hasNext = currentIndex < filteredMembers.length - 1

    // Dispatch cursor color change event when modal opens or member changes
    useEffect(() => {
      if (member) {
        const event = new CustomEvent('cursorColorChange', {
          detail: { color: member.color }
        });
        window.dispatchEvent(event);
      }

      // Reset to default color when modal closes
      return () => {
        const resetEvent = new CustomEvent('cursorColorChange', {
          detail: { color: 'from-emerald-500 to-teal-500' }
        });
        window.dispatchEvent(resetEvent);
      };
    }, [member]);

    const handlePrevious = (e) => {
      e.stopPropagation()
      if (hasPrevious) {
        setSelectedMember(filteredMembers[currentIndex - 1])
      }
    }

    const handleNext = (e) => {
      e.stopPropagation()
      if (hasNext) {
        setSelectedMember(filteredMembers[currentIndex + 1])
      }
    }

    return (
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-fadeIn"
        onClick={onClose}
      >
        {/* Previous Button */}
        {hasPrevious && (
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        )}
        <div
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-5 gap-0">
            {/* Left Side - Image */}
            <div className="md:col-span-2 relative">
              <div className="sticky top-0">
                <div className="relative h-96 md:h-full md:min-h-[600px]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23e5e7eb' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='48' font-family='sans-serif'%3EPhoto%3C/text%3E%3C/svg%3E"
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-20`} />
                </div>
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="md:col-span-3 p-8 md:p-12">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-300 z-10"
              >
                <span className="text-2xl leading-none">&times;</span>
              </button>

              {/* Progress Indicator */}
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>Member {currentIndex + 1} of {filteredMembers.length}</span>
              </div>

              <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${member.color} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
                {member.role}
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {member.name}
              </h2>

              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <GraduationCap className="w-5 h-5" />
                <span>{member.department} • {member.year}</span>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {member.bio}
              </p>

              {/* Responsibilities */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h3>
                <div className="space-y-3">
                  {member.responsibilities.map((resp, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${member.color}`} />
                      <span className="text-gray-700">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Information */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Place</div>
                      <div className="text-gray-900">{member.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Phone</div>
                      <div className="text-gray-900">{member.phone}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <button
                onClick={onClose}
                className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-t ${member.color} text-white hover:bg-gray-200 transition-colors duration-300 font-medium`}
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                <span>Back to Team</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="core-committee"
      className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23059669\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556 15.858 12.14 28 0zm-6.344 0L13.03 12.627l1.414 1.415L28 .828 41.556 14.384l1.414-1.415L30.344 0h-4.688zM.284 15.898l1.414-1.414L15.858 28.626l-1.414 1.414L.284 15.898zm59.43 0l-1.414-1.414L44.142 28.626l1.414 1.414 14.16-14.142zM0 30.344L14.143 16.2l1.414 1.414L1.414 31.758 0 30.344zm60 0L45.857 16.2l-1.414 1.414 14.143 14.144L60 30.344zM30 15.172l14.142 14.142-1.414 1.414L30 17.998 17.272 30.728l-1.414-1.414L30 15.172zM0 45.828L12.142 33.686l1.414 1.414L1.414 47.242 0 45.828zm60 0L47.858 33.686l-1.414 1.414L58.586 47.242 60 45.828z\'/%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Meet the Team
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Core <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Committee</span>
          </h2>
          <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-6" />
          <p className="text-base sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Dedicated leaders working tirelessly to serve the student community and uphold our values
          </p>
        </div>

        {/* Category Filter */}
        <div className={`mb-12 sm:mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 sm:px-7 py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${activeCategory === category.id
                  ? 'bg-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200 hover:border-emerald-200'
                  }`}
              >
                {category.icon}
                <span>{category.label}</span>
                {activeCategory === category.id && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Members Grid */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {filteredMembers.map((member, index) => (
              <MemberCard key={index} member={member} index={index} />
            ))}
            
          </div>
        </div>

        {/* Contact CTA */}
        <div className={`text-center transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 sm:p-12 border border-emerald-100">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Have Questions or Suggestions?
            </h3>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              Our core committee is always here to listen. Feel free to reach out to any member directly.
            </p>
            <button className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Mail className="w-5 h-5" />
              <span>Contact Us</span>
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}

export default CoreCommitteeSection