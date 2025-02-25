import User from "../../models/userModel.js"
import { v4 } from "uuid";
import pkg from 'lodash'

export default async function createUser(_: any, { input }: any, context: any) {
    const { omitBy, isNil } = pkg
    try {
        const {
            userName,
            email,
            phoneNumber,
            about,
            gender,
            city,
            dateOfBirth,
            languagePreferences,
        }: any = input;
    
        const userDoc = await User.create(omitBy({
            _id: v4(),
            userName,
            email,
            phoneNumber,
            about,
            gender,
            city,
            dateOfBirth,
            languagePreferences,
        }, isNil));
        return userDoc;
    } catch(e) {
        throw e;
    }
}