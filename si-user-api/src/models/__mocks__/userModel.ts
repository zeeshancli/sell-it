import { userdata } from '../../../jest/userStubs'
module.exports = {
    create: () => userdata.result,
    findOneAndUpdate: () => userdata.result,
    findOne: () => userdata.result
}

