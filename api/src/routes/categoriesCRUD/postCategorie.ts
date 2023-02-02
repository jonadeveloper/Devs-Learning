export async function postCategorie (_req: any, res: any) {
    try {
        return res.status(200).send("Post Categorie");
    } catch (err) {
        return res.status(404).send(err);
    }
}