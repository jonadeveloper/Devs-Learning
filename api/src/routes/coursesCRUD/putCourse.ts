<<<<<<< HEAD
=======
<<<<<<< HEAD
const { Course, Category } = require('../../db');

export async function putCourse(req: any, res: any) {
    try {
        let {
            name,
            img,
            level,
            description,
            descriptionComplete,
            duration,
            instructor,
            price,
            category
        } = req.body;
        let nameDB = name.split(" ").join("-").toLowerCase();
        let course = await Course.findOne({
            where: { "name": nameDB }
        });
        await Course.update({
            "level": level ? level : course.level,
            "img": img ? img : course.img,
            "descriptionComplete": descriptionComplete ? descriptionComplete : course.descriptionComplete,
            "duration": duration ? duration : course.duration,
            "instructor": instructor ? instructor : course.instructor,
            "description": description ? description : course.description,
            "price": price,
        }, {
=======
>>>>>>> dataBase
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
<<<<<<< HEAD
=======
>>>>>>> development
>>>>>>> dataBase
            where: {
                "name": nameDB
            }
        });
<<<<<<< HEAD
=======
<<<<<<< HEAD
        if (category) {
            let categoryArr = category.map((el: string) => {
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
        }
=======
>>>>>>> dataBase
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
<<<<<<< HEAD
=======
>>>>>>> development
>>>>>>> dataBase
        return res.status(200).send(course);
    } catch (err) {
        return res.status(404).send(err);
    }
}