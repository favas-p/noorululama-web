
'use client';

import { useState } from 'react';
import { LogOut, Activity, Megaphone, Image as ImageIcon, Home as HomeIcon, Users, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AnnouncementManager from '@/components/admin/AnnouncementManager';
import BannerManager from '@/components/admin/BannerManager';
import CoreMemberManager from '@/components/admin/CoreMemberManager';
import SubWingLeaderManager from '@/components/admin/SubWingLeaderManager';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'announcements' | 'banners' | 'core' | 'subwings'>('announcements');
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <nav className="bg-slate-900 border-b border-slate-800 p-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <Activity className="text-emerald-500" />
                        Admin Portal
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                            <HomeIcon className="w-4 h-4" /> Home
                        </Link>
                        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 flex-wrap">
                            <button
                                onClick={() => setActiveTab('announcements')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${activeTab === 'announcements'
                                    ? 'bg-slate-800 text-white shadow-lg'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <Megaphone className="w-4 h-4" />
                                Announcements
                            </button>
                            <button
                                onClick={() => setActiveTab('banners')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${activeTab === 'banners'
                                    ? 'bg-slate-800 text-white shadow-lg'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <ImageIcon className="w-4 h-4" />
                                Banners
                            </button>
                            <button
                                onClick={() => setActiveTab('core')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${activeTab === 'core'
                                    ? 'bg-slate-800 text-white shadow-lg'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <Users className="w-4 h-4" />
                                Core Committee
                            </button>
                            <button
                                onClick={() => setActiveTab('subwings')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${activeTab === 'subwings'
                                    ? 'bg-slate-800 text-white shadow-lg'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <Award className="w-4 h-4" />
                                Sub-Wings
                            </button>
                        </div>
                        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto p-4 sm:p-8">
                {activeTab === 'announcements' && <AnnouncementManager />}
                {activeTab === 'banners' && <BannerManager />}
                {activeTab === 'core' && <CoreMemberManager />}
                {activeTab === 'subwings' && <SubWingLeaderManager />}
            </main>
        </div>
    );
}

