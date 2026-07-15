import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { CoreMember } from '@/lib/models';

const INITIAL_CORE_MEMBERS = [
    {
        name: "Sayyid Adnan Hydrosi Al-Juvaini",
        role: "President",
        category: "leadership",
        department: "Aqeeda Department",
        year: "Final Year",
        image: "/images/core/president.webp",
        bio: "Leading the union with vision and dedication to student welfare and academic excellence.",
        location: "Koonammoochi",
        phone: "+91 99479 01269",
        responsibilities: ["Overall union leadership", "Strategic planning", "Student representation"],
        color: "from-blue-500 to-indigo-600",
        priority: 70
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
        responsibilities: ["Administrative coordination", "Meeting management", "Documentation"],
        color: "from-emerald-500 to-teal-600",
        priority: 60
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
        responsibilities: ["Financial management", "Budget planning", "Financial reporting"],
        color: "from-purple-500 to-pink-600",
        priority: 50
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
        responsibilities: ["Academic coordination", "Program oversight", "Leadership support"],
        color: "from-orange-500 to-red-600",
        priority: 40
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
        responsibilities: ["Cultural programs", "Student welfare", "Event coordination"],
        color: "from-cyan-500 to-blue-600",
        priority: 30
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
        responsibilities: ["Administrative support", "Documentation", "Meeting coordination"],
        color: "from-pink-500 to-rose-600",
        priority: 20
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
        responsibilities: ["Communication management", "Record keeping", "Event assistance"],
        color: "from-green-500 to-emerald-600",
        priority: 10
    }
];

export async function GET() {
    try {
        await dbConnect();
        let count = await CoreMember.countDocuments();
        if (count === 0) {
            await CoreMember.insertMany(INITIAL_CORE_MEMBERS);
        }
        
        const members = await CoreMember.find({}).sort({ priority: -1, createdAt: 1 });
        return NextResponse.json({ success: true, data: members });
    } catch (error) {
        console.error('Error fetching core members:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch core members' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();
        const body = await req.json();
        const newMember = await CoreMember.create({
            ...body,
            createdAt: new Date(),
        });
        return NextResponse.json({ success: true, data: newMember }, { status: 201 });
    } catch (error) {
        console.error('Error creating core member:', error);
        return NextResponse.json({ success: false, error: 'Failed to create core member' }, { status: 400 });
    }
}
