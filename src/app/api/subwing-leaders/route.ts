import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { SubWingLeader } from '@/lib/models';

const INITIAL_SUBWING_LEADERS = [
    {
        subWingTitle: "Samajam",
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
        }
    },
    {
        subWingTitle: "Al-Muneer",
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
        }
    },
    {
        subWingTitle: "Library Team",
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
        }
    },
    {
        subWingTitle: "Media Wing",
        chairman: {
            name: "Mishab MK",
            image: "/images/subwing/media-chireman.webp",
            department: "General Department",
            location: "Mannarkkad",
            phone: "+91 62386 61924"
        },
        convener: {
            name: "Fazil ",
            image: "/images/subwing/media-conveener.webp",
            department: "Aqeeda Department",
            location: "Wayanad",
            phone: "+91 98474 24702"
        }
    },
    {
        subWingTitle: "Al-Munazara",
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
        }
    },
    {
        subWingTitle: "Sargaposhini",
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
        }
    },
    {
        subWingTitle: "Thansheethul Qurrah",
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
        }
    },
    {
        subWingTitle: "Majlisunnoor",
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
        }
    },
    {
        subWingTitle: "Da'wa Committee",
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
        }
    },
    {
        subWingTitle: "Medical Wing",
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
        }
    },
    {
        subWingTitle: "Al-Hikma",
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
        }
    },
    {
        subWingTitle: "Publishing Bureau",
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
        }
    },
    {
        subWingTitle: "Relief Cell",
        chairman: {
            name: "Abdullah Aziz",
            image: "/images/subwing/reliefcell-chireman.webp",
            department: "Arabic Language",
            location: "abdullah.aziz@jamianooriya.edu",
            phone: "+91 98765 43230"
        },
        convener: {
            name: "Khadija Noor",
            image: "/images/subwing/reliefcell-conveener.webp",
            department: "Urdu Literature",
            location: "khadija.noor@jamianooriya.edu",
            phone: "+91 98765 43231"
        }
    },
    {
        subWingTitle: "Fathwa Council",
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
        }
    },
    {
        subWingTitle: "Thurasa Committee",
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
        }
    },
    {
        subWingTitle: "Social Affairs",
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
        }
    }
];

export async function GET() {
    try {
        await dbConnect();
        let count = await SubWingLeader.countDocuments();
        if (count === 0) {
            await SubWingLeader.insertMany(INITIAL_SUBWING_LEADERS);
        }
        
        const leaders = await SubWingLeader.find({});
        return NextResponse.json({ success: true, data: leaders });
    } catch (error) {
        console.error('Error fetching subwing leaders:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch subwing leaders' }, { status: 500 });
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
        const { subWingTitle, chairman, convener } = body;
        
        if (!subWingTitle) {
            return NextResponse.json({ success: false, error: 'subWingTitle is required' }, { status: 400 });
        }

        const updatedLeader = await SubWingLeader.findOneAndUpdate(
            { subWingTitle },
            { chairman, convener, updatedAt: new Date() },
            { upsert: true, new: true }
        );

        return NextResponse.json({ success: true, data: updatedLeader });
    } catch (error) {
        console.error('Error updating subwing leader:', error);
        return NextResponse.json({ success: false, error: 'Failed to update subwing leader' }, { status: 400 });
    }
}
