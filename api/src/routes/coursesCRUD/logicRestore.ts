const { Course, Category } = require("../../db");

export async function logicRestoreCourse(req: any, res: any) {
    try {
        let { id } = req.query;
        let course = await Course.findOne({
            where: { id: id },
            include: {
                model: Category,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });
        if (course === undefined) return res.status(404).send(`El curso ${name} no existe`)
        await Course.update(
            {
                deleted: false,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        return res.status(200).send(`The course ${name} has been updated`);
    } catch (err) {
        return res.status(404).send(err);
    }
}