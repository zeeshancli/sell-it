import AdModel from "../../models/adModel.js";

export default async function getAdDetail(_: any, { id }: any, context: any) {
    try {
        const { userId } = context.me;
        if (!userId) return new Error("Please Login");
        const Ad = await AdModel.findByIdAndUpdate({ _id: id },{
            $inc:{
                views:1
            }
        });
        if (Ad) {
            return Ad;
        } else {
            return new Error("AD Not Found");
        }
    } catch (e) {
        throw e
    }
}