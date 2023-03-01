const {Course} = require('../../db');

export async function deleteCourse (req: any, res: any) {
    try {
        const { name } = req.params;
        if(name){
            let nameDB = name.split(" ").join("-").toLowerCase();
            Course.destroy({
                where: {"name" : nameDB}
            });
            return res.status(200).send(`The course ${name} has been deleted`);
        }else{
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
