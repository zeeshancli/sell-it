import mongoose from "mongoose";

export interface IUser extends mongoose.Document {

    userName: String;
    phoneNumber: String;
    email: String;
    dateOfBirth: String;
    gender: String;
    city: String;
    languagePreferences: String;
    about: String;
    myAds: [String];
    likedAds: [String];
    emailVerfied: String;
    avatar: String;
    following: [String];
    followers: [String];
    deviceInfo: JSON;
    isBanned: Boolean;
    isActive: Boolean;
    createdAt: Date;
    updatedAt: Date;

};

const UserSchema = new mongoose.Schema({

    _id:{
        type:String
    },
    userName: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false,
        unique: true
    },
    identifier: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    dateOfBirth: {
        type: String
    },
    city: {
        type: String
    },
    gender: {
        type: String
    },
    languagePreferences: {
        type: String
    },
    about: {
        type: String
    },
    isBanned: {
        type: Boolean,
        default:false
    },
    isActive: {
        type: Boolean,
        default:false
    },
    myAds: {
        type: [String],
        default:[]
    },
    likedAds: {
        type: [String],
        default:[]
    },
    following: {
        type: [String],
        default:[]
    },
    followers: {
        type: [String],
        default:[]
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User 