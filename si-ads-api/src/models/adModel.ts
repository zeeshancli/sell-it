import mongoose from 'mongoose'

export interface AdInput extends mongoose.Document {

    userId: String,
    category: String,
    subCategory: String,
    views: String,
    likes: String,
    title: String,
    price: String,
    description: String,
    isNegotiable: Boolean,
    subFields: JSON,
    specialKeywords: [String],
    images: [String],
    videos: [String],
    thumbnail: String
    adLocation: { type: String },
    coordinates: [],
    adAddress: String,
    isPremium: Boolean,
    isDeleted: Boolean,
    isArchived: Boolean,
    isSold: Boolean,
    isExpired: Boolean,
    isSuspended: Boolean,
    isPending: Boolean,
    ad_expire_date: String,
    profanityCheck: JSON,
    createdAt: Date;
    updatedAt: Date;
    searchKeyword: String;
}

const adSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
        default: 0
    },
    description: {
        type: String,
    },
    isNegotiable: {
        type: Boolean,
        default: true
    },
    subFields: {
        type: Object,
        default: {}
    },
    specialKeywords: [
        {
            type: String,
            required: false
        },
    ],
    images: {
        type: Array,
        default: [],
    },
    videos: {
        type: Array,
        default: [],
    },
    thumbnail: {
        type: String
    },
    adLocation: {
        type: { type: String },
        coordinates: [],
        default: {}
    },
    adAddress: {
        type: String,
    },
    adStatus: {
        type: String,
        enum: [
            "Selling",
            "Archived",
            "Sold",
            "Deleted",
            "Draft",
            "Expired",
            "Reposted",
            "Suspended",
            "Pending"
        ],
        default: "Selling"

    },
    isPremium: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
    },
    archivedAt: {
        type: Date,
    },
    soldAt: {
        type: Date,
    },
    expiredAt: {
        type: Date,
    },
    suspendedAt: {
        type: Date,
    },
    searchKeyword: {
        type: String,
    },
    profanityCheck: [
        {
            type: Object,
            default: {}
        }
    ],
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date
    },
})

const AdModel = mongoose.model<AdInput>('Ad', adSchema);

export default AdModel