import dotenv from 'dotenv'
import createUser from './createUser'
import { userdata } from '../../../jest/userStubs'
jest.mock('../../models/userModel.js')
dotenv.config()

let mockContext = {
  me: {}
}

describe("User Resolver", () => {
    test("Should run", () => {
      expect(true).toBe(true);
    });

    test("should create a user", async () => {
      expect(await createUser(null, { input: userdata.input }, mockContext))
        .toBe(userdata.result)
    })
})