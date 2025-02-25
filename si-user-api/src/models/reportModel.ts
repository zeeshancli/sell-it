import mongoose from "mongoose";

export interface IReport extends mongoose.Document {
    userId: String,
    reports: [],
    createdAt: Date
}

const reportSchma = new mongoose.Schema({
    _id: {
        type: String
    },
    userId: {
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
})

const Report = mongoose.model<IReport>("reports", reportSchma);

export default Report