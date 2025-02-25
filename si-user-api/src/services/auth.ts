import jwt from 'jsonwebtoken'

export const createToken = async ({ uid, phoneNumber, userName, email }: any) => {
    let payload: any = {
        uid,
        userName,
        phoneNumber,
        email
    };
    const expiresIn: any = '365d'
    return jwt.sign( payload, 'sellitprivatekey', { expiresIn });
}