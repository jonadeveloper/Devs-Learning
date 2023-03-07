const { Category } = require("../../db");

export async function postCategorie(req: any, res: any) {
  try {
    const { name, img, description } = req.body;
    if(!name){
      return res.status(404).send("The name has not been recognized or has not been entered, please try again.")
    }
    let categoryExist = await Category.findOne({
      where: { name: name },
    });
    if (categoryExist) return res.status(404).send("La categoria ya existe");
    await Category.create({ name, description, img });
    return res.status(200).send(`The Category ${name} has been created`);
  } catch (err: any) {
    const errName = err.name;
    const errCode = err.code;
    const errMessage = err.message;
    return res.status(404).send(errName ? 
      `Error ${errCode}: ${errName} - ${errMessage}` : 
      "Something went wrong, please try again.");
  }
};