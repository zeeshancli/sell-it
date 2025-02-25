import mongoose from "mongoose";

export interface ReportInput extends mongoose.Document {
    adId: String,
    reports: [],
    createdAt: Date
}

const reportSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    adId: {
        type: String
    },
    reports: [{
        reportedBy: {
            type: String
        },
        message: {
            type: String,
            enum: [
                "Fraud",
                "Inappropriate",
                "Bullying/Harrasment",
                "Fake Ad",
                "Copy Rights Violation",
                "Spam",
                "Nudity/NSFW",
                "Others"
            ]
        },
        reportedAt: {
            type: Date
        }
    }],
    createdAt: {
        type: Date
    }
});

const Report = mongoose.model<ReportInput>("report",reportSchema);

export default Report;