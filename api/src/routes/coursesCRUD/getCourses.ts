const {Course} = require('../../db');

export async function getCourses(req: any, res: any){
    try {
        const { name } = req.query;
        let course = name ? await Course.findAll({
            where: {"name": name}
        }) :
        await Course.findAll();
        return res.status(200).send(course);
    } catch (err) {
        return res.status(404).send(err);
    }
}