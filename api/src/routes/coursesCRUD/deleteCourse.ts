export async function deleteCourse (_req: any, res: any) {
    try {
        return res.status(200).send("Delete Course");
    } catch (err) {
        return res.status(404).send(err);
    }
}
