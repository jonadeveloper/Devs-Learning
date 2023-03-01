const { Course } = require("../../db");

export async function logicDeleteCourse(req: any, res: any) {
    try {
        let { id } = req.query;
        const myRegEx = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
        if (myRegEx.test(id)) {
            await Course.update(
                {
                    deleted: true,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            return res.status(200).send(`The course ${id} has been updated`);
        } else {
            return res.status(404).send("ID doesn't match type UUID");
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

export async function logicRestoreCourse(req: any, res: any) {
    try {
        let { id } = req.query;
        const myRegEx = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
        if (myRegEx.test(id)) {
            let course = await Course.findOne({
                where: { id: id },
                include: {
                    model: Category,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            });
            if (course === undefined) return res.status(404).send(`El curso ${name} no existe`)
            await Course.update(
                {
                    deleted: false,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            return res.status(200).send(`The course ${name} has been updated`);
        } else {
            return res.status(404).send("ID doesn't match type UUID");
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