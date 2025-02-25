import mongoose from "mongoose";
import validator from "validator";


const UserSchema = new mongoose.Schema({

    _id: {
        type: String
    },
    userName: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    identifier: {
        type: String,
        required: false
    },
    email: {
        type: String,
        validator:[validator.isEmail,'email is not valid'],
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v);
          },
          message: props => `${props.value} is not a valid password! Passwords must have at least one lowercase letter, one uppercase letter, one number, and be at least eight characters long.`
        }
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
    about: {
        type: String
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    myPosts: {
        type: [String],
        default: []
    },
    myRequests: {
        type: [String],
        default: []
    },
    likedPosts: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

const User = mongoose.model("User", UserSchema);

export default User 