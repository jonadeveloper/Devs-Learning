const {Category} = require('../../db');

export async function deleteCategorie (req: any, res: any) {
    try {
        const { name } = req.params;
        Category.destroy({
            where: {"name" : name}
        })
        return res.status(200).send(`The category ${name} has been deleted`);
    } catch (err) {
        return res.status(404).send(err);
    }
}
