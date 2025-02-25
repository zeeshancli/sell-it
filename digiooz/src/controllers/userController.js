export const getUsers = async (req, res, next) => {
    const users = [
        {
            "userName": "hello world"
        }
    ];
    res.status(200).json(users);
}