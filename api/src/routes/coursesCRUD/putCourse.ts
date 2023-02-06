const {Course, Category} = require('../../db');

export async function putCourse (req: any, res: any) {
    try {
        let { name, level, description, price, category } = req.body;
        let nameDB = name.split(" ").join("-").toLowerCase();
        await Course.update({
            "level": level,
            "description": description,
            "price": price,
        },{
            where: {
                "name": nameDB
            }
        });
        let course = await Course.findOne({
            where: {"name": nameDB}
        });
        let categoryArr = category.map((el: string)=>{
            return el.split(" ").join("-").toLowerCase();
        });
        categoryArr.forEach((cat: string) => {
            Category.findOrCreate({
                where: { "name": cat }
            })
        });
        let categoryDB = await Category.findAll({
            where: { "name": categoryArr }
        });
        categoryDB.forEach((el: any) => {
            course.addCategory(el)
        });
        return res.status(200).send(course);
    } catch (err) {
        return res.status(404).send(err);
    }
}