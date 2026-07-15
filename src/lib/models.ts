
import mongoose, { Schema, model, models } from 'mongoose';

const AnnouncementSchema = new Schema({
    text: { type: String, required: true },
    link: { type: String },
    label: { type: String, default: 'New' },
    isActive: { type: Boolean, default: true },
    priority: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Announcement = models.Announcement || model('Announcement', AnnouncementSchema);

const BannerSchema = new Schema({
    imageUrl: { type: String, required: true },
    link: { type: String },
    title: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

const Banner = models.Banner || model('Banner', BannerSchema);

const CoreMemberSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    category: { type: String, required: true }, // e.g. leadership, secretaries, coordinators
    department: { type: String },
    year: { type: String },
    image: { type: String },
    bio: { type: String },
    location: { type: String },
    phone: { type: String },
    responsibilities: { type: [String], default: [] },
    color: { type: String, default: 'from-blue-500 to-indigo-600' },
    priority: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const CoreMember = models.CoreMember || model('CoreMember', CoreMemberSchema);

const SubWingLeaderSchema = new Schema({
    subWingTitle: { type: String, required: true, unique: true },
    chairman: {
        name: { type: String, default: '' },
        image: { type: String, default: '' },
        department: { type: String, default: '' },
        location: { type: String, default: '' },
        phone: { type: String, default: '' }
    },
    convener: {
        name: { type: String, default: '' },
        image: { type: String, default: '' },
        department: { type: String, default: '' },
        location: { type: String, default: '' },
        phone: { type: String, default: '' }
    },
    updatedAt: { type: Date, default: Date.now }
});

const SubWingLeader = models.SubWingLeader || model('SubWingLeader', SubWingLeaderSchema);

export { Announcement, Banner, CoreMember, SubWingLeader };

