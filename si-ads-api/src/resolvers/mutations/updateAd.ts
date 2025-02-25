import pkg from 'lodash';
import AdModel from "../../models/adModel.js";

export interface AdInput {
    id: String
    title: String
    price: String
    description: String
    subFields: JSON
    specialKeywords: [String]
    images: [String]
    videos: [String]
    thumbnail: String
};

export default async function updateAd(_: any, { input }: any, context: any) {
    try {
        const { userId } = context.me;
        const { omitBy, isNil } = pkg;
        if (!userId) return new Error("Please login");

        const {
            id,
            title,
            price,
            description,
            subFields,
            specialKeywords,
            thumbnail,
            images,
            videos
        }: AdInput = input;

        let modifier = omitBy({
            title,
            price,
            description,
            subFields,
            specialKeywords,
            thumbnail,
            images,
            videos,
            updatedAt: new Date()
        }, isNil);

        const ad = await AdModel.updateOne(
            {
                _id: id
            }, {
            $set: modifier
        }, {
            new: true
        }
        );
        if (!ad.matchedCount) {
            return false;
        } else if (ad.matchedCount && !ad.modifiedCount) {
            return new Error('Please add new information to update');
        }
        return ad.matchedCount && ad.modifiedCount ? true : false;
    } catch (e) {
        return new Error(e);
    }
}