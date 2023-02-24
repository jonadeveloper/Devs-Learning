const { Course } = require("../../db");

export async function logicDeleteCourse(req: any, res: any) {

    try {
        let { id } = req.query;
        await Course.update(
            {
                deleted: true,
            },
            {
                where: {
                    id: id,
                },
            }
        );

        return res.status(200).send(`The course ${id} has been updated`);
    } catch (err) {
        return res.status(404).send(err);
    }
}

export async function logicRestoreCourse(req: any, res: any) {

    try {
        let { id } = req.query;
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

        return res.status(200).send(`The course ${id} has been updated`);
    } catch (err) {
        return res.status(404).send(err);
    }
}