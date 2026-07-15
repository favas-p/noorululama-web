'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Edit2, CheckCircle, ExternalLink, Loader2, X, Upload } from 'lucide-react';

interface CoreMember {
    _id?: string;
    name: string;
    role: string;
    category: 'leadership' | 'secretaries' | 'coordinators';
    department: string;
    year: string;
    image: string;
    bio: string;
    location: string;
    phone: string;
    responsibilities: string[];
    color: string;
    priority: number;
}

export default function CoreMemberManager() {
    const [members, setMembers] = useState<CoreMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const emptyForm: Omit<CoreMember, '_id'> = {
        name: '',
        role: '',
        category: 'leadership',
        department: '',
        year: 'Final Year',
        image: '',
        bio: '',
        location: '',
        phone: '',
        responsibilities: [],
        color: 'from-blue-500 to-indigo-600',
        priority: 0
    };

    const [formData, setFormData] = useState<Omit<CoreMember, '_id'>>(emptyForm);
    const [respInput, setRespInput] = useState('');

    const fetchMembers = async () => {
        try {
            const res = await axios.get('/api/core-members');
            if (res.data.success) {
                setMembers(res.data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
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
                setFormData(prev => ({ ...prev, image: data.url }));
            } else {
                alert('Upload failed: ' + data.error);
            }
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (member: CoreMember) => {
        setEditingId(member._id || null);
        setFormData({
            name: member.name,
            role: member.role,
            category: member.category,
            department: member.department || '',
            year: member.year || 'Final Year',
            image: member.image || '',
            bio: member.bio || '',
            location: member.location || '',
            phone: member.phone || '',
            responsibilities: member.responsibilities || [],
            color: member.color || 'from-blue-500 to-indigo-600',
            priority: member.priority || 0
        });
        setRespInput((member.responsibilities || []).join(', '));
        // Scroll to top of form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData(emptyForm);
        setRespInput('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Parse responsibilities
        const responsibilities = respInput
            .split(',')
            .map(r => r.trim())
            .filter(r => r.length > 0);

        const dataToSubmit = { ...formData, responsibilities };

        try {
            if (editingId) {
                await axios.put(`/api/core-members/${editingId}`, dataToSubmit);
            } else {
                await axios.post('/api/core-members', dataToSubmit);
            }
            handleCancel();
            fetchMembers();
        } catch (err) {
            alert('Failed to save core member');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this committee member?')) return;
        try {
            await axios.delete(`/api/core-members/${id}`);
            fetchMembers();
        } catch (err) {
            alert('Failed to delete member');
        }
    };

    if (loading) return (
        <div className="text-center py-10 text-slate-500 flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" /> Loading core committee...
        </div>
    );

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* ADD / EDIT FORM */}
            <div className="lg:col-span-1">
                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 sticky top-8">
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-emerald-500" />
                        {editingId ? 'Edit Committee Member' : 'Add New Member'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                placeholder="e.g. Sayyid Adnan Hydrosi"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Role / Designation</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                    placeholder="e.g. President"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                >
                                    <option value="leadership">Leadership</option>
                                    <option value="secretaries">Secretaries</option>
                                    <option value="coordinators">Coordinators</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Department</label>
                                <input
                                    type="text"
                                    value={formData.department}
                                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                    placeholder="e.g. Aqeeda Department"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Year</label>
                                <input
                                    type="text"
                                    value={formData.year}
                                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                    placeholder="e.g. Final Year"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Short Bio</label>
                            <textarea
                                value={formData.bio}
                                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                rows={2}
                                placeholder="Leading the union with vision..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                    placeholder="e.g. Koonammoochi"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                    placeholder="e.g. +91 99479 01269"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Responsibilities (comma-separated)</label>
                            <input
                                type="text"
                                value={respInput}
                                onChange={e => setRespInput(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                placeholder="Overall leadership, Strategic planning, Student representation"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Sort Priority (higher first)</label>
                                <input
                                    type="number"
                                    value={formData.priority}
                                    onChange={e => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Gradient Theme</label>
                                <select
                                    value={formData.color}
                                    onChange={e => setFormData({ ...formData, color: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                >
                                    <option value="from-blue-500 to-indigo-600">Blue-Indigo</option>
                                    <option value="from-emerald-500 to-teal-600">Emerald-Teal</option>
                                    <option value="from-purple-500 to-pink-600">Purple-Pink</option>
                                    <option value="from-orange-500 to-red-600">Orange-Red</option>
                                    <option value="from-cyan-500 to-blue-600">Cyan-Blue</option>
                                    <option value="from-pink-500 to-rose-600">Pink-Rose</option>
                                    <option value="from-green-500 to-emerald-600">Green-Emerald</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Photo Image URL or Upload</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                                    placeholder="/images/core/president.webp"
                                />
                                <label className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2.5 rounded-lg cursor-pointer flex items-center justify-center border border-slate-700 transition-all">
                                    {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            </div>
                            {formData.image && (
                                <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    <button 
                                        type="button" 
                                        onClick={() => setFormData({ ...formData, image: '' })}
                                        className="absolute top-1 right-1 p-0.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
                            >
                                {editingId ? 'Update Member' : 'Add Member'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* MEMBERS LIST */}
            <div className="lg:col-span-2 space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Core Committee Members ({members.length})</h2>
                    <div className="space-y-3">
                        {members.map(member => (
                            <div key={member._id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex gap-4 items-center justify-between hover:border-slate-700 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-800 bg-slate-900 flex-shrink-0">
                                        <img 
                                            src={member.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%231e293b' width='100' height='100'/%3E%3C/svg%3E"} 
                                            alt={member.name} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white flex items-center gap-2">
                                            {member.name}
                                            <span className="text-[10px] font-semibold bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full uppercase text-slate-400">
                                                {member.category}
                                            </span>
                                        </h3>
                                        <p className="text-sm text-emerald-500 font-medium">{member.role} • <span className="text-slate-400 text-xs">{member.department || 'No Dept'} ({member.year || 'N/A'})</span></p>
                                        {member.phone && <p className="text-xs text-slate-500 mt-0.5">📞 {member.phone}</p>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEdit(member)}
                                        className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
                                        title="Edit Member"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member._id!)}
                                        className="p-2 text-slate-400 hover:text-red-500 bg-slate-900 hover:bg-red-950/20 rounded-lg transition-colors border border-slate-800"
                                        title="Delete Member"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
