const {Course} = require('../../db');

export async function postCourse (req: any, res: any) {
    try {
        const {name, level, description, price} = req.body;
        let courseExist = await Course.findOne({
            where: {"name": name}
        });
        if (courseExist) return res.status(404).send("El curso ya existe");
        await Course.create({name, level, description, price});
        return res.status(200).send(`The Course ${name} has been created`);
    } catch (err) {
        return res.status(404).send(err);
    }
}