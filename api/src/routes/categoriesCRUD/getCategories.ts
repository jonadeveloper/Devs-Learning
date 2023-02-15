const { Category, Course } = require("../../db");

export async function getCategories(req: any, res: any) {
  try {
    let { name } = req.query;
    if (name) {
      name = name.split(" ").join("-").toLowerCase();
      let category = await Category.findAll({
        where: { name: name },
        include: {
          model: Course,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      category.length===0 ? res.status(404).send(`The category ${name} has not been found`) : res.status(200).send(category);
    } else {
      let category = await Category.findAll({
        where: {},
        include: {
          model: Course,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return res.status(200).send(category);
    }
  } catch (err) {
    return res.status(404).send(err);
  }
}
