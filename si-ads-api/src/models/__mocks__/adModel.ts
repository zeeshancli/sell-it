import { adsData } from '../../../jest/AdsStubs'
module.exports = {
    create: () => adsData.result,
    findOneAndUpdate: () => adsData.result,
    findOne: () => adsData.result,
    aggregate: () => adsData.result
}