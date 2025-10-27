'use client'
import { useEffect, useState, useRef } from 'react'
import {
  Theater, BookOpen, Library, Video, MessageSquare, PenTool,
  Mic, Users, Heart, Stethoscope, Brain, FileText,
  HandHeart, Scale, Scroll, Leaf, ArrowRight, Star,
  ChevronLeft, ChevronRight, Eye, Filter, X, Mail, Phone,
  Award, Target, Calendar, MapPin, TrendingUp, Sparkles
} from 'lucide-react'

const SubWingsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeWing, setActiveWing] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedWing, setSelectedWing] = useState<any>(null)
  const sectionRef = useRef(null)
  const itemsPerPage = 6

  const subWings = [
    {
      icon: <Theater className="w-6 h-6" />,
      title: "Samajam",
      description: "A vibrant platform dedicated to nurturing the artistic and literary talents of Jamia Nooriya students.",
      fullDescription: "Samajam serves as the creative heart of Jamia Nooriya, fostering artistic expression and literary excellence. We organize cultural events, poetry sessions, drama performances, and art exhibitions that celebrate Islamic heritage while encouraging contemporary creative expression. Our programs are designed to develop confidence, public speaking skills, and artistic abilities in students.",
      category: "cultural",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-600",
      emoji: "🎭",
      features: ["Artistic Development", "Literary Talents", "Creative Expression"],
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
      chairman: {
        name: "Habeeb Rahmathulla",
        image: "/images/subwing/samajam-chireman.webp",
        department: "General Department",
        location: "Ederam",
        phone: "+91 73065 58074"
      },
      convener: {
        name: "Shamsan Mahiri",
        image: "/images/subwing/samajam-conveener.webp",
        department: "Lugha Department",
        location: "Vazhakkad",
        phone: "+91 80868 71734"
      },
      members: [
        { name: "Ali Rahman", role: "Cultural Coordinator", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
        { name: "Aisha Siddiq", role: "Literary Head", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
        { name: "Omar Farooq", role: "Event Coordinator", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
        { name: "Omar Farooq", role: "Event Coordinator", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
        { name: "Maryam Ali", role: "Art Director", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Organized 25+ cultural programs annually",
        "Published 3 literary magazines",
        "Won Best Cultural Wing Award 2023"
      ],
      upcomingEvents: [
        { title: "Annual Poetry Night", date: "December 15, 2024" },
        { title: "Drama Festival", date: "January 20, 2025" }
      ],
      established: "2010",
      totalMembers: 45
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Al-Muneer",
      description: "An intellectual magazine offering insightful discussions and research on contemporary and educational topics.",
      fullDescription: "Al-Muneer is our flagship academic publication that bridges traditional Islamic scholarship with contemporary issues. The magazine features research articles, scholarly debates, book reviews, and interviews with renowned scholars. We aim to create a platform for intellectual discourse that challenges students to think critically while remaining grounded in Islamic principles.",
      category: "academic",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-600",
      emoji: "📖",
      features: ["Magazine Publishing", "Research Topics", "Educational Content"],
      image: "https://images.pexels.com/photos/4397925/pexels-photo-4397925.jpeg",
      chairman: {
        name: "Muhammed Sajjad",
        image: "/images/subwing/al-muneer-chireman.webp",
        department: "Thafseer Department",
        location: "Melmuri",
        phone: "+91 70346 05270"
      },
      convener: {
        name: "Anees Rahman",
        image: "/images/subwing/al-muneer-conveener.webp",
        department: "Aqeeda Department",
        location: "Karuvankallu",
        phone: "+91 91886 70173"
      },
      members: [
        { name: "Hamza Abdullah", role: "Chief Editor", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop" },
        { name: "Zainab Malik", role: "Research Coordinator", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
        { name: "Usman Ali", role: "Content Writer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" },
        { name: "Nadia Ahmed", role: "Design Head", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Published 48 issues over 12 years",
        "Featured 200+ scholarly articles",
        "Distributed across 15 institutions"
      ],
      upcomingEvents: [
        { title: "Issue 49 Launch", date: "December 1, 2024" },
        { title: "Writers Workshop", date: "January 10, 2025" }
      ],
      established: "2012",
      totalMembers: 32
    },
    {
      icon: <Library className="w-6 h-6" />,
      title: "Library Team",
      description: "Focused on building an effective learning environment with historical reference materials to enhance academic capabilities.",
      fullDescription: "The Library Team manages our extensive collection of Islamic texts, academic resources, and digital archives. We organize reading sessions, book clubs, research assistance programs, and library orientation for new students. Our mission is to create a welcoming space that encourages scholarly pursuit and lifelong learning.",
      category: "academic",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-600",
      emoji: "📚",
      features: ["Learning Environment", "Reference Materials", "Academic Support"],
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",
      chairman: {
        name: "Sayyid Muhammed Ali Haidrosi Bishri",
        image: "/images/subwing/library-chireman.webp",
        department: "General Department",
        location: "Pandhallur",
        phone: "+91 81297 45720"
      },
      convener: {
        name: "Muhammed Anas Thodar",
        image: "/images/subwing/library-conveener.webp",
        department: "Lugha Department",
        location: "Puttur",
        phone: "+91 96113 18883"
      },
      members: [
        { name: "Tariq Hassan", role: "Head Librarian", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
        { name: "Amina Yusuf", role: "Cataloging Specialist", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
        { name: "Bilal Ahmed", role: "Digital Archives", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Digitized 5,000+ rare manuscripts",
        "Established 24/7 reading room",
        "Implemented modern cataloging system"
      ],
      upcomingEvents: [
        { title: "Book Fair", date: "December 10, 2024" },
        { title: "Reading Marathon", date: "February 5, 2025" }
      ],
      established: "2008",
      totalMembers: 28
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Media Wing",
      description: "Showcasing the creativity and talents of Jamia Nooriya Arabic College students to the broader world through media channels.",
      fullDescription: "Our Media Wing produces high-quality content including documentary films, social media campaigns, podcasts, and promotional materials. We train students in videography, editing, graphic design, and content strategy while maintaining Islamic ethics in media production. Our work showcases the vibrant life at Jamia Nooriya to the wider world.",
      category: "media",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-600",
      emoji: "🎥",
      features: ["Content Creation", "Digital Media", "Student Showcase"],
      image: "https://images.pexels.com/photos/1188751/pexels-photo-1188751.jpeg",
      chairman: {
        name: "Faisal Syed",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        department: "Media Studies",
        location: "faisal.syed@jamianooriya.edu",
        phone: "+91 98765 43226"
      },
      convener: {
        name: "Layla Ibrahim",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
        department: "Communications",
        location: "layla.ibrahim@jamianooriya.edu",
        phone: "+91 98765 43227"
      },
      members: [
        { name: "Raza Khan", role: "Video Director", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop" },
        { name: "Hiba Zahra", role: "Social Media Manager", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
        { name: "Adnan Malik", role: "Graphic Designer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" },
        { name: "Sara Ahmed", role: "Content Writer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Produced 50+ video documentaries",
        "15K+ social media followers",
        "Launched official YouTube channel"
      ],
      upcomingEvents: [
        { title: "Media Workshop", date: "December 20, 2024" },
        { title: "Documentary Screening", date: "January 15, 2025" }
      ],
      established: "2015",
      totalMembers: 38
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Al-Munazara",
      description: "Promotes awareness and critical thinking among students through structured debates and discussions on thought-provoking topics.",
      fullDescription: "Al-Munazara cultivates critical thinking and eloquent expression through organized debates on contemporary Islamic and social issues. We conduct weekly debate sessions, public speaking workshops, and inter-college debate competitions. Our programs help students develop analytical skills, confidence, and the ability to present ideas persuasively while respecting diverse viewpoints.",
      category: "academic",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-600",
      emoji: "🗣",
      features: ["Debates", "Critical Thinking", "Public Speaking"],
      image: "https://plus.unsplash.com/premium_photo-1681400601938-9e1de84ab5e9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1062",
      chairman: {
        name: "Shameemul Haqe Kamali",
        image: "/images/subwing/al-munazara-chireman.webp",
        department: "Thafseer Department",
        location: "Pathamkulam",
        phone: "+91 85928 31847"
      },
      convener: {
        name: "Yasar Meerani",
        image: "/images/subwing/al-munazara-conveener.webp",
        department: "Aqeeda Department",
        location: "Elayoor",
        phone: "+91 90723 56165"
      },
      members: [
        { name: "Imran Yusuf", role: "Debate Coach", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
        { name: "Zara Khan", role: "Research Head", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
        { name: "Mustafa Ali", role: "Event Organizer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Organized 40+ debate sessions",
        "Won 5 inter-college competitions",
        "Trained 100+ debaters"
      ],
      upcomingEvents: [
        { title: "Annual Debate Championship", date: "January 25, 2025" },
        { title: "Public Speaking Workshop", date: "February 10, 2025" }
      ],
      established: "2011",
      totalMembers: 35
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Sargaposhini",
      description: "A platform designed to develop students' language proficiency and literary skills through active participation and mentorship.",
      fullDescription: "Sargaposhini focuses on enhancing students' command of Arabic and Urdu languages through creative writing workshops, poetry sessions, and linguistic exercises. We provide mentorship from experienced scholars and create opportunities for students to publish their work. Our programs emphasize classical literature while encouraging contemporary expression.",
      category: "cultural",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      textColor: "text-teal-600",
      emoji: "✍️",
      features: ["Language Skills", "Literary Development", "Mentorship"],
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
      chairman: {
        name: "Abdul Sathar Mahiri",
        image: "/images/subwing/sargaposhini-chireman.webp",
        department: "Lugha Department",
        location: "Pallikkal bazar",
        phone: "+91 79943 74344"
      },
      convener: {
        name: "Muhammed Rameef KK",
        image: "/images/subwing/sargaposhini-conveener.webp",
        department: "Lugha Department",
        location: "Kizhisseri",
        phone: "+91 98956 60215"
      },
      members: [
        { name: "Yusuf Hassan", role: "Writing Coach", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop" },
        { name: "Ruqayyah Ali", role: "Poetry Mentor", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
        { name: "Salman Farooq", role: "Language Tutor", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Published 2 poetry anthologies",
        "Conducted 30+ writing workshops",
        "Mentored 80+ aspiring writers"
      ],
      upcomingEvents: [
        { title: "Poetry Slam", date: "December 28, 2024" },
        { title: "Creative Writing Retreat", date: "February 15, 2025" }
      ],
      established: "2013",
      totalMembers: 30
    },

    {
      icon: <Mic className="w-6 h-6" />,
      title: "Thansheethul Qurrah",
      description: "Encourages students' growth in Qur'an recitation and related disciplines with expert guidance and structured activities.",
      category: "spiritual",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
      textColor: "text-violet-600",
      emoji: "🎙",
      features: ["Qur'an Recitation", "Expert Guidance", "Spiritual Growth"],
      image: "https://plus.unsplash.com/premium_photo-1677013623482-6d71ca2dc71a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHF1cmFufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      chairman: {
        name: "Hafil Shinas AK",
        image: "/images/subwing/thansheethul-chireman.webp",
        department: "General Department",
        location: "Kalamassery",
        phone: "+91 62823 93247"
      },
      convener: {
        name: "Hafiz Muhammed Swalih",
        image: "/images/subwing/thansheethul-conveener.webp",
        department: "General Department",
        location: "Pullur",
        phone: "+91 75919 04764"
      },
      members: [
        { name: "Yusuf Hassan", role: "Writing Coach", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop" },
        { name: "Ruqayyah Ali", role: "Poetry Mentor", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
        { name: "Salman Farooq", role: "Language Tutor", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Published 2 poetry anthologies",
        "Conducted 30+ writing workshops",
        "Mentored 80+ aspiring writers"
      ],
      upcomingEvents: [
        { title: "Poetry Slam", date: "December 28, 2024" },
        { title: "Creative Writing Retreat", date: "February 15, 2025" }
      ],
      established: "2013",
      totalMembers: 30
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Majlisunnoor",
      description: "Organizes monthly spiritual gatherings (Majlis) to enrich students' inner growth and moral development.",
      category: "spiritual",
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-600",
      emoji: "🕋",
      features: ["Spiritual Gatherings", "Moral Development", "Inner Growth"],
      image: "https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg",
      chairman: {
        name: "Sayyid Muhammed Unais",
        image: "/images/subwing/majlisunnoor-chireman.webp",
        department: "General Department",
        location: "Payyanad",
        phone: "+91 81398 76332"
      },
      convener: {
        name: "Abdulla Nabhan",
        image: "/images/subwing/majlisunnoor-conveener.webp",
        department: "General Department",
        location: "Kadankode",
        phone: "+91 97780 48300"
      },
      members: [
        { name: "Yusuf Hassan", role: "Writing Coach", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop" },
        { name: "Ruqayyah Ali", role: "Poetry Mentor", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
        { name: "Salman Farooq", role: "Language Tutor", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Published 2 poetry anthologies",
        "Conducted 30+ writing workshops",
        "Mentored 80+ aspiring writers"
      ],
      upcomingEvents: [
        { title: "Poetry Slam", date: "December 28, 2024" },
        { title: "Creative Writing Retreat", date: "February 15, 2025" }
      ],
      established: "2013",
      totalMembers: 30
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Da'wa Committee",
      description: "Dedicated to enhancing the spiritual progress of students through religious guidance and meaningful initiatives.",
      category: "spiritual",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      textColor: "text-pink-600",
      emoji: "📢",
      features: ["Religious Guidance", "Spiritual Progress", "Meaningful Initiatives"],
      image: "/images/thansheethul-qurrah.jpg",
      chairman: {
        name: "Sayyid Abdul Basith",
        image: "/images/subwing/da'wa-chireman.webp",
        department: "General Department",
        location: "Omassery",
        phone: "+91 7736616265"
      },
      convener: {
        name: "Saleel Babu",
        image: "/images/subwing/da'wa-conveener.webp",
        department: "Lugha Department",
        location: "Emangadu",
        phone: "+91 7510816272"
      },
      members: [
        { name: "Yusuf Hassan", role: "Writing Coach", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop" },
        { name: "Ruqayyah Ali", role: "Poetry Mentor", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
        { name: "Salman Farooq", role: "Language Tutor", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Published 2 poetry anthologies",
        "Conducted 30+ writing workshops",
        "Mentored 80+ aspiring writers"
      ],
      upcomingEvents: [
        { title: "Poetry Slam", date: "December 28, 2024" },
        { title: "Creative Writing Retreat", date: "February 15, 2025" }
      ],
      established: "2013",
      totalMembers: 30
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "Medical Wing",
      description: "Ensures the physical well-being of students through health awareness and support programs.",
      category: "welfare",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-600",
      emoji: "🏥",
      features: ["Health Awareness", "Support Programs", "Physical Well-being"],
      image: "https://images.unsplash.com/photo-1674702727317-d29b2788dc4a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1073",
      chairman: {
        name: "Irshad Kamali ",
        image: "/images/subwing/medical-chireman.webp",
        department: "General Department",
        location: "Koottilangadi",
        phone: "+91 7594916234"
      },
      convener: {
        name: "Nabeel Hadi",
        image: "/images/subwing/medical-conveener.webp",
        department: "General Department",
        location: "Kannur",
        phone: "+91 8590940467"
      },
      members: [
        { name: "Yusuf Hassan", role: "Writing Coach", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop" },
        { name: "Ruqayyah Ali", role: "Poetry Mentor", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
        { name: "Salman Farooq", role: "Language Tutor", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Published 2 poetry anthologies",
        "Conducted 30+ writing workshops",
        "Mentored 80+ aspiring writers"
      ],
      upcomingEvents: [
        { title: "Poetry Slam", date: "December 28, 2024" },
        { title: "Creative Writing Retreat", date: "February 15, 2025" }
      ],
      established: "2013",
      totalMembers: 30
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Al-Hikma",
      description: "Inspires students to explore and engage with contemporary issues through a knowledge-based approach.",
      category: "academic",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-600",
      emoji: "🧠",
      features: ["Contemporary Issues", "Knowledge-based Approach", "Critical Analysis"],
      image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1064",
      chairman: {
        name: "Mohammed Salih EP",
        image: "/images/subwing/al-hikma-chireman.webp",
        department: "Fiqh Department",
        location: "Pacheeri",
        phone: "+91 7034106310"
      },
      convener: {
        name: "Muhammed Rashid KP",
        image: "/images/subwing/al-hikma-conveener.webp",
        department: "General Department",
        location: "Nariyakkampoyil",
        phone: "+91 9526841500"
      },
      members: [
        { name: "Yusuf Hassan", role: "Writing Coach", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop" },
        { name: "Ruqayyah Ali", role: "Poetry Mentor", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
        { name: "Salman Farooq", role: "Language Tutor", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Published 2 poetry anthologies",
        "Conducted 30+ writing workshops",
        "Mentored 80+ aspiring writers"
      ],
      upcomingEvents: [
        { title: "Poetry Slam", date: "December 28, 2024" },
        { title: "Creative Writing Retreat", date: "February 15, 2025" }
      ],
      established: "2013",
      totalMembers: 30
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Publishing Bureau",
      description: "Publishes various books and literary works to support and promote the literary excellence of students.",
      category: "academic",
      color: "from-slate-500 to-gray-500",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200",
      textColor: "text-slate-600",
      emoji: "🖋",
      features: ["Book Publishing", "Literary Works", "Student Excellence"],
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      chairman: {
        name: "Ubaid Nizami",
        image: "/images/subwing/publishing-chireman.webp",
        department: "Hadeeth Department",
        location: "Pakkana",
        phone: "+91 7598024308"
      },
      convener: {
        name: "Arshad Ashkari",
        image: "/images/subwing/publishing-conveener.webp",
        department: "Fiqh Departmnent",
        location: "Kundoor",
        phone: "+91 8590780105"
      },
      members: [
        { name: "Yusuf Hassan", role: "Writing Coach", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop" },
        { name: "Ruqayyah Ali", role: "Poetry Mentor", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
        { name: "Salman Farooq", role: "Language Tutor", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Published 2 poetry anthologies",
        "Conducted 30+ writing workshops",
        "Mentored 80+ aspiring writers"
      ],
      upcomingEvents: [
        { title: "Poetry Slam", date: "December 28, 2024" },
        { title: "Creative Writing Retreat", date: "February 15, 2025" }
      ],
      established: "2013",
      totalMembers: 30
    },
    {
      icon: <HandHeart className="w-6 h-6" />,
      title: "Relief Cell",
      description: "Provides financial aid and support to underprivileged students, fostering a culture of compassion and solidarity.",
      category: "welfare",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-600",
      emoji: "❤️",
      features: ["Financial Aid", "Student Support", "Compassion & Solidarity"],
      image: "/https://idsb.tmgrup.com.tr/ly/uploads/images/2025/06/13/thumbs/1200x675/386791.jpg?v=1749817932v",
      chairman: {
        name: "Abdullah Aziz",
        image: "https://idsb.tmgrup.com.tr/ly/uploads/images/2025/06/13/thumbs/1200x675/386791.jpg?v=1749817932v",
        department: "Arabic Language",
        location: "abdullah.aziz@jamianooriya.edu",
        phone: "+91 98765 43230"
      },
      convener: {
        name: "Khadija Noor",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
        department: "Urdu Literature",
        location: "khadija.noor@jamianooriya.edu",
        phone: "+91 98765 43231"
      },
      members: [
        { name: "Yusuf Hassan", role: "Writing Coach", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop" },
        { name: "Ruqayyah Ali", role: "Poetry Mentor", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
        { name: "Salman Farooq", role: "Language Tutor", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Published 2 poetry anthologies",
        "Conducted 30+ writing workshops",
        "Mentored 80+ aspiring writers"
      ],
      upcomingEvents: [
        { title: "Poetry Slam", date: "December 28, 2024" },
        { title: "Creative Writing Retreat", date: "February 15, 2025" }
      ],
      established: "2013",
      totalMembers: 30
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Fathwa Council",
      description: "Addresses students' Islamic jurisprudence-related doubts and questions with scholarly guidance.",
      category: "spiritual",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-600",
      emoji: "📜",
      features: ["Islamic Jurisprudence", "Scholarly Guidance", "Religious Consultation"],
      image: "https://png.pngtree.com/thumb_back/fh260/background/20240403/pngtree-ai-generated-scales-justice-judiciary-glow-in-the-dark-background-image_15647479.jpg",
      chairman: {
        name: "Basil Ashkari",
        image: "https://idsb.tmgrup.com.tr/ly/uploads/images/2025/06/13/386791.jpg",
        department: "Thafseer Department",
        location: "Melmuri",
        phone: "+91 8714510441"
      },
      convener: {
        name: "PK Shafeeq",
        image: "/images/subwing/fathwa-conveener.webp",
        department: "Thafseer Department",
        location: "Edayattur",
        phone: "+91 8594016311"
      },
      members: [
        { name: "Yusuf Hassan", role: "Writing Coach", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop" },
        { name: "Ruqayyah Ali", role: "Poetry Mentor", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
        { name: "Salman Farooq", role: "Language Tutor", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Published 2 poetry anthologies",
        "Conducted 30+ writing workshops",
        "Mentored 80+ aspiring writers"
      ],
      upcomingEvents: [
        { title: "Poetry Slam", date: "December 28, 2024" },
        { title: "Creative Writing Retreat", date: "February 15, 2025" }
      ],
      established: "2013",
      totalMembers: 30
    },
    {
      icon: <Scroll className="w-6 h-6" />,
      title: "Thurasa Committee",
      description: "Dedicated to preserving the writings and legacy of classical Islamic scholars and pioneers.",
      category: "cultural",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-600",
      emoji: "🌱",
      features: ["Heritage Preservation", "Islamic Scholars", "Legacy Conservation"],
      image: "/images/thurasa-committee.jpg",
      chairman: {
        name: "Hafiz Muhammed Sahad",
        image: "/images/subwing/thurasa-chireman.webp",
        department: "Aqeeda Department",
        location: "Pappinissery",
        phone: "+91 9544923727"
      },
      convener: {
        name: "Salman Faris Bishri",
        image: "/images/subwing/thurasa-conveener.webp",
        department: "Hadeeth Department",
        location: "Tirur",
        phone: "+91 7592877161"
      },
      members: [
        { name: "Yusuf Hassan", role: "Writing Coach", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop" },
        { name: "Ruqayyah Ali", role: "Poetry Mentor", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
        { name: "Salman Farooq", role: "Language Tutor", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Published 2 poetry anthologies",
        "Conducted 30+ writing workshops",
        "Mentored 80+ aspiring writers"
      ],
      upcomingEvents: [
        { title: "Poetry Slam", date: "December 28, 2024" },
        { title: "Creative Writing Retreat", date: "February 15, 2025" }
      ],
      established: "2013",
      totalMembers: 30
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Social Affairs",
      description: "Works to maintain a clean, organized, and harmonious campus and surrounding environment through student-led initiatives.",
      category: "welfare",
      color: "from-green-500 to-lime-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-600",
      emoji: "🕌",
      features: ["Campus Environment", "Student Initiatives", "Community Harmony"],
      image: "/images/social-affairs-wing.jpg",
      chairman: {
        name: "Muhammed Naseem OT",
        image: "/images/subwing/social-chireman.webp",
        department: "General Department",
        location: "Puthupparamba",
        phone: "+91 9633945733"
      },
      convener: {
        name: "Muhammed Safwan ",
        image: "/images/subwing/social-conveener.webp",
        department: "General Department",
        location: "Oravampuram",
        phone: "+91 9539621241"
      },
      members: [
        { name: "Muhammed Najahudheen", role: "Join Conveener", image: "/images/subwing/social-j-conveener.webp" },
        { name: "Ruqayyah Ali", role: "Poetry Mentor", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop" },
        { name: "Salman Farooq", role: "Language Tutor", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" }
      ],
      achievements: [
        "Published 2 poetry anthologies",
        "Conducted 30+ writing workshops",
        "Mentored 80+ aspiring writers"
      ],
      upcomingEvents: [
        { title: "Poetry Slam", date: "December 28, 2024" },
        { title: "Creative Writing Retreat", date: "February 15, 2025" }
      ],
      established: "2013",
      totalMembers: 30
    },

  ]

  const categories = [
    { id: 'all', label: 'All Wings', icon: <Star className="w-4 h-4" /> },
    { id: 'academic', label: 'Academic', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'spiritual', label: 'Spiritual', icon: <Heart className="w-4 h-4" /> },
    { id: 'cultural', label: 'Cultural', icon: <Theater className="w-4 h-4" /> },
    { id: 'media', label: 'Media', icon: <Video className="w-4 h-4" /> },
    { id: 'welfare', label: 'Welfare', icon: <HandHeart className="w-4 h-4" /> }
  ]

  const filteredWings = selectedCategory === 'all'
    ? subWings
    : subWings.filter(wing => wing.category === selectedCategory)

  const totalPages = Math.ceil(filteredWings.length / itemsPerPage)
  const currentWings = filteredWings.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWing((prev) => (prev + 1) % currentWings.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [currentWings.length])

  useEffect(() => {
    setCurrentPage(0)
    setActiveWing(0)
  }, [selectedCategory])

  const WingDetailModal = ({ wing, onClose }: { wing: any, onClose: any }) => {
    if (!wing) return null

    const currentIndex = filteredWings.findIndex((w: any) => w.title === wing.title)
    const hasPrevious = currentIndex > 0
    const hasNext = currentIndex < filteredWings.length - 1

    // Dispatch cursor color change event when modal opens or wing changes
    useEffect(() => {
      if (wing) {
        const event = new CustomEvent('cursorColorChange', {
          detail: { color: wing.color }
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
    }, [wing]);

    const handlePrevious = (e: any) => {
      e.stopPropagation()
      if (hasPrevious) {
        setSelectedWing(filteredWings[currentIndex - 1])
      }
    }

    const handleNext = (e: any) => {
      e.stopPropagation()
      if (hasNext) {
        setSelectedWing(filteredWings[currentIndex + 1])
      }
    }

    return (
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn overflow-y-auto"
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
          className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-slideUp my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={wing.image}
              alt={wing.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${wing.color} opacity-40`} />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-300 hover:rotate-90 group shadow-lg z-10"
            >
              <X className="w-5 h-5 text-gray-700 group-hover:text-red-500 transition-colors" />
            </button>

            {/* Progress Indicator */}
            <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 rounded-full shadow-lg">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Star className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Wing {currentIndex + 1} of {filteredWings.length}</span>
              </div>
            </div>

            {/* Wing Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-4 mb-3">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${wing.color} text-white shadow-xl`}>
                  {wing.icon}
                </div>
                <span className="text-5xl">{wing.emoji}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{wing.title}</h2>
              <p className="text-white/90 text-lg">Established {wing.established} • {wing.totalMembers} Active Members</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Wing</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{wing.fullDescription}</p>
            </div>

            {/* Leadership Team */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-600" />
                Leadership Team
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Chairman */}
                <div className={`bg-gradient-to-br ${wing.bgColor} border-2 ${wing.borderColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={wing.chairman.image}
                      alt={wing.chairman.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <div className={`text-xs font-semibold ${wing.textColor} uppercase mb-1`}>Chairman</div>
                      <h4 className="text-xl font-bold text-gray-900">{wing.chairman.name}</h4>
                      <p className="text-sm text-gray-600">{wing.chairman.department}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span className="truncate">{wing.chairman.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span>{wing.chairman.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Convener */}
                <div className={`bg-gradient-to-br ${wing.bgColor} border-2 ${wing.borderColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={wing.convener.image}
                      alt={wing.convener.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <div className={`text-xs font-semibold ${wing.textColor} uppercase mb-1`}>Convener</div>
                      <h4 className="text-xl font-bold text-gray-900">{wing.convener.name}</h4>
                      <p className="text-sm text-gray-600">{wing.convener.department}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span className="truncate">{wing.convener.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span>{wing.convener.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wing Members */}

            {/* <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-600" />
                Wing Members
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {wing.members.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-100 rounded-lg p-2 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 group"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square rounded-md object-cover mb-2 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h4 className="font-semibold text-gray-900 text-xs mb-0.5 truncate">{member.name}</h4>
                    <p className="text-[10px] text-gray-600 truncate">{member.role}</p>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Achievements & Features */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Achievements */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Key Achievements
                </h3>
                <div className="space-y-3">
                  {wing.achievements.map((achievement: any, index: number) => (
                    <div key={index} className="flex items-start gap-3 bg-emerald-50 rounded-lg p-3">
                      <Sparkles className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {wing.features.map((feature: any, index: number) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-br ${wing.bgColor} border ${wing.borderColor} rounded-xl p-4 hover:shadow-md transition-all duration-300`}
                    >
                      <div className="flex  items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${wing.color}`} />
                        <span className="text-gray-700 font-medium text-sm">{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>



            {/* CTA Button */}
            <div className="text-center pt-6 border-t border-gray-200">
              <button onClick={onClose}
                className={`inline-flex items-center gap-3 bg-gradient-to-r ${wing.color} text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Wing</span>
                
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
      id="subwings-section"
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
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23059669\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M40 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm20 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z\'/%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4 animate-bounce-slow">
            <Star className="w-4 h-4 animate-pulse" />
            16 Specialized Divisions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Sub Wings</span>
          </h2>
          <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-6 animate-expand" />
          <p className="text-base sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover our diverse sub-wings, each dedicated to nurturing specific talents and interests while staying true to our Islamic values
          </p>
        </div>

        {/* Category Filter */}
        <div className={`mb-12 sm:mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <div className="flex items-center justify-center mb-6">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-gray-600 font-medium">Filter by Category</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${selectedCategory === category.id
                  ? 'bg-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200 hover:border-emerald-200'
                  }`}
              >
                {category.icon}
                <span>{category.label}</span>
                {selectedCategory === category.id && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Wing Spotlight */}
        {currentWings.length > 0 && (
          <div 
            className={`mb-16 sm:mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            onMouseEnter={() => {
              const event = new CustomEvent('cursorColorChange', {
                detail: { color: currentWings[activeWing]?.color }
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
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content */}
                <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${currentWings[activeWing]?.color} text-white shadow-lg`}>
                        {currentWings[activeWing]?.icon}
                      </div>
                      <span className="text-4xl">{currentWings[activeWing]?.emoji}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      {currentWings[activeWing]?.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {currentWings[activeWing]?.description}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-gray-900">Key Features:</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {currentWings[activeWing]?.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentWings[activeWing]?.color}`} />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedWing(currentWings[activeWing])}
                    className={`inline-flex items-center gap-3 bg-gradient-to-r ${currentWings[activeWing]?.color} text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-fit group`}
                  >
                    <span>Explore {currentWings[activeWing]?.title}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                {/* Image */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 min-h-[300px] lg:min-h-[500px]">
                  <img
                    src={currentWings[activeWing]?.image}
                    alt={currentWings[activeWing]?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${currentWings[activeWing]?.color} opacity-20`} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wings Grid */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {currentWings.map((wing, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-500 hover:scale-105 transform rounded-2xl relative overflow-hidden ${index === activeWing ? 'scale-105' : ''
                  }`}
                onClick={() => setActiveWing(index)}
                onMouseEnter={() => {
                  const event = new CustomEvent('cursorColorChange', {
                    detail: { color: wing.color }
                  });
                  window.dispatchEvent(event);
                }}
                onMouseLeave={() => {
                  const resetEvent = new CustomEvent('cursorColorChange', {
                    detail: { color: 'from-emerald-500 to-teal-500' }
                  });
                  window.dispatchEvent(resetEvent);
                }}
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              >
                <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${index === activeWing ? wing.borderColor : 'border-gray-100 hover:border-gray-200'
                  }`}>
                  {/* Card Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden rounded-t-2xl">
                    <img
                      src={wing.image}
                      alt={wing.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${wing.color} opacity-20 transition-opacity duration-500`} />
                  </div>

                  {/* Card Header */}
                  <div className={`${wing.bgColor} p-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${wing.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {wing.icon}
                      </div>
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {wing.emoji}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold ${wing.textColor} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                      {wing.title}
                    </h3>
                    <div className={`w-12 h-1 bg-gradient-to-r ${wing.color} rounded-full`} />
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {wing.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {wing.features.slice(0, 2).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${wing.color}`} />
                          <span className="text-xs text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWing(wing);
                      }}
                      className={`w-full bg-gradient-to-r ${wing.color} text-white py-3 px-4 rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 transform`}
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </div>

                  {/* Active Indicator */}
                  {index === activeWing && (
                    <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg z-10" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${currentPage === i
                      ? 'bg-emerald-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-emerald-50 border border-gray-200'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className={`mt-16 sm:mt-20 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 sm:p-12 border border-emerald-100">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Join Our Thriving Community
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-2">16</div>
                <div className="text-gray-600 text-sm sm:text-base">Active Wings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-teal-600 mb-2">500+</div>
                <div className="text-gray-600 text-sm sm:text-base">Participants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-600 mb-2">100+</div>
                <div className="text-gray-600 text-sm sm:text-base">Annual Programs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">38+</div>
                <div className="text-gray-600 text-sm sm:text-base">Years Legacy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wing Detail Modal */}
      {selectedWing && (
        <WingDetailModal wing={selectedWing} onClose={() => setSelectedWing(null)} />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(40px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 8rem;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
        
        .animate-expand {
          animation: expand 1s ease-out;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default SubWingsSection