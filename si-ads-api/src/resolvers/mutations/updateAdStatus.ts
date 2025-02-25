import AdModel from "../../models/adModel.js";


export default async function updateAdStatus(_: any, { input }: any, context: any) {
    try {
        const { userId } = context.me;
        if (!userId) return new Error("Please login");
        const {
            id,
            status
        } = input;
        const Ad = AdModel.findById({ _id: id });
        if (!Ad) return new Error("Ad does not exist");
        switch (status) {
            case "Sold":
                await AdModel.updateOne({ _id: id }, {
                    $set: {
                        adStatus: "Sold",
                        soldAt: new Date(),
                    }
                });
                return true
            case "Archived":
                await AdModel.updateOne({ _id: id }, {
                    $set: {
                        adStatus: "Archived",
                        archivedAr: new Date(),
                    }
                });
                return true
            case "Deleted":
                await AdModel.updateOne({ _id: id }, {
                    $set: {
                        adStatus: "Deleted",
                        deletedAt: new Date(),
                    }
                });
                return true
            default:
                return new Error("Something went wrong");
        }
    } catch (e) {
        return new Error(e);
    }
}