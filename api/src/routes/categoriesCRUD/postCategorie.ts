const { Category } = require("../../db");

export async function postCategorie(req: any, res: any) {
  try {
    const { name, img, description } = req.body;
    let categoryExist = await Category.findOne({
      where: { name: name },
    });
    if (categoryExist) return res.status(404).send("La categoria ya existe");
    await Category.create({ name, description, img });
    return res.status(200).send(`The Category ${name} has been created`);
  } catch (err) {
    return res.status(404).send(err);
  }
};