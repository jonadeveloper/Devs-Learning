const {Course} = require('../../db');

export async function deleteCourse (req: any, res: any) {
    try {
        const { name } = req.params;
        Course.destroy({
            where: {"name" : name}
        })
        return res.status(200).send(`The course ${name} has been deleted`);
    } catch (err) {
        return res.status(404).send(err);
    }
}
