export async function getCourses(_req: any, res: any){
    try {
        return res.status(200).send("Get Course");
    } catch (err) {
        return res.status(404).send(err);
    }
}