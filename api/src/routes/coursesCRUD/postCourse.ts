export async function postCourse (_req: any, res: any) {
    try {
        return res.status(200).send("Post Course");
    } catch (err) {
        return res.status(404).send(err);
    }
}