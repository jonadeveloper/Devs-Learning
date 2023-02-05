const {Category} = require('../../db');

export async function getCategories(req: any, res: any){
    try {
        const { name } = req.query;
        let category = name ? await Category.findAll({
            where: {"name": name}
        }) :
        await Category.findAll();
        return res.status(200).send(category);
    } catch (err) {
        return res.status(404).send(err);
    }
}