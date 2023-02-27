
const { UserCourses, Users } = require("../../db");


export async function getSales(req: any, res: any) {
    if (false)
        console.log(req);
    try {
        let sales = await UserCourses.findAll()
        let users = await Users.findAll()
        console.log(sales);



        let result = await sales.map((sale: any) => {
            let user = users.find((user: any) => user.id === sale.userId)
            user.fullname = user.fullname[0].toUpperCase() + user.fullname.substring(1);
            return { ...sale.dataValues, user_name: user.fullname.replace("-", " ") }
        })
        res.send(result)

    } catch (error) {
        res.send(error)
    }
}
