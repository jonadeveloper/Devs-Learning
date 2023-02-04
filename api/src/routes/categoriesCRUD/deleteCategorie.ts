export async function deleteCategorie (_req: any, res: any) {
    try {
        return res.status(200).send("Delete Categorie");
    } catch (err) {
        return res.status(404).send(err);
    }
}
