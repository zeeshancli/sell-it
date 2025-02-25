import dotenv from 'dotenv'
import getAds from './getAds'
import { adsData } from '../../../jest/AdsStubs' 
jest.mock('../../models/adModel.js')
dotenv.config()

let mockContext = {
    me: {
        userId: "12345"
    }
}

describe("Ads Resolver", () => {
    test("Should Get Ads", async () => {
        expect(await getAds(null,adsData.input,mockContext) ).toStrictEqual(adsData.result)
    })
})