const { Course, Category } = require('../../db');

export async function getCourses(req: any, res: any) {

    try {
        let { name } = req.query;
        if (name) {
            name = name.split(" ").join("-").toLowerCase();
            let course = await Course.findAll({
                where: { "name": name },
                include: {
                    model: Category,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            });
            return res.status(200).send(course);
        }
        else {
            let course = await Course.findAll({
                includes : {
                    Category,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            });
            return res.status(200).send(course);
        }
    } catch (err) {
        return res.status(404).send(err);
    }
}