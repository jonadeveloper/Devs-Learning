<<<<<<< HEAD
=======
<<<<<<< HEAD
const { Category, Course } = require('../../db');

export async function getCategories(req: any, res: any) {
    try {
        let { name } = req.query;
        if (name) {
            name = name.split(" ").join("-").toLowerCase();
            let category = await Category.findAll({
                where: { "name": name },
                include: {
                    model: Course,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            });
            return res.status(200).send(category);
        } else {
            let category = await Category.findAll({
                includes : {
                    Course,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            });
            return res.status(200).send(category);
        }
=======
>>>>>>> dataBase
const {Category, Course} = require('../../db');

export async function getCategories(req: any, res: any){
    try {
        let { name } = req.params;
        name = name.split(" ").join("-").toLowerCase();
        let category = await Category.findAll({
            where: {"name": name},
            include: {
                model: Course,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
        return res.status(200).send(category);
<<<<<<< HEAD
=======
>>>>>>> development
>>>>>>> dataBase
    } catch (err) {
        return res.status(404).send(err);
    }
}