const {Category} = require('../../db');

export async function deleteCategorie (req: any, res: any) {
    try {
        const { name } = req.params;
        if(name){
            Category.destroy({
                where: {"name" : name}
            })
            return res.status(200).send(`The category ${name} has been deleted`);
        } else {
            return res.status(404).send("The name has not been recognized or has not been entered, please try again.")
        }
    } catch (err: any) {
        const errName = err.name;
        const errCode = err.code;
        const errMessage = err.message;
        return res.status(404).send(errName ? 
            `Error ${errCode}: ${errName} - ${errMessage}` : 
            "Something went wrong, please try again.");
    }
}
