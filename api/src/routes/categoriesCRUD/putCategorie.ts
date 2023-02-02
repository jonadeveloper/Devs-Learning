export async function putCategorie (_req: any, res: any) {
    try {
        return res.status(200).send("Pull Categorie");
    } catch (err) {
        return res.status(404).send(err);
    }
}