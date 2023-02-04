export async function getCategories(_req: any, res: any){
    try {
        return res.status(200).send("Get Categorie");
    } catch (err) {
        return res.status(404).send(err);
    }
}