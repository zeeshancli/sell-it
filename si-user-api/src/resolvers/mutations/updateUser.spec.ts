import dotenv from 'dotenv'
import updateUser from './updateUser'
import { userdata } from '../../../jest/userStubs'
jest.mock('../../models/userModel.js')
dotenv.config()

let mockContext = {
    me: {
        userId: "1234567"
    }
}

describe("update user test case", () => {
    test("should update user", async () => {
        expect(await updateUser(null, { input: userdata.input }, mockContext))
            .toBe(userdata.result)
    })
})