const {Category, Course} = require('../../db');

export async function postCategorie (req: any, res: any) {
    try {
        const {name, courses} = req.body;
        let categoryExist = await Category.findOne({
            where: {"name": name}
        });
        if (categoryExist) return res.status(404).send("La categoria ya existe");
        let coursesArr = courses.map((el: string)=>{
            return el.split(" ").join("-").toLowerCase();
        });
        let categoryCreated = await Category.create({name});
        let coursesDB = await Course.findAll({
            where: { "name": coursesArr }
        });
        coursesDB.forEach((el: any) => {
            categoryCreated.addCourse(el)
        });
        return res.status(200).send(`The Category ${name} has been created`);
    } catch (err) {
        return res.status(404).send(err);
    }
}