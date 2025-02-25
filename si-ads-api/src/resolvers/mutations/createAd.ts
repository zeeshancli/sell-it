import AdModel from '../../models/adModel.js'
import { v4 } from 'uuid'

export interface AdInput {

    category: String
    subCategory: String
    title: String
    price: String
    description: String
    isNegotiable: Boolean
    subFields: JSON
    specialKeywords: [String]
    adLocation:JSON
    adAddress:String
    images: [String]
    videos: [String]
    thumbnail: String
    createdAt: Date
    updatedAt: Date
};

export default async function createAd(_: any, { input }: any, context: any) {
    try {

        const { userId } = context.me;
        if (!userId) return new Error("Please login");
        
        input["_id"] = v4();

        const {
            category,
            subCategory,
            title,
            price,
            description,
            isNegotiable,
            subFields,
            specialKeywords,
            thumbnail,
            images,
            videos,
            adLocation,
            adAddress,
        }: AdInput = input;
        
        const subKeys: any = subFields
        
        const {
            brand,
            condition,
            color
        } = subKeys;

        const searchKeyword = [
            category,
            subCategory,
            title,
            description,
            adAddress,
            brand,
            condition,
            color
            ].join(' ')

        const adDoc = new AdModel({
            _id: input["_id"],
            userId: userId,
            category,
            subCategory,
            title,
            price,
            description,
            isNegotiable,
            subFields,
            specialKeywords,
            thumbnail,
            images,
            videos,
            adLocation,
            adAddress,
            searchKeyword,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        
        await adDoc.save();

        return adDoc;
    }catch(e){
       throw e
    }
}