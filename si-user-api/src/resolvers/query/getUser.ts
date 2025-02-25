import User from "../../models/userModel.js"

export default async function getUser(_: any, { id }: any, context: any) {
  const { me } = context;
  const { userId } = me;
  if (!userId) return new Error("Please Login");
  const user = await User.findOne({
    _id: userId
  });

  return user
}

