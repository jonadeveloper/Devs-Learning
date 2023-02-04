export async function putCourse (_req: any, res: any) {
    try {
        return res.status(200).send("Pull Course");
    } catch (err) {
        return res.status(404).send(err);
    }
}