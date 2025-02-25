import { v4 as uuidv4 } from 'uuid';
import admin from 'firebase-admin';
import userModel from '../../models/userModel.js';
import { createToken } from '../../services/auth.js';
import { ErrorHandler } from '../../utils/errorHandler.js';

export default async function login(_: any, { idToken }: any, context: any) {
  try {
    const user: any = await admin.auth().verifyIdToken(idToken);
    if (!user || !user.uid) {
      throw new ErrorHandler('invalid id token', 'INVALID_ID_TOKEN');
    }

    const identifier = user.firebase.sign_in_provider;

    if (['google.com', 'apple.com', 'facebook.com'].includes(identifier)) {
      return processAuthProvider('email', user.email, identifier);
    } else if (identifier === 'phone') {
      return processAuthProvider('phoneNumber', user.phone_number, identifier);
    }

    throw new ErrorHandler('no auth identifier was provided', 'INVALID_PROVIDER');
  } catch (e) {
    throw e;
  }
}

async function createUser(userInput: any, tokenPayload: any) {
  try {
    await userModel.create(userInput);
    const token = await createToken(tokenPayload);
    return {
      token,
      isExistingUser: false,
    };
  } catch (e) {
    throw e;
  }
}

async function processAuthProvider(authField: string, authValue: string, identifier: string) {
  const match = {
    identifier,
    [authField]: authValue,
  };

  let existingUser: any = await userModel.findOne(match);
  if (!existingUser) {
    const userInput: any = {
      _id: uuidv4(),
      identifier,
      isActive: true,
    };
    userInput[authField] = authValue;

    const tokenPayload: any = {
      uid: userInput._id,
    };
    tokenPayload[authField] = authValue;

    return createUser(userInput, tokenPayload);
  }

  const token = await createToken({
    uid: existingUser._id,
    [authField]: existingUser[authField],
    userName: existingUser.userName,
  });

  return {
    token,
    isExistingUser: true,
  };
}
