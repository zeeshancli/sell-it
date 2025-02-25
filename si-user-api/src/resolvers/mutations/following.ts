import User from "../../models/userModel.js";

export default async function following(_: any, { input }: any, context: any) {
    try {
        const { userId } = context.me;
        if (!userId) return new Error("Please login");
        const {
            followingId
        } = input;

        if (!followingId) return new Error("user id is required");
        if(followingId === userId) return new Error("Access Denied");
        const followingUser = await User.findById({ _id: followingId });
        if (!followingUser) throw new Error('Following user does not exist');
        else {
            const isAlreadyFollowing = await User.findOne({ _id: userId, following: { $in: followingId } });
            if (isAlreadyFollowing) {
                const unfollowUser = await User.updateOne({ _id: userId }, {
                    $pull: {
                        following: followingId
                    }
                });

                const updateFollowingUser = await User.updateOne({ _id: followingId }, {
                    $pull: {
                        followers: userId
                    }
                });

                if (unfollowUser.modifiedCount === 1 && updateFollowingUser.modifiedCount === 1) {
                    return "User Unfollowed"
                } else {
                    return "Something went wrong"
                }
            } else {
                const followUser = await User.updateOne({ _id: userId }, {
                    $push: {
                        following: followingId
                    }
                });
                const updateFollowUser = await User.updateOne({ _id: followingId }, {
                    $push: {
                        followers: userId
                    }
                });

                if (followUser.modifiedCount === 1 && updateFollowUser.modifiedCount === 1) {
                    return "User Followed"
                } else {
                    return "Something went wrong"
                }
            }
        }
    } catch (e) {
        throw e;
    }
}