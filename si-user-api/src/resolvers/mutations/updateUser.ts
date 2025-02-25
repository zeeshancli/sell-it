import pkg from 'lodash'
import User from "../../models/userModel.js";
export interface UserInput {
  userName: String;
  email: String;
  dateOfBirth: String;
  city: String;
  languagePreferences: String;
  about: String;
  emailVerfied: String;
  avatar: String;
  deviceInfo: JSON;
};

export default async function updateUser(_: any, { input }: any, context: any) {
  try {
    const { userId } = context.me;
    const { omitBy, isNil } = pkg;
    if (!userId) return new Error("Please login")
    const {
      userName,
      email,
      about,
      city,
      dateOfBirth,
      languagePreferences,
    }: UserInput = input;
    let modifier = omitBy({
      userName,
      email,
      about,
      city,
      dateOfBirth,
      languagePreferences,
    }, isNil)
    const user = await User.findOneAndUpdate({
      _id: userId
    }, {
      $set: modifier
    }, {
      new: true
    });
    return user;
  } catch(e) {
    throw e;
  }
}
