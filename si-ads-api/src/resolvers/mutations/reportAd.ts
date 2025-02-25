import { v4 } from "uuid";
import AdModel from "../../models/adModel.js";
import Report from "../../models/reportsModel.js";

export interface ReportInput {
    id: String
    message: String
};

export default async function reportAd(_: any, { input }: any, context: any) {

    try {
        const { me } = context;
        const { userId } = me;

        if (!userId) return new Error("Please login");

        const {
            id,
            message
        }: ReportInput = input;

        const Ad = await AdModel.findByIdAndUpdate({ _id: id });
        if (!Ad) return new Error("Ad doesnot exists at all");
        const reportExists = await Report.findOne({ adId: id });
        if (!reportExists) {
            await Report.create({
                _id: v4(),
                adId: id,
                reports: [
                    {
                        reportedBy: userId,
                        message,
                        reportedAt: Date.now()
                    }
                ]
            });
            return true;
        } else {
            const updateReport = await Report.findOneAndUpdate({ adId: id }, {
                $push: {
                    reports: {
                        reportedBy: userId,
                        message,
                        reportedAt: Date.now()
                    }
                }
            });

            if (updateReport && updateReport.reports.length > 20) {
                await AdModel.updateOne({ _id: id }, {
                    $set: {
                        adStatus: "Suspended",
                        suspendedAt: Date.now()
                    }
                });

            }
            return true;
        }
    } catch (e) {
        throw e;
    }
}