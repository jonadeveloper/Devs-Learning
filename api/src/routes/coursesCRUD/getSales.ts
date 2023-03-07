
const { UserCourses, Users } = require("../../db");

export async function getSales(_req: any, res: any) {
    try {
        let sales = await UserCourses.findAll();
        let users = await Users.findAll();
        let result = await sales.map((sale: any) => {
            let user = users.find((user: any) => user.id === sale.userId)
            user.fullname = user.fullname[0].toUpperCase() + user.fullname.substring(1);
            return { ...sale.dataValues, user_name: user.fullname.replace("-", " "), email: user.email  }
        })
        res.send(result)
    } catch (err: any) {
        const errName = err.name;
        const errCode = err.code;
        const errMessage = err.message;
        return res.status(404).send(errName ? 
            `Error ${errCode}: ${errName} - ${errMessage}` : 
            "Something went wrong, please try again.");
    }
}
