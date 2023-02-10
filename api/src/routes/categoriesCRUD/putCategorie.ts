export async function putCategorie(_req: any, res: any) {
  try {
    return res.status(200).send("Put Category");
  } catch (err) {
    return res.status(404).send(err);
  }
}
