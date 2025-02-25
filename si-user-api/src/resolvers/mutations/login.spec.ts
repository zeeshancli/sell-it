import { userdata } from '../../../jest/userStubs'
import login from './login'
import dotenv from 'dotenv'
dotenv.config()

let mockContext = {
    me: {
        userId: "1234567"
    }
}

jest.mock('../../models/userModel.js')
jest.mock('../../services/auth.js', () => {
    return {
        createToken: () => '123456'
    }
})
jest.mock('firebase-admin', () => ({
    auth: () => {
        return {
            verifyIdToken: ( idToken: any ) => {
                const firebaseUsers = [
                    {
                        idToken: '1',
                        uid: '1234567',
                        phone_number: '0000',
                        email: 'testuser1@gmail.com',
                        firebase: {
                            sign_in_provider: 'phone'
                        }
                    },
                    {
                        idToken: '2',
                        uid: '1234567',
                        email: 'testuser1@gmail.com',
                        firebase: {
                            sign_in_provider: 'google.com'
                        }
                    },
                    {
                        idToken: '3',
                        uid: '1234567',
                        email: 'testuser1@gmail.com',
                        firebase: {
                            sign_in_provider: 'facebook.com'
                        }
                    }
                ]
                return firebaseUsers.find( x => x.idToken == idToken);
            }
        }
    }
}));

describe("Login test cases", () => {
    test("should give mobile login to existing user", async () => {
        const result = await login(null, { idToken: '1'}, mockContext);
        expect(result).toStrictEqual(userdata.loginPayload);
    })

    test("should give google login to existing user", async () => {
        const result = await login(null, { idToken: '2' }, mockContext);
        expect(result).toStrictEqual(userdata.loginPayload)
    });

    test("should give facebook login to existing user", async () => {
        const result = await login(null, { idToken: '3' }, mockContext);
        expect(result).toStrictEqual(userdata.loginPayload)
    })
})