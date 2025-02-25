import User from "../../models/userModel.js";
import Report from "../../models/reportModel.js"
import { v4 } from "uuid";
import { ErrorHandler } from "../../utils/errorHandler.js";

export default async function reportUser(_: any, { input }: any, context: any) {
    try {
        const { userId } = context.me;
        if (!userId) return new Error("Please login");
        const {
            reportUser,
            message
        }: any = input;

        const userExist = await User.findOne({ _id: reportUser, isBanned:false });
        if (!userExist) {
            return new ErrorHandler("user not found","USER_NOT_FOUND");
        }

        const reportExists = await Report.findOne({ userId: reportUser });
        if (!reportExists) {
            await Report.create({
                _id: v4(),
                userId:reportUser,
                reports: [
                    {
                        reportedBy: userId,
                        message,
                        reportedAt: Date.now()
                    }
                ]
            })
            return true;
        }else{
            const updateReport = await Report.findOneAndUpdate({userId: reportUser},{
                $push:{
                    reports:{
                        reportedBy:userId,
                        message,
                        reportedAt:Date.now()
                    }
                }
            });

            if(updateReport){
                if(updateReport.reports.length > 20){
                    await User.updateOne({_id:reportUser},{
                        $set:{
                            isBanned:true
                        }
                    })
                }
                return true;
            }
        }
        return false;
    } catch (e) {
        throw e;
    }
}
