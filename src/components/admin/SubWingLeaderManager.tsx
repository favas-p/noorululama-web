'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Upload, X, Save, CheckCircle2 } from 'lucide-react';

interface LeaderDetails {
    name: string;
    image: string;
    department: string;
    location: string;
    phone: string;
}

interface SubWingLeader {
    subWingTitle: string;
    chairman: LeaderDetails;
    convener: LeaderDetails;
}

const SUB_WINGS_LIST = [
    "Samajam",
    "Al-Muneer",
    "Library Team",
    "Media Wing",
    "Al-Munazara",
    "Sargaposhini",
    "Thansheethul Qurrah",
    "Majlisunnoor",
    "Da'wa Committee",
    "Medical Wing",
    "Al-Hikma",
    "Publishing Bureau",
    "Relief Cell",
    "Fathwa Council",
    "Thurasa Committee",
    "Social Affairs"
];

const initialLeaderDetails = (): LeaderDetails => ({
    name: '',
    image: '',
    department: '',
    location: '',
    phone: ''
});

export default function SubWingLeaderManager() {
    const [leadersMap, setLeadersMap] = useState<Record<string, SubWingLeader>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedWing, setSelectedWing] = useState(SUB_WINGS_LIST[0]);
    const [successMessage, setSuccessMessage] = useState('');

    const [chairmanForm, setChairmanForm] = useState<LeaderDetails>(initialLeaderDetails());
    const [convenerForm, setConvenerForm] = useState<LeaderDetails>(initialLeaderDetails());
    const [uploadingRole, setUploadingRole] = useState<'chairman' | 'convener' | null>(null);

    const fetchLeaders = async () => {
        try {
            const res = await axios.get('/api/subwing-leaders');
            if (res.data.success) {
                const data: SubWingLeader[] = res.data.data;
                const map: Record<string, SubWingLeader> = {};
                data.forEach(item => {
                    map[item.subWingTitle] = item;
                });
                setLeadersMap(map);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaders();
    }, []);

    // Update forms when selected wing or loaded data changes
    useEffect(() => {
        const wingData = leadersMap[selectedWing];
        if (wingData) {
            setChairmanForm(wingData.chairman || initialLeaderDetails());
            setConvenerForm(wingData.convener || initialLeaderDetails());
        } else {
            setChairmanForm(initialLeaderDetails());
            setConvenerForm(initialLeaderDetails());
        }
    }, [selectedWing, leadersMap]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, role: 'chairman' | 'convener') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingRole(role);
        try {
            const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
                method: 'POST',
                body: file,
                headers: {
                    'content-type': file.type,
                },
            });
            const data = await res.json();
            if (data.success) {
                if (role === 'chairman') {
                    setChairmanForm(prev => ({ ...prev, image: data.url }));
                } else {
                    setConvenerForm(prev => ({ ...prev, image: data.url }));
                }
            } else {
                alert('Upload failed: ' + data.error);
            }
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        } finally {
            setUploadingRole(null);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMessage('');

        const payload = {
            subWingTitle: selectedWing,
            chairman: chairmanForm,
            convener: convenerForm
        };

        try {
            const res = await axios.post('/api/subwing-leaders', payload);
            if (res.data.success) {
                // Update local cache
                setLeadersMap(prev => ({
                    ...prev,
                    [selectedWing]: res.data.data
                }));
                setSuccessMessage('Successfully updated leaders for ' + selectedWing + '!');
                setTimeout(() => setSuccessMessage(''), 4000);
            }
        } catch (err) {
            alert('Failed to save subwing leaders');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="text-center py-10 text-slate-500 flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" /> Loading sub-wing leaders...
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">Sub-Wing Leaders</h2>
                        <p className="text-sm text-slate-400">Select a sub-wing to update its Chairman and Convener details.</p>
                    </div>
                    <div className="w-full sm:w-64">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Select Sub-Wing</label>
                        <select
                            value={selectedWing}
                            onChange={e => setSelectedWing(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm font-semibold"
                        >
                            {SUB_WINGS_LIST.map(wing => (
                                <option key={wing} value={wing}>{wing}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {successMessage && (
                    <div className="bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl mb-6 flex items-center gap-2.5 text-sm font-semibold animate-pulse">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSave} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* CHAIRMAN CARD */}
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                            <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Chairman Details</span>
                                {chairmanForm.name && <span className="text-[10px] bg-slate-800 border border-slate-700 text-slate-400 px-2 py-0.5 rounded-full font-bold">Active</span>}
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={chairmanForm.name}
                                    onChange={e => setChairmanForm({ ...chairmanForm, name: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                    placeholder="e.g. Sayyid Abdul Basith"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Department</label>
                                <input
                                    type="text"
                                    value={chairmanForm.department}
                                    onChange={e => setChairmanForm({ ...chairmanForm, department: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                    placeholder="e.g. General Department"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Location</label>
                                    <input
                                        type="text"
                                        value={chairmanForm.location}
                                        onChange={e => setChairmanForm({ ...chairmanForm, location: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                        placeholder="e.g. Omassery"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        value={chairmanForm.phone}
                                        onChange={e => setChairmanForm({ ...chairmanForm, phone: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                        placeholder="e.g. +91 77366 16265"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Chairman Photo</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={chairmanForm.image}
                                        onChange={e => setChairmanForm({ ...chairmanForm, image: e.target.value })}
                                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                        placeholder="/images/subwing/da'wa-chireman.webp"
                                    />
                                    <label className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center border border-slate-700 transition-all flex-shrink-0">
                                        {uploadingRole === 'chairman' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={e => handleImageUpload(e, 'chairman')}
                                            disabled={uploadingRole !== null}
                                        />
                                    </label>
                                </div>
                                {chairmanForm.image && (
                                    <div className="mt-2 relative w-16 h-16 rounded-full overflow-hidden border border-slate-800">
                                        <img src={chairmanForm.image} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setChairmanForm({ ...chairmanForm, image: '' })}
                                            className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CONVENER CARD */}
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                            <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Convener Details</span>
                                {convenerForm.name && <span className="text-[10px] bg-slate-800 border border-slate-700 text-slate-400 px-2 py-0.5 rounded-full font-bold">Active</span>}
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={convenerForm.name}
                                    onChange={e => setConvenerForm({ ...convenerForm, name: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                    placeholder="e.g. Saleel Babu"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Department</label>
                                <input
                                    type="text"
                                    value={convenerForm.department}
                                    onChange={e => setConvenerForm({ ...convenerForm, department: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                    placeholder="e.g. Lugha Department"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Location</label>
                                    <input
                                        type="text"
                                        value={convenerForm.location}
                                        onChange={e => setConvenerForm({ ...convenerForm, location: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                        placeholder="e.g. Emangadu"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        value={convenerForm.phone}
                                        onChange={e => setConvenerForm({ ...convenerForm, phone: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                        placeholder="e.g. +91 75108 16272"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Convener Photo</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={convenerForm.image}
                                        onChange={e => setConvenerForm({ ...convenerForm, image: e.target.value })}
                                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                        placeholder="/images/subwing/da'wa-conveener.webp"
                                    />
                                    <label className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center border border-slate-700 transition-all flex-shrink-0">
                                        {uploadingRole === 'convener' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={e => handleImageUpload(e, 'convener')}
                                            disabled={uploadingRole !== null}
                                        />
                                    </label>
                                </div>
                                {convenerForm.image && (
                                    <div className="mt-2 relative w-16 h-16 rounded-full overflow-hidden border border-slate-800">
                                        <img src={convenerForm.image} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setConvenerForm({ ...convenerForm, image: '' })}
                                            className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-800">
                        <button
                            type="submit"
                            disabled={saving || uploadingRole !== null}
                            className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-emerald-950/20"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save {selectedWing} Leaders
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
